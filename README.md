# Athena Annotate

Annotate the web.

## Table of Contents

* [Getting Started](#getting-started)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Design](#design)
  * [Server](#server)
  * [Web App](#web-app)
  * [Chrome Extension](#chrome-extension)
  * [Annotate Engine](#annotate-engine)
* [Workflow](#workflow)
* [Deployment](#deployment)
* [Resources](#resources)
* [Contributing](#contributing)
* [License](#license)

## Getting Started

Visit [Athena Annotate](https://athena-annotate.herokuapp.com/).

To use the extension, see [Design](#chrome-extension) Section.

## Tech Stack

* React
* Redux
* Postgres
* Facebook SDK

## Project Structure

All source sits in `/src`.

## Design

### Server

### Web App

### Chrome Extension

#### Content Script

The chrome extension is composed of one content script that will inject a script tag into each page visited. This script tag fetches `zeus.js` from the server. 

#### `zeus.js` 

Zeus is a React App that performs the following duties:

1. Injects an iframe tag into the visited site.
1. Mounts itself to the visited site.
1. Captures text selection on visited site
1. Presents a small UI controller (i.e. Annotate vs. Highlight)
1. Communicates and controls Athena presentation
1. Submits data to the server
1. Runs the [Annotation Engine](#annotation-engine)

The iframe fetches `athena.html`.

#### `athena.html`

This iframe page contains one script tag to fetch `athena.js`. 

#### `athena.js`

Athena is a React App that performs the following duties:

1. Presents a UI to login
1. Handles user authentication with Facebook
1. Presents a UI to create an annotation
1. Communicates with Zeus 

#### Design Challenges 

##### Athena

The Athena React app is wrapped in an iframe for two reasons:

1. The iframe protects the styling of the UI
1. The iframe source url is the registered url for usage with facebook SDK.

This design has a drawback. On some sites, injecting an iframe violates their [Content Security Policy (CSP)](#content-security-policy). For example, GitHub throws this error:

```
(program):76 Refused to frame 'https://localhost:3000/athena/athena.html' because it violates the following Content Security Policy directive: "frame-src render.githubusercontent.com".
```

This particular issue is a [bug](https://bugs.chromium.org/p/chromium/issues/detail?id=408932) in Chrome. The [solution](https://stackoverflow.com/questions/24641592/injecting-iframe-into-page-with-restrictive-content-security-policy/24649134#24649134) was to wrap the iframe in an iframe that was bundled with the chrome extension. Of course this produced a different issue:

1. Zeus could not communicate to Athena via `window.postMessage`.

Unfortunately, it is not possible to inject javascript (inline or otherwise) into the first iframe as a way to bridge the communication barrier. Programmatically accessing an iframe within an iframe is another security violation.

##### Zeus

The Zeus React App is an injected script tag for one reason:

1. Zeus needs to be able to generate a custom HTML element.

This design has a few concerns:

1. If a user visits an HTTPS site and the extension injects a script tag that requests `zeus.js` via HTTP, a mixed content security violation is thrown.
1. On some sites, Zeus will cause a security violation when it tries to GET/POST to the server. This is a cross origin violation.
1. Zeus is a React app that renders and thus needs styling. It's styles are not protected and its style library throws security violations. (See below).

```
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self' https://maxcdn.bootstrapcdn.com https://fonts.googleapis.com". Either the 'unsafe-inline' keyword, a hash ('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='), or a nonce ('nonce-...') is required to enable inline execution.
```

#### Content Security Policy

### Annotation Engine


## Workflow
See [Workflow](docs/WORKFLOW.md)

## Deployment
See [Deployment](docs/DEPLOYMENT.md)

## Resources

## Contributing
See [Contributing](docs/CONTRIBUTING.md)

## License
See [License](docs/LICENSE.md)

