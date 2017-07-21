
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shootInstanceSchema = Schema({
  shoot: { type: Schema.ObjectId, ref: 'shoot', required: true }, //reference to the associated book
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
  due_back: {type: Date, default: Date.now},
});

// Virtual for bookinstance's URL
shootInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/shootinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('shootInstance', shootInstanceSchema);
