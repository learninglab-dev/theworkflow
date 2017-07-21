var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    hire_date: {type: Date},
  }
);

// Virtual for author's full name
personSchema
.virtual('name')
.get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for author's URL
personSchema
.virtual('url')
.get(function () {
  return '/catalog/person/' + this._id;
});

//Export model
module.exports = mongoose.model('person', personSchema);
