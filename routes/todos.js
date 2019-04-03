const express = require('express');
const router = express.Router();

// Todo model
const Todo = require('../models/todo');

// new todo form
router.get('/add', function(req, res){
  res.render('add_todo', {
    title: 'Add Todo list'
  });
});

// submit new todo 
router.post('/add', function(req, res){
  // Express validatord
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_todo', {
      title: 'Add Todo list',
      errors: errors
    });
  } else {
    let todo = new Todo();
    todo.title = req.body.title;
    todo.body = req.body.body;

    todo.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Todo list Added');
        res.redirect('/');
      }
    });
  }
});

// update todo 
router.post('/edit/:id', function(req, res){
  let todo = {};
  todo.title = req.body.title;
  todo.body = req.body.body;
  let query = {_id: req.params.id};

  Todo.update(query, todo, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      //
      //парни, я не знаю почему оно не отрабыатывает, именно поэтому повесил на фронте  alert('todo updated') и window.location.href = '/';
      // прошу помочь
      //
      console.log('заходит в саксесс');
      req.flash('success', 'Todo list Updated'); 
      res.redirect('/');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};

  Todo.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Todo Deleted')
      res.send('Success');
    }
  });
});

// get single todo
router.get('/:id', function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    res.render('todo', {
      title: todo.title,
      todos: todo.body,
      todo_id: todo._id
    });
  });
});

module.exports = router;