var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb3649ms:qy4hyg@danu7.it.nuigalway.ie:8717/mongodb3649');
//connect to our database

exports.connection = connection;