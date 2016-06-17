var el = document.getElementsByTagName('body')[0] || document.getElementsByTagName('html')[0];
var div = document.createElement('div');
var script = document.createElement('script');

div.id = 'athena';
script.src = 'http://localhost:3000/api/athena';
script.type = 'text/javascript';

el
  .appendChild(div)
  .appendChild(script);

