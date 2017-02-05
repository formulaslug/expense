var mongoose = require('mongoose')
var schema = mongoose.Schema()

/**
 * Notes:
 * Calendar UI for dates.
 * Department enums
 * Category enums
 */

var FormSchema = mongoose.Schema({
    first_name: String,
  	last_name: String,
    email: String,
    date: Date,
    purchase_date: Date,
    item_description: String,
    supplier: String,
    department: String,
    category: String
})

module.exports = mongoose.model('Form', FormSchema)
