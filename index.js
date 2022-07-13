require('dotenv').config(`${__dirname}/.env`)

var express = require('express');
var app = express();
var {expressjwt:jwt} = require('express-jwt');
var jwks = require('jwks-rsa');
var port = process.env.PORT || 8000;

console.log(process.env.ISSUER)

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: process.env.JWKS_URI
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port, ()=>console.log('http://127.0.0.1:8000'));