var express = require('express'),
    // stylus = require('stylus'),
    // cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    // session = require('express-session'),
    // passport = require('passport'),
    // nodemailer = require('nodemailer'),
    router = express.Router();

module.exports = function(app, config) {
    app.set('view engine', 'pug');
    app.set('views', config.ROOT_PATH + 'resources/html');
    // app.use(cookieParser());
    // app.use(express.static(config.ROOT_PATH + '/resources/html'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // app.use(session({secret: 'magic unicorns'}));
    // app.use(stylus.middleware(
    //     {
    //         src: config.ROOT_PATH + '/resources',
    //         compile: function(str, path) {
    //             return stylus(str).set('filename', path);
    //         }
    //     }
    // ));
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use(express.static(config.ROOT_PATH + '/public'));
};
