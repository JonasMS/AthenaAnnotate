# Deployment

To deploy app changes, simple issue:

```sh
# git add and commit any changes. then...
$ git push heroku [your branch]:master
```

## How Deployment was Setup

> Assuming you have Heroku Toolbelt installed.

### Create App 

```sh
# on local machine
$ cd [project-folder]
$ heroku create athena-annotate

# this will set DATABASE_URL automatically
$ heroku addons:create heroku-postgresql:hobby-dev
```
### Setup DB Configuration

The Postgres Add-on installation gives you default user, password, and db url. Set those values in 
`src/server/config.json`.

### Environment Variables

Set these up in Heroku UI. The `.env` file is ignored in production.

|Variable|Setting|
|---|---|
| NODE_ENV | production |
| DATABASE_URL | |
| HOST | *your domain (include https)* |
| FACEBOOK_APP_ID ||
| FACEBOOK_APP_SECRET ||

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
