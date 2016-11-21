var mongoose = require('mongoose')
var schema = mongoose.Schema()

var FormSchema = mongoose.Schema({
    first_name: String,
	last_name: String,
	email: String,
    cost: String,
    link: String
})

module.exports = mongoose.model('Form', FormSchema)
