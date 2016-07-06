## Development Workflow

If you want to work on this project, this is the basic workflow.  

### Clone & Install Repo

```sh
$ git clone [this repo]
$ npm install
```

### Read [CONTRIBUTING](CONTRIBUTING.md) and [STYLE GUIDE](STYLE-GUIDE.md)

### Install DB

1. Install [Postgres App](http://postgresapp.com/)
1. Start Postgres App 
1. Run `npm run create`
1. Run `npm run migrate`

The last two commands will create the `annotate` database and then setup the tables.

### Setup Configuration

Copy `.env.example` to `.env` and set any API keys or config variables in this file. Here are typical setting for these variables:

|Variable|Setting|
|---|---|
| NODE_ENV[^1] ||
| DATABASE_URL | postgres://postgres@localhost:5432/annotate |
| HOST | https://localhost |
| PORT | 3000 |
| FACEBOOK_APP_ID ||
| FACEBOOK_APP_SECRET ||

[^1]: Default value for NODE_ENV is **development**. Only set this for production. See [DEPLOYMENT](DEPLOYMENT.md).

You'll also need to setup your SSL key and certification **(only in development environment)**. Here are some instructions:

```sh
# makes key.pem and cert.pem. you will be prompted to create a passcode and setup
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365


# after setup, removes the passcode (for dev purposes)
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
│   ├── athena.html
│   ├── athena.js
├── extension/
│   ├── content.js
│   └── manifest.json
├── webapp.js
└── zeus/
    └── zeus.js
```

### Watch Source & Start Server

The table below lists commands to run in their own terminal window. 

|Terminal No.|Command|
|---|---|
| 1 | `npm run watch-app` |
| 2 | `npm run watch-ext` |
| 3 | `npm run watch-zeus` |
| 4 | `npm run watch-athena` |
| 5 | `npm start` |

> 1. See `package.json` for build scripts that build an individual module.

### Load Extension in Browser

Load the extension found at `build/extension` into Chrome. (Ensure *Developer Mode* is checked)

> **Each time you make a change to the extension source, you must reload the newly compiled code in Chrome**

### View Web App

Navigate to **https://localhost:3000** to view the Web App.

## Design

There are 5 parts to the application:

1. [The Server](#the-server)
1. [The Web App](#the-web-app)
1. [The Chrome extension](#the-chrome-extension)
1. [The Annotation Engine](#the-annotation-engine)
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
### Postgres
