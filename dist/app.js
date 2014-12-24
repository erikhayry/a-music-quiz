/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');

var client_id = 'ad953f4d73e647bd83523ffc917b3b8a'; // Your client id
var client_secret = '1fdcc5cfc7b94e57b98ce77d07a28b29'; // Your client secret
var redirect_uri_path = 'api/callback'; // Your redirect uri

var app = express();
var dir = '/app';
var host = 'http://www.amusicquiz.com/'; //http://www.aMusicQuiz.com/api/callback
var port = process.env.PORT || 3000;


process.argv.forEach(function(v) {
    if (v == 'dev') {
        dir = '/app';
    }
    if (v == 'dist' || v == 'dev') {
        host = 'http://localhost:' + port + '/';
    }
})

app.use(express.static(__dirname + dir));

app.get('/api/login', function(req, res) {
    var redirect_uri = host + redirect_uri_path;
    var scope = 'playlist-modify playlist-modify-private';
    res.send({
        'redirect_url': 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri
            })
    });
});

app.get('/api/callback', function(req, res) {
    var redirect_uri = host + redirect_uri_path;
    // your application requests refresh and access tokens
    var code = req.query.code;


    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                json: true
            };

            // use the access token to access the Spotify Web API
            /*      request.get(options, function(error, response, body) {
      
      });*/

            // we can also pass the token to the browser to make requests from there
            res.redirect(host + '?' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        } else {
            res.redirect('?error=true');
        }
    });
});

app.get('/api/refresh_token', function(req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

console.log('Listening on ' + host );

app.listen(port);