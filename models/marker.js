// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var markerSchema = new Schema({
    payload : Schema.Types.Mixed
});


// Virtual for book's URL
// shootSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/shoot/' + this._id;
// });


//Export function to create "SomeModel" model class
module.exports = mongoose.model('marker', markerSchema );
