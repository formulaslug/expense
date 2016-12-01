var mongoose = require('mongoose')
var schema = mongoose.Schema()

var SlackSchema = mongoose.Schema({
    user_name: String,
    first_name: String,
    last_name: String,
  	email: String,
    phone_number: String,
    cost: String,
    link: String
})

module.exports = mongoose.model('Slack', SlackSchema);
