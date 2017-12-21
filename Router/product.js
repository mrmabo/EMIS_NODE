const express = require('express');
const router = express.Router();
const Product = require('../Model/products');
var mongoose = require('mongoose');


router.post('/', (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      Product.find(function (err, product) {
        if(err) return console.error(err);
        res.send(product);
      })
  });
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;


  Product.findByIdAndRemove(id, (err, todo) => {
      if(todo == null){
          res.status(404).send('server error')
          return;
      } else if(err){
          res.status(500).send(err)
      } else {
          Product.find(function (err, product) {
            if(err) return console.error(err);
            res.send(product);
          })
      }
  });

})

router.get('/', (req, res) => { 
  Product.find(function (err, product) {
    if(err) return console.error(err);
    res.send(product);
  })
})

router.get('/:name', (req,res) => {
  let name = req.params.name;
  Product.findOne({name: name},(err, product) => {
      if(err) return console.error(err);
      res.send(product);
  })
})

module.exports = router;