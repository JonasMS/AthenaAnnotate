const baseUrl = `${process.env.HOST}:${process.env.PORT}`;
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
