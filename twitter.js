import base64 from 'base-64';
import twitterConfig from './config';
import querystring from 'querystring';
import request from 'request';

/**
 * Returns Twitter bearer access token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function getAccessToken(req, res, next) {
    const token  = base64.encode(encodeURIComponent(twitterConfig.consumerKey) + ':' + encodeURIComponent(twitterConfig.consumerSecret));
    let data = {
        grant_type: 'client_credentials'
    };
    data = querystring.stringify(data);
    request({
        url: twitterConfig.host + '/oauth2/token',
        method: "POST",
        body: data,
        headers: {
            'Authorization': 'Basic ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, function (err, result) {
        if (err) {
            res.status(500);
            res.send('Something went wrong');
        } else {
            const resBody = JSON.parse(result.body);
            if (resBody.errors) {
                res.status(500);
            }
            res.send(result.body);
        }
    });
}

/**
 * Returns search tweets result
 * @param req
 * @param res
 * @param next
  * @returns {*}
 */
function search(req, res, next) {
    let query = {};
    const token  = req.get('access_token');
    if (!token) {
        res.status(403);
        res.send('Unauthorized');
    }
    query['q'] = req.query.q;
    if (!query.q) {
        res.status(400);
        res.send('Wrong query params');
    }
    query['count'] = req.query.count || 100;
    query = querystring.stringify(query);

    request({
        url: twitterConfig.host + '/1.1/search/tweets.json?' + query,
        method: "GET",
        headers: {
            'Authorization': 'bearer ' + token,
        },
    }, function (err, result) {
        if (err) {
            res.status(500);
            res.send('Something went wrong');
        } else {
            const resBody = JSON.parse(result.body);
            if (resBody.errors) {
                res.status(400);
            }
            res.send(result.body);
        }
    });
}

export default {getAccessToken, search}