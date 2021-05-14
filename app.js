"use strict";

const express = require("express");
const mustacheExpress = require('mustache-express');
const app = express();

const ip = "127.0.0.1";
const port = 8081;

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
