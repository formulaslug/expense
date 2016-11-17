// app.js

// package
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var Form = require('./model/Form')


mongoose.connect('mongodb://localhost:27017'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


// Routes
var router = express.Router();

router.use(function(req, res, next) {
    // console.log(req.connection.remoteAddress + ' response: ' + res.statusCode)
    next()
})

router.get('/', function(req, res) {
    res.json({ message: 'nothing here for you right now.' });
});


// REGISTER

// Post to Slack
function postMessageToSlack(name, amount) {
    var url = "https://hooks.slack.com/services/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"
    var text = name + " requested a reimbursement of $" + amount + "."

    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('payload=' + JSON.stringify({ "text": text }));
}


// Form
router.route('/form').post(function(req, res) {
    var form = new Form()
    // form.name = req.body.name
    // form.cost = req.body.cost

    postMessageToSlack(req.body.first_name, req.body.value)

    // if (form.name == null && form.cost == null) {
    //     form.link = "https://formulaslug.com/form?{#}";
    // }

    // form.save(function(err) {
    //     if (err)
    //         res.send(err);
    //     res.json(form);
    // })
})
// .get(function(req, res) {
//     Form.find(function(err, form) {
//         if (err)
//             res.send(err);
//         res.json(form);
//     });
// });

// END REGISTER


// prefix routed with /api
app.use('/api', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('cash money on ' + port)
