# AthenaAnnotate

Annotate the web.

## Getting Started 

1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env` and set any API keys or config variables in this file.
4. `npm start`

Now, navigate to `http://localhost:3000` to view the application.

## Commands

### `npm run clean`

Remove the `build/` directory.

### `npm run build`

Build client side code to `build/` - one time.

### `npm run watch`

Build and watch for changes to client side files. Recompile when files change.

### `npm start`

Starts the express web server.

> If you issue `npm install -g nodemon`, you can type: `nodemon npm start` for development. 

### `npm test`

Run all tests. 
