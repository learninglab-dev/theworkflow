// File: ./models/moment.js

//Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var momentSchema = new Schema({
    shoot_id  : Schema.Types.ObjectId,
    in_tc : String,
    out_tc : String,
    duration: Number,
    notes : String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt'} });

//Export function to create "moment" model class
module.exports = mongoose.model('moment', momentSchema );
