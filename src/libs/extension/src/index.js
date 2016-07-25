import config from '../../../../config';

const blacklist = ['google', 'facebook'];

const isBlackListedSite = function(site, list) {
  for (let i = 0; i < list.length; i ++) {
    const re = new RegExp(list[i], 'g');
    if (site.search(re) !== -1) {
      return true;
    }
  }
  return false;
};

const loadApp = function() {
  const baseUrl = process.env.NODE_ENV === 'production'
                ? config.url.host
                : `${config.url.host}:${config.url.port}`;

  const req = new XMLHttpRequest();

  req.open('GET', `${baseUrl}/zeus/zeus.js`);
  req.onload = function() {
    const script = document.createElement('script');
    script.textContent = req.responseText;
    (document.head || document.documentElement).appendChild(script);
  };
  req.onerror = function() {
    console.log('AthenaAnnotate extension cannot fetch zeus!');
  };
  req.send();
};


if (!isBlackListedSite(document.location.hostname, blacklist)) {
  loadApp();
}
