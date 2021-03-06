const express = require('express');
const router = express.Router();
const Partner = require('../Model/partners');

router.post('/', (req, res) => {
  let newPartner = new Partner(req.body)
  newPartner.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      Partner.find(function (err, partner) {
        if(err) return console.error(err);
        res.send(partner);
      })
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
          Partner.find(function (err, partner) {
            if(err) return console.error(err);
            res.send(partner);
          })
      }
  });

})

router.get('/', (req, res) => { 
  // Partner.get(null)
  //   .then(data => {
  //     res.send(data)
  //   })
  //   .catch(err => console.error(err))
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