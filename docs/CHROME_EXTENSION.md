# Chrome Extension

## `content.js` 

This is the chrome extension code. It injects `zeus.js`.

## `zeus.js` 

Zeus is a React App that performs the following duties:

1. Injects an iframe tag into the visited site.
1. Mounts itself to the visited site.
1. Captures text selection on visited site.
1. Presents a small UI controller to annotate or highlight selected text.
1. Communicates and controls Athena presentation.
1. Issues GET and POST requests to the app's server.
1. Runs the [Annotation Engine](#annotation-engine)

The iframe fetches `athena.html`.

## `athena.html`

This iframe page contains one script tag to fetch `athena.js`. 

## `athena.js`

Athena is a React App that performs the following duties:

1. Presents a UI to login
1. Handles user authentication with Facebook
1. Presents a UI to create an annotation
1. Communicates with Zeus 

# Design Challenges 

## Athena

The Athena React app is wrapped in an iframe for two reasons:

1. The iframe protects the styling of the UI
1. The iframe source url is the registered url for usage with facebook SDK.

This design has a drawback. On some sites, injecting an iframe violates their [Content Security Policy (CSP)](#content-security-policy). For example, GitHub throws this error:

```
(program):76 Refused to frame 'https://localhost:3000/athena/athena.html' because it violates the following Content Security Policy directive: "frame-src render.githubusercontent.com".
```

This particular issue is a [bug](https://bugs.chromium.org/p/chromium/issues/detail?id=408932) in Chrome. The [solution](https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy/24649134#24649134) is to wrap the iframe in another iframe that is bundled with the chrome extension. This produced a different issue:

1. Zeus could not communicate to Athena via `window.postMessage`.

Unfortunately, it is not possible to inject javascript (inline or otherwise) into the first iframe as a way to bridge the communication barrier. Programmatically accessing an iframe from one source into a sub iframe with a difference source is a cross origin security violation.

## Zeus

The Zeus React App is an injected script tag for one reason:

1. Zeus needs to be able to generate a custom HTML element.

This design has a few concerns:

1. If a user visits an HTTPS site and the extension injects a script tag that requests `zeus.js` via HTTP, a mixed content security violation is thrown.
1. On some sites, Zeus will cause a security violation when it tries to GET/POST to the server. This is a cross origin violation.
1. Zeus is a React app that renders and thus needs styling. It's styles are not protected and its style library throws security violations. (See below).

```
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self' https://maxcdn.bootstrapcdn.com https://fonts.googleapis.com". Either the 'unsafe-inline' keyword, a hash ('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='), or a nonce ('nonce-...') is required to enable inline execution.
```

# Content Security Policy

> TODO: explain this a bit.

# Proposed Solution

## Content Script

When loaded, this script performs the following duties:

1. Sends an XHR request to the server for `athena.js`. The returned string of code is set to a script tag that is then injected into the visited page. Since content scripts can issue requests cross origin, we avoid security violations. 
1. Sends an XHR request to the server for `zeus.js`. Again, the returned stream of code is set to a script tag that is injected into the visited page. 
1. Adds a message event handler to receive messages from Athena and Zeus. The content script is the central communication controller that routes messages (with data) between Athena, Zeus and the server. Again, content scripts can make cross origin requests, so communication to the server works without security violation. This loading also maintains the requirement that `zeus.js` must be able to create a custom HTML element.

## Athena

When loaded, `athena.js` creates a custom HTML element and then mounts to that element.

## Zeus

When loaded, `zeus.js` creates a custom HTML element and then mounts to that element.

> The custom element was believed to protect internal styling. However, it's the shadow-dom that might be the mechanism to achieve this. More investigation is required.

## Authentication

`athena.js` is the component that handled communication to Facebook. With this new design, `athena.js` no longer has a source that can be registered with Facebook.

There are two proposed authentication solutions:

1. Use [Passport](http://passportjs.org/) - specifically the local strategy.
  1. **Proof of concept almost complete.**
1. Use [Manual Login Flow](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow) for Facebook.
  1. **Proof of concept can retrieve an access token, but communication is dropped along the way**


