var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validator = require('validator');
var Form = require('../model/Form');
var SlackForm = require('../model/Slack');
var GSheets = require('../lib/GSheets.js');
var Slack = require('slack-node');

// Slack variables /////////////////////////////////////////////////////////////
apiToken = "xoxp-6044688833-12166237076-113973626977-df04fa1f1e599daf39e9a0d9ab77ec28"
slack = new Slack(apiToken)



// GSheets implementation
var recordWriter;
var gSheets = new GSheets({
    authJSONFile: 'service-account.json',
    spreadsheetId: '1AO9h4DPxaNN1XVHcY9O79FuwZISwcNaNR_wYd9NWg5o'
});

gSheets.on('ready', OnReady);
gSheets.on('error', function(err) {
    console.log(err);
});

function OnReady(expenseSheet) {
    recordWriter = expenseSheet.getTableWriter({
        range: 'A1:D1',
        valueFormat: ['${first_name}', '${last_name}', '${email}', '${cost}'],
        majorDimension: 'ROWS'
    })
}
// end GSheets implementation

// Router request handlers

// GET index.html
router.get('/', function(req, res) {
    // var id = req.query.i;
    var form = { first_name: 'Boaty', last_name: 'McBoatface', user_name: 'boaty-mcboatface' }
    res.render('expense', { title: 'Expense', form })
})

// POST form data
router.post('/submit', function(req, res) {
    var form = new Form()
    var body = req.body

    form.first_name = body.first_name
    form.last_name = body.last_name
    form.cost = body.value

    // if(!validator.isEmail(form.email)) {
    //     res.render('expense', { form, title: 'Expense', error: 'Please enter a valid email.' });
    //     return;
    // } else if(!validator.isAlpha(form.first_name) || !validator.isAlpha(form.last_name) ||
    //     form.cost.length == 0 || form.email.length == 0) {
    //       res.render('expense', { form, title: 'Expense', error: 'Please fill out all the forms.' });
    //       return;
    // } else if(!validator.isCurrency(form.cost)) {
    //     res.render('expense', { form, title: 'Expense', error: 'Please enter a valid currency.' });
    //     return;
    // }

    recordWriter.append(form);

    console.log('debug state: ' + mongoose.connection.readyState);
    // Micah: you gotta add some sort of error responding stuff pls
    // res.status('500').send('Something broke!')
})


// POST slack
router.post('/', function(req, res) {
    // var schema = new SlackForm();
    // var body = req.body;
    var link = 'http://localhost:3000/expense/'
    var username = req.body.username
    var first_name = "BOATY"
    var last_name = "MCBOATFACE"

    // TODO: does this person exist code here
    // if they do not exist, then do:
        var message = first_name + " " + last_name + " is new, and wants to submit a reimbursement request, but hasn't filled out a 204 yet. You should message them at @" + username
        // TODO: post in #finance, here's the link: // WEBOOK URL = "https://hooks.slack.com/services/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"
        slack.api("users.list", function(err, response) { console.log(response) })
    // End TODO.

    var form = { first_name: first_name, last_name: last_name, user_name: username }
    console.log(form)
    res.render('expense', { title: 'Expense', form })
})

module.exports = router;
