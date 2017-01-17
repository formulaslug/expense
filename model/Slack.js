var mongoose = require('mongoose')
var schema = mongoose.Schema()

var SlackSchema = mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
  	email: String
})

module.exports = mongoose.model('Slack', SlackSchema)
