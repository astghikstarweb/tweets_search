import express from 'express';
import bodyParser from 'body-parser';

import twitter from './twitter'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    credentials: true, origin: true
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    next();
});

app.get('/get_access_token', (req, res, next) => {
    twitter.getAccessToken(req, res, next);
});

app.get('/search', (req, res, next) => {
    twitter.search(req, res, next);
});

app.listen(3001, () => {
    console.log('Listening on port 3001!')
});