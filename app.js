"use strict";

const express = require("express");
const mustacheExpress = require('mustache-express');
const app = express();
const { auth } = require('express-openid-connect');

const ip = "127.0.0.1";
const port = 8081;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://127.0.0.1:8081',
  clientID: 'ZgmFTt3FTNBPsXUoVn6sRpAlRUctpPSL',
  issuerBaseURL: 'https://dev-eroupsoc.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/public');

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}/`);
});
