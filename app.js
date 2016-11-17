// app.js

// Import necessary packages
var express = require('express')
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var Form = require('./model/Form')
var app = express()

// Connect to our database
mongoose.connect('mongodb://localhost:27017')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var port = process.env.PORT || 3000


// Routes
var router = express.Router()

// What does this do?
router.use(function(req, res, next) {
    console.log(req.connection.remoteAddress + ':' + res.statusCode)
    next()
})

// What does this do?
router.get('/', function(req, res) {
    res.json({ message: 'nothing here for you right now.' })
})


// Sends reimbursement information to Slack
function postMessageToSlack(message) {
    var url = "https://hooks.slack.com/services/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"

    // Opens a new XMLHttpRequest, sends payload to Slack
    var request = new XMLHttpRequest()
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.send('payload=' + JSON.stringify({ "text": message }))
}


// What does this do?
router.route('/form').post(function(req, res) {
    var form = new Form()
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var amount_requested = req.body.value

    // Sends "Alexander Price requested a reimbursement of $1000"
    var fullname = first_name + ' ' + last_name
    postMessageToSlack(fullname + ' requested a reimbursement of $' + value + '.')

    form.save(function(err) {
        if (err)
            res.send(err)
        res.json(form)
    })
})
.get(function(req, res) {
    Form.find(function(err, form) {
        if (err)
            res.send(err)
        res.json(form)
    });
});


// Prefix routed with /api
app.use('/api', router)


// Start the server
app.listen(port)
console.log('Cash money on port ' + port + '.')
