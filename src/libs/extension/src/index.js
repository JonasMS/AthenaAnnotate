let protocol;
let host;
let port;
let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = `HTTPS:${process.env.ATHENA_HOST}:${process.env.HTTPS_PORT}`;
} else {
  protocol = document.location.protocol;
  host = process.env.ATHENA_HOST;
  port = protocol.toUpperCase() === 'HTTP:'
       ? process.env.HTTP_PORT
       : process.env.HTTPS_PORT;
  baseUrl = `${protocol}//${host}:${port}`;
}

const req = new XMLHttpRequest();

req.open('GET', `${baseUrl}/zeus/zeus.js`);
req.onload = function() {
  const script = document.createElement('script');
  script.textContent = req.responseText;
  (document.head || document.documentElement).appendChild(script);
};
req.onerror = function() {
  console.log('AthenaAnnotate cannot load zeus!');
};
req.send();
