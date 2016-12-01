var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validator = require('validator');
var Form = require('../model/Form');
var SlackForm = require('../model/Slack');
var GSheets = require('../lib/GSheets.js');

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
    });
    console.log('GSheet Ready!');
}
// end GSheets implementation

// Router request handlers

// GET index.html
router.get('/', function(req, res) {
  var id = req.query.i;
  var schema = SlackForm.findById(id, function(err, form) {
      if(form == null) {
        res.render('404');
      } else {
        res.render('expense', { title: 'Expense', form });
      }
  });
});

// POST form data
router.post('/', function(req, res) {
    var form = new Form();
    var body = req.body;

    form.first_name = body.first_name;
    form.last_name = body.last_name;
    form.email = body.email;
    form.cost = body.value;

    if(!validator.isAlpha(form.first_name) || !validator.isAlpha(form.last_name) ||
        form.cost.length == 0 || form.email.length == 0) {
          res.render('index', { title: 'Expense', error: 'Please fill out all the forms.' });
          return;
    } else if(!validator.isEmail(form.email)) {
        res.render('index', { title: 'Expense', error: 'Please enter a valid email.' });
        return;
    } else if(!validator.isCurrency(form.cost)) {
        res.render('index', { title: 'Expense', error: 'Please enter a valid currency.' });
        return;
    }

    recordWriter.append(form);

    console.log('debug state: ' + mongoose.connection.readyState);
    res.render('index', { title: 'Expense', error: 'Success! Form Sent!' });
});

// POST slack
router.post('/slack', function(req, res) {
  var schema = new SlackForm();
  var body = req.body;
  var link = 'http://localhost:3000/expense/?i=';// req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  schema.user_name = body.user_name;
	schema.first_name = body.first_name;
  schema.last_name = body.last_name;
  schema.email = body.email;
  schema.cost = body.value;
  schema.phone_number = body.phone_number;
  schema.link = link + schema._id;

  schema.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Slack Request: ' + schema.first_name + ' ' + schema.last_name);
    }
  });

  res.json(schema.link);
});

module.exports = router;
