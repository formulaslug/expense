var express = require('express');
var router = express.Router();
var validator = require('validator');
var Form = require('../model/Form');
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
    console.log('gsheet ready!');
}
// end GSheets implementation

router.post('/', function(req, res) {
    var form = new Form();

  	form.first_name = req.body.first_name;
  	form.last_name = req.body.last_name;
  	form.email = req.body.email;
  	form.cost = req.body.value;

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

    res.render('index', { title: 'Expense', error: 'Success! Form Sent!' });
});

router.get('/', function(req, res) {
    Form.find(function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
});

module.exports = router;
