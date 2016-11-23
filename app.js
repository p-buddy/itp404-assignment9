require('dotenv').config();

var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var cors = require('cors'); //cross origin research sharing
var Vimeo = require('vimeo').Vimeo;

//vimeo module I created
var vimeo = require('./api/vimeo');


//gets the list of 'staff picks' videos
//outputs them nicely
app.get('/vimeo', function(request, response) {
  vimeo.getStaffPicks().then(function(picks){
    response.json(picks);
  });
});

app.listen(3000)
