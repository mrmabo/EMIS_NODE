const express = require('express');
const _ = require("lodash");
const router = express.Router();
const Users = require('../Model/users');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  if(req.body.username && req.body.password){
    let username = req.body.username;
    let password = req.body.password;
    Users.findOne({username: username},(err, user) => {
      if(err) return console.error(err);
      if( !user ){
        res.status(401).json({message:"no such user found"});
        res.end();
        return;
      }
      
      if(user.password === req.body.password) {
        let payload = {id: user.id};
        let token = jwt.sign(payload, 'superSecretKey');
        res.json({message: "ok", token: token});
      } else {
        res.status(401).json({message:"passwords did not match"});
        res.end();
        return;
      }
    })
  }
})

module.exports = router;