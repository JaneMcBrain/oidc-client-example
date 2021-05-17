"use strict";

const express = require("express");
const { Issuer, Strategy } = require('openid-client');
const mustacheExpress = require('mustache-express');
const expressSesssion = require('express-session');
const passport = require('passport');

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

Issuer.discover('https://nodejs-sample.criipto.id')
  .then(criiptoIssuer => {
    var client = new criiptoIssuer.Client({
      client_id: 'urn:criipto:nodejs:demo:1010',
      client_secret: 'j9wYVyD3zXZPMo3LTq/xSU/sMu9/shiFKpTHKfqAutM=',
      redirect_uris: [ `http://${ip}:${port}/login/callback` ],
      post_logout_redirect_uris: [ `http://${ip}:${port}/logout/callback` ],
      token_endpoint_auth_method: 'client_secret_post'
    });

    app.use(
      expressSesssion({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
      'oidc',
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, tokenSet.claims());
      })
    );
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  });

  app.get('/login', (req, res, next) => {
    passport.authenticate('oidc', { acr_values: 'urn:grn:authn:fi:all' })(req, res, next);
  });
