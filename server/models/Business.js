let mongoose = require('mongoose');

// create  a model class
let businessSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String
},
{
  collection: "Business"
});

const Business = mongoose.model('Business', businessSchema);


module.exports = Business
