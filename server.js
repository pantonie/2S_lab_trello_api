const express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    keys = require('./keys.json'),
    Trello = require('./trello'),
    trello = new Trello(keys);


app.get('/lists', function(req, res){
    trello.get({name: 'lists'}, req, res);
});

app.get('/list/:id', function(req, res){
    trello.get({name: 'list', id: req.params.id}, req, res);
});

app.listen(port, function(){

});

console.log('App is working on port ', port);