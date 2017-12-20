const express = require('express');
const router = express.Router();
const Partner = require('../Model/partners');

router.post('/', (req, res) => {
  let newPartner = new Partner(req.body)
  newPartner.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      res.status(200).send(`add user name is ${req.body.username}`)
  });
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Partner.findByIdAndRemove(id, (err, todo) => {
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
  Partner.find(function (err, partner) {
    if(err) return console.error(err);
    res.send(partner);
  })
})

router.get('/:name', (req,res) => {
  let name = req.params.name;
  Partner.findOne({name: name},(err, partner) => {
      if(err) return console.error(err);
      res.send(partner);
  })
})

module.exports = router;