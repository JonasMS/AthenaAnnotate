# Deployment

> **This assumes you have Heroku Toolbelt installed.**

To deploy app changes, simply issue:

```sh
# git add and commit any changes. then...
$ git push heroku [your branch]:master
```

## How Deployment was Setup

### Create App 

```sh
# on local machine
$ cd [project-folder]
$ heroku create athena-annotate

# this will set DATABASE_URL automatically
$ heroku addons:create heroku-postgresql:hobby-dev
```
### Setup DB Configuration

The Postgres Add-on installation provides a default user, password, and database url. Set those values in 
`src/server/config.json`.

### Environment Variables

Set these up in Heroku UI. The `.env` file is ignored in production. Here's how we have it set up today.

|Variable|Setting|
|---|---|
| NODE_ENV | production |
| DATABASE_URL | postgres://postgres@localhost:5432/annotate |
| HOST | https://athena-annotate.herokuapp.com |
| FACEBOOK_APP_ID | *(app id from facebook)* |
| FACEBOOK_APP_SECRET | *(app secret from facebook)* |

> Do not set PORT. Heroku will set that automatically.

### Push Repo to Heroku

```sh
$ git push heroku [your-branch]:master
```

### Setup DB on Heroku

```sh
# start a heroku terminal window

# this will create tables in db
$ npm run migrate
```

## Production Demo

When this application is deployed, visiting [Athena Annotation](https://athena-annotate.herokuapp.com) will serve up the web application.

To use the chrome extension and have it interact with the production database, follow these steps:

1. Change all variables in the local copy of `.env` to production settings.
1. Run `npm run build`
1. Load newly build chrome extension into browser by visiting [chrome extensions setting](chrome://extension).
1. Open [Washington Post](https://www.washingtonpost.com).
1. Highlight some text and submit an annotation (log in to Facebook if needed) 
1. Open [Washington Post](https://www.washingtonpost.com) and see the text annotated highlight
1. Open [Athena Annotation](https://athena-annotate.herokuapp.com) in a tab. Log in if prompted. See your annotation in the dashboard.



