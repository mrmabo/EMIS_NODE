const express = require('express');
const router = express.Router();
const Books = require('../Model/books');


router.get('/', (req, res) => { 
    Books.find(function (err, books) {
        if(err) return console.error(err);
        res.send(books);
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Books.findById({_id: id},(err, book) => {
        if(err) return console.error(err);
        console.log(book)
        res.send(book)
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;

    Books.findById(id, (err, todo) => {  
        if (err) {
            res.status(500).send(err);
        } else {
            todo.name = req.body.name || req.name;
            todo.price = req.body.price || req.price;
            todo.save((err, todo) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(todo);
            });
        }
    });

    res.send(`modify book id is ${id} and name is ${req.body.name} `)
})

router.post('/', (req, res) => {
  console.log(req.body)
  let newBook = new Books(req.body)
  newBook.save((err, createdTodoObject) => {  
      if (err) {
          res.status(500).send(err);
      }
      res.status(200).send(`add book name is ${req.body.name}`)
  });
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Books.findByIdAndRemove(id, (err, todo) => {
        if(todo == null){
            res.status(404).send('server error')
            return;
        } else if(err){
            res.status(500).send(err)
        } else {
            let response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            res.status(200).send(response);
        }
    });

})

module.exports = router;