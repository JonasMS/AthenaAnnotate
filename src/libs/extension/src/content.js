// var el = document.getElementsByTagName('body')[0] || document.getElementsByTagName('html')[0];
// var div = document.createElement('div');
// var script = document.createElement('script');

// div.id = 'athena';
// script.src = 'http://localhost:3000/api/athena';
// script.type = 'text/javascript';

// el
//   .appendChild(div)
//   .appendChild(script);

var el = document.getElementsByTagName('body')[0] ||
         document.getElementsByTagName('html')[0];
var div = document.createElement('div');
var iframe = document.createElement('iframe');

div.id = 'athena';

iframe.src = 'http://localhost:3000/athena.html';
iframe.id = 'demo';
iframe.name = 'demo';
iframe.title = 'demo';
// iframe.scrolling = 'no';
iframe.frameborder = '0';
iframe.allowtransparency = 'true';
iframe.allowfullscreen = 'true';
iframe.width = 800;
iframe.height = 800;
// iframe.style = [
//   'position: absolute;',
//   'visibility: hidden;',
//   'display: none;',
//   'width: 0px;',
//   'height: 0px;',
//   'padding: 0px;',
//   'border: none;'
// ].join('');


iframe.appendChild(div);
el.appendChild(iframe);
