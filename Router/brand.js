const express = require('express');
const router = express.Router();
const Brand = require('../Model/brands');
var mongoose = require('mongoose');

router.post('/', (req, res) => {
  let newBrand = new Brand(req.body);
  newBrand.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      const aggregateQuery = Brand.aggregate([
        {
          $lookup: {
              from: "products",
              localField: "pid",
              foreignField: "_id",
              as: "productDetail"
          }
        }
      ]);
      aggregateQuery.exec(function(err,brand){
          if(err) return console.error(err);
          res.send(brand);
      })

  });
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;


  Brand.findByIdAndRemove(id, (err, todo) => {
      if(todo == null){
          res.status(404).send('server error')
          return;
      } else if(err){
          res.status(500).send(err)
      } else {
        const aggregateQuery = Brand.aggregate([
          {
            $lookup: {
                from: "products",
                localField: "pid",
                foreignField: "_id",
                as: "productDetail"
            }
          }
        ]);
        aggregateQuery.exec(function(err,brand){
            if(err) return console.error(err);
            res.send(brand);
        })
      }
  });

})

router.get('/', (req, res) => { 
  const aggregateQuery = Brand.aggregate([
    {
      $lookup: {
          from: "products",
          localField: "pid",
          foreignField: "_id",
          as: "productDetail"
      }
    }
  ]);
  aggregateQuery.exec(function(err,brand){
      if(err) return console.error(err);
      res.send(brand);
  })
})

router.get('/:id', (req,res) => {
  let name = req.params.name;
  Brand.findById(id,(err, Brand) => {
    if(err) return console.error(err);
    res.send(Brand);
  })
  
})

module.exports = router;