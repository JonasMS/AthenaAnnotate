const protocol = document.location.protocol;
const host = process.env.ATHENA_HOST;
const port = protocol.toUpperCase() === 'HTTP:'
           ? process.env.HTTP_PORT
           : process.env.HTTPS_PORT;
const req = new XMLHttpRequest();

req.open('GET', `${protocol}//${host}:${port}/zeus/zeus.js`);
req.onload = function() {
  const script = document.createElement('script');
  script.textContent = req.responseText;
  (document.head || document.documentElement).appendChild(script);
};
req.onerror = function() {
  console.log('AthenaAnnotate cannot load zeus!');
};
req.send();
