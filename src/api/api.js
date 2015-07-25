import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './routes/index';
import mongo from 'mongodb';
import monk from 'monk';

const db = monk('localhost:27017/simpledashboard');

const app = express();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(session({
  secret: 'anujan testing 123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      let matcher = req.url.split('/');
      let action = matcher && actions[matcher[1]];
      if (action) {
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', reason);
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });
    app.listen(config.apiPort);
    resolve();
  });
}
