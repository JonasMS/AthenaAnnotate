# AthenaAnnotate

Annotate the web.



## Development Workflow

### Step 0

```
$ git clone [this repo]
$ npm install
```

### Step 1

Read [CONTRIBUTING.md](CONTRIBUTING.md).

### Step 2 

1. Install [Postgres DB]()
1. Start Postgres DB
1. Run `npm run create`

### Step 3

Copy `.env.example` to `.env` and set any API keys or config variables in this file.

### Step 4

Open 4 terminals and do the following.

|Terminal No.|Endpoint|
|---|---|
| 1 | `npm run watch-app` |
| 2 | `npm run watch-ext` |
| 3 | `npm run watch-athena` |
| 4 | `npm start` |

### Step 5

Load the extension found at `build/extension` into Chrome. (Ensure *Developer Mode* is checked)

> **Each time you make a change to the extension source, you must reload the compiled code in Chrome**

### Step 6

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


