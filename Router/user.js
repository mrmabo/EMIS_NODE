const express = require('express');
const router = express.Router();
const Users = require('../Model/users');

router.post('/', (req, res) => {
  let newUser = new Users(req.body)
  newUser.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      res.status(200).send(`add user name is ${req.body.username}`)
  });
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Users.findByIdAndRemove(id, (err, todo) => {
      if(todo == null){
          res.status(404).send('server error')
          return;
      } else if(err){
          res.status(500).send(err)
      } else {
          let response = {
              message: "Successfully deleted",
              id: todo._id
          };
          res.status(200).send(response);
      }
  });
})

router.get('/', (req, res) => { 
  Users.find(function (err, users) {
    if(err) return console.error(err);
    res.send(users);
  })
})

router.get('/:name', (req,res) => {
  let name = req.params.username;
  Users.findOne({username: name},(err, user) => {
      if(err) return console.error(err);
      res.send(user);
  })
})

module.exports = router;