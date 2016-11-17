var mongoose = require('mongoose');
var schema = mongoose.Schema();

var FormSchema = mongoose.Schema({
    name: String,
    cost: String,
    link: String
});

module.exports = mongoose.model('Form', FormSchema);