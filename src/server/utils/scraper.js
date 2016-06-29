var cheerio = require('cheerio');
var request = require('request');
var sizeOf = require('request-image-size');
var url = require('url');
var Promise = require('bluebird');
// var models = require('../models/index');
var $;

var getDimensions = Promise.promisify(sizeOf);

var getLargest = function (imgArray, res) {
  var maxDimensions = 0;
  var currDimension = 0;
  var dimArray = [];
  var largest = null;
  var i;
  var j;
  for (i = 0; i < imgArray.length; i ++) {
    dimArray.push(getDimensions(imgArray[i]));
  }
  Promise.all(dimArray)
    .then(function(results) {
      console.log(results);
      for (j = 0; j < results.length; j ++) {
        currDimension = results[j].width * results[j].height;
        // console.log(currDimension);
        if (currDimension > maxDimensions) {
          // console.log('this is the max', currDimension);
          maxDimensions = currDimension;
          largest = imgArray[j];
        }
      }
      // console.log(maxDimensions);
      res.send(JSON.stringify(largest));
    })
    .catch(function(error) {
      res.send(error);
    });
};

var getImages = function(doc, res, originalLink) {
  var images = doc('img');
  var keys = Object.keys(images);
  var key;
  var imgArray = [];
  var i;
  var urlObj;
  var baseUrl = url.parse(originalLink).protocol + '//' + url.parse(originalLink).hostname;

  console.log('these are the images', images);
  console.log('this is the base url', baseUrl);

  for (i = 0; i < keys.length; i++) {
    if (images[keys[i]].attribs) {
      for (key in images[keys[i]].attribs) {
        urlObj = url.parse(images[keys[i]].attribs[key]);
        console.log(urlObj);
        if (urlObj.protocol === 'https:' || urlObj.protocol === 'http:') {
          imgArray.push(images[keys[i]].attribs[key]);
        } else {
          imgArray.push(url.resolve(baseUrl, images[keys[i]].attribs[key]));
        }
      }
    }
  }
  // return
  getLargest(imgArray, res);
};

var getHTML = function(link, res) {
  request(link, function(error, response, body) {
    console.log(response.statusCode);
    $ = cheerio.load(body);
    // return
    getImages($, res, link);
  });
};

module.exports = getHTML;
