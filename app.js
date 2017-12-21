const express = require('express');
const _ = require("lodash");
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const book = require('./Router/book');
const user = require('./Router/user');
const auth = require('./Router/auth');
const partner = require('./Router/partner');
const product = require('./Router/product');

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'superSecretKey';

const Users = require('./Model/users');
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let name = req.params.name;
  Users.findOne({username: name},(err, user) => {
      if(err) return console.error(err);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
  })
  
});

passport.use(strategy);
const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/books', book);
app.use('/auth', auth);
app.use('/api/user', user);
app.use('/api/partner', partner);
app.use('/api/product', product);

app.listen(3000);

