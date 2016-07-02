var cheerio = require('cheerio');
var request = require('request');
var sizeOf = require('request-image-size');
var url = require('url');
var Promise = require('bluebird');
var models = require('../models/index');
var $;

var getDimensions = Promise.promisify(sizeOf);

var updateDoc = function(imageUrl, originalLink) {
  models.Doc.update({
    image: imageUrl
  }, {
    where: {
      url: originalLink
    },
    returning: true
  }).then(function(doc) {
    console.log(doc);
  });
};

var getLargest = function (imgArray, originalLink) {
// var getLargest = function (imgArray, res) {
  var maxDimensions = 0;
  var currDimension = 0;
  var dimArray = [];
  var largest = null;
  var i;
  var j;
  for (i = 0; i < imgArray.length; i ++) {
    // var count = 0;
    // sizeOf({url: imgArray[i], timeout: 5000}, function(err, dim, len) {
    //   count +=1;
    //   console.log(count, err, dim, len)});
    // console.log(imgArray[i]);
    dimArray.push(getDimensions({ url: imgArray[i], timeout: 5000 }));
  }
  Promise.all(dimArray.map(function(promise) {
    return promise.reflect();
  }))
  .then(function(results) {
    // console.log(results);
    for (j = 0; j < results.length; j ++) {
      if (results[j].isFulfilled() && results[j].value() !== undefined) {
        console.log('this is the result value', results[j].value());
        console.log(results[j].value().width, results[j].value().height);
        currDimension = results[j].value().width * results[j].value().height;
        // console.log(currDimension);
        if (currDimension > maxDimensions) {
          maxDimensions = currDimension;
          largest = imgArray[j];
        }
      }
    }
    updateDoc(largest, originalLink);
    // res.send(JSON.stringify(largest));
  })
  .catch(function(error) {
    console.log(error);
    // res.send(error);
  });
};

var getImages = function(doc, originalLink) {
// var getImages = function(doc, res, originalLink) {
  var images = doc('img');
  var keys = Object.keys(images);
  var key;
  var imgArray = [];
  var i;
  var urlObj;
  var baseUrl = url.parse(originalLink).protocol + '//' + url.parse(originalLink).hostname;

  // console.log('these are the images', images);
  console.log(keys.length);
  for (i = 0; i < keys.length; i++) {
    if (images[keys[i]].attribs) {
      for (key in images[keys[i]].attribs) {
        urlObj = url.parse(images[keys[i]].attribs[key]);
        // console.log(urlObj);
        if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
          imgArray.push(images[keys[i]].attribs[key]);
        } else if (urlObj.protocol !== 'data:' && urlObj.path !== null) {
          imgArray.push(url.resolve(baseUrl, urlObj.path));
        }
        console.log(imgArray.length);
      }
    }
  }
  getLargest(imgArray, originalLink);
  // console.log(imgArray);
  // getLargest(imgArray, res);
};

var getTitle = function(doc, originalLink) {
  var baseUrl = url.parse(originalLink).protocol + '//' + url.parse(originalLink).hostname;
  var title = doc('title');
  // console.log(title[0].children[0].data);
  models.Doc.update({
    title: title[0].children[0].data,
    baseUrl: baseUrl
  }, {
    where: {
      url: originalLink
    },
    returning: true
  }).then(function(document) {
    console.log(document);
  });
};

var getHTML = function(link) {
// var getHTML = function(link, res) {
  request({
    uri: link,
    jar: true,
    maxRedirects: 20
  }, function(error, response, body) {
    if (!error) {
      // console.log(response.statusCode);
      $ = cheerio.load(body);
      getImages($, link);
      getTitle($, link);
      // getImages($, res, link);
    } else {
      console.log(error);
      // res.send('null');
    }
  });
};

module.exports = getHTML;


// function to get logo;
