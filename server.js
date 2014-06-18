var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var _ = require('lodash');


app.configure(function () {
  
 // Request body parsing middleware should be above methodOverride
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.json());
  
  app.use(cors());

  app.use(app.router);
});


var todos = [{
  id: 1,
  name: 'Ir al shopping',
  completed: false
}, {
  id: 2,
  name: 'Ir al super',
  completed: true
}, {
  id: 3,
  name: 'Ir al almacen',
  completed: false
}]

app.get('/api/todos', function(req, res) {
  res.json(todos);
});

app.post('/api/todos', function(req, res) {
  console.log(req.body);
  var todo = {
    id: req.body.id,
    name: req.body.name,
    completed: req.body.completed
  };

  todos.push(todo);

  res.send(200, todo);
});

app.put('/api/todos/:id', function(req, res) {
  var todo = _.find(todos, {id: parseInt(req.params.id, 10)});

  if (!todo) {
    res.send(404);
  } else {

    todo.id = req.body.id;
    todo.name = req.body.name;
    todo.completed = req.body.completed;
    res.send(200, todo);
    
  }
});

app.get('/api/todos/:id', function(req, res) {
  var todo = _.find(todos, {id: parseInt(req.params.id, 10)});

  if (!todo) {
    res.send(404);
  } else {
    res.send(200, todo);
    
  }
});

app.delete('/api/todos/:id', function(req, res) {
  var idx = _.findIndex(todos, {id: parseInt(req.params.id, 10)});

  if (idx < 0) {
    res.send(404);
  } else {

    todos.splice(idx, 1);
    res.send(200, todos);  
  }

});

var port = process.env.PORT || 5000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});