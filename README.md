# AthenaAnnotate

Annotate the web.



## Development Workflow

### Install

```sh
$ git clone [this repo]
$ npm install
```

### Contributing 

Read [CONTRIBUTING.md](CONTRIBUTING.md).

### Install DB 

1. Install [Postgres DB]()
1. Start Postgres DB
1. Run `npm run create`

### Setup Configuration 

Copy `.env.example` to `.env` and set any API keys or config variables in this file. Here are typical setting for these variables:

```sh
|Variable|Setting|
|---|---|
| ATHENA_HOST | localhost |
| HTTP_PORT | 3000 |
| HTTPS_PORT | 8443 |
```

You'll also need to setup your SSL key and certification. Here are some instructions:

```sh
# makes key.pem and cert.pem. you will be prompted to make a passcode
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365

# removes the passcode (for dev purposes)
$ openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
```

Finally, rename `key.pem` to `server.key` and `cert.pem` to `server.crt` and place them in `src/server/sslcert`.

> RESOURCE: http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/

### Build Application 

Build the entire application. You must do this **before** you set up the watch commands, as the build process includes copying static files to `build/`.

```sh
$ npm run build
```

This will create a build directory as follows:

```sh
build/
├── athena/
│   ├── 448c34a56d699c29117adc64c43affeb.woff2
│   ├── 89889688147bd7575d6327160d64e760.svg
│   ├── athena.html
│   ├── athena.js
│   ├── e18bbf611f2a2e43afc071aa2f4e1512.ttf
│   ├── f4769f9bdb7466be65088239c12046d1.eot
│   └── fa2772327f55d8198301fdb8bcfc8158.woff
├── extension/
│   ├── content.js
│   └── manifest.json
├── webapp.js
└── zeus/
    └── zeus.js
```

### Watch Source & Start Server

Open terminals and do the following.

|Terminal No.|Endpoint|
|---|---|
| 1 | `npm run watch-app` |
| 2 | `npm run watch-ext` |
| 3 | `npm run watch-zeus` |
| 4 | `npm run watch-athena` |
| 5 | `npm start` |

> See `package.json` for build scripts that build an individual module
> Notice the server is listening on two ports - one for **HTTP** and one for **HTTPS**.

### Load Extension in Browser 

Load the extension found at `build/extension` into Chrome. (Ensure *Developer Mode* is checked)

> **Each time you make a change to the extension source, you must reload the compiled code in Chrome**

### View Web App 

Navigate to `http://localhost:3000` to view the Web App. 

## Design

There are 5 parts to the application:

1. [The server](#the-server)
1. [The web app](#the-web-app)
1. [The extension](#the-chrome-extension)
1. [The annotation engine](#the-annotation-engine)
1. [Postgres](#postgres)

### The Server

To start the server, issue:

```
$ npm start
```
This starts an express server defaulted to `http://localhost:3000`. 

#### Endpoints

|Description|Endpoint|
|---|---|
|[Web App](#the-web-app)|GET /|
|[Annotation iFrame](#the-annotation-iframe)|GET /athena/athena.html|
|[Annotation Engine](#the-annotation-engine)|GET /athena/athena.js|

### The Web App

### The Chrome Extension

### The Annotation Engine

### Postgres DB

1. Install
1. Start
1. `npm run create`


