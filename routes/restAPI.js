var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validator = require('validator');
var Form = require('../model/Form');
var SlackForm = require('../model/Slack');
var GSheets = require('../lib/GSheets.js');
var Slack = require('../lib/Slack.js');

// start gSheets
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
// end gSheets

// start router request handler

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
// TODO: Clean up this POST request with new Slack library. See '../lib/Slack.js'
router.post('/', function(req, res) {
    var link = 'http://localhost:3000/expense/';
    var username = req.body.username;
    var first_name;
    var last_name;

    Slack.api("users.list", function(err, response) {
      for( var key in response.members ) {
        if (!response.members.hasOwnProperty(key)) continue;
        var user_obj = response.members[key];
        var user_name = user_obj.name;
        if(user_name == username) {
          first_name = user_obj.real_name.split(" ")[0];
          last_name = user_obj.real_name.split(" ")[1];
          console.log(username + ' ' + first_name + ' ' + last_name);

          var form = { first_name: first_name, last_name: last_name, user_name: username };
          res.render('expense', { title: 'Expense', form });
          return;
        }
      }
      var error = 'Sorry! Your username was not found on FSAE Slack directory!';
      res.render('index', { title: 'Expense', message: error});
    });

    // TODO: does this person exist code here
    // if they do not exist, then do:
    // var message = first_name + " " + last_name + " is new, and wants to submit a reimbursement request, but hasn't filled out a 204 yet. You should message them at @" + username
    // TODO: post in #finance, here's the link: // WEBOOK URL = "https://hooks.slack.com/services/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"
    // End TODO.
    // res.render('index', { title: 'Expense', error: 'user not found' });
})

// end router request handler

module.exports = router;
