var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var validator = require('validator')
var ExpenseForm = require('../model/ExpenseForm')
var SlackForm = require('../model/Slack')
var GSheets = require('../lib/GSheets.js')
var Slack = require('../lib/Slack.js')

/** Google Sheets */
var recordWriter
var gSheets = new GSheets({
    authJSONFile: 'service-account.json',
    spreadsheetId: '1AO9h4DPxaNN1XVHcY9O79FuwZISwcNaNR_wYd9NWg5o'
})

gSheets.on('ready', OnReady)
gSheets.on('error', function(err) {
    console.log(err)
})

function OnReady(expenseSheet) {
    recordWriter = expenseSheet.getTableWriter({
        range: 'A1:H1',
        valueFormat: ['${first_name}',
                      '${last_name}',
                      '${email}',
                      '${date}',
                      '${purchase_date}',
                      '${item_description}',
                      '${supplier}',
                      '${department}',
                      '${category}'
                    ],
        majorDimension: 'ROWS'
    })
}
/** end Google Sheets */

/** Request Handler */

/**
 * Router will redirect user back to root if user submits
 * request without valid input data.
 *
 * GET index.html
 * URL root/expense/
 */
router.get('/', function(req, res) {
    res.redirect('../')
})

/**
 * Called when a user submits a request with valid purchase form to /expense/submit/.
 * It will read data and write it to Google Sheets, and a PDF.
 *
 * Will direct user to a page verifying that the form has been sent, or
 * asks the user to check his form for an invalid submission.
 *
 * POST Expense Form
 * URL root/expense/submit/
 */
router.post('/submit', function(req, res) {
    var form = new ExpenseForm()
    var body = req.body
    console.log('sent')

    form.first_name = body.first_name
    form.last_name = body.last_name
    form.email = body.email
    form.date = body.date
    form.purchase_date = body.purchase_date
    form.item_description = body.item_description
    form.supplier = body.supplier
    form.department = body.department
    form.category = body.category

    /** Micah: Error Catch i.e: Something broke! */
    recordWriter.append(form)
    res.json('Maybe success?')
})


/**
 * Called when a user submits a request with their slack username.
 * Will send user the expense form if they have a valid slack username,
 * otherwise it'll tell the user to try and submit their username again.
 *
 * POST Username Submission
 * URL root/expense/
 * @type {String}
 */
router.post('/', function(req, res) {
    let username = (req.body.username.charAt(0) == '@') ? req.body.username.slice(1) : req.body.username
    Slack.getUser(username, function(user) {

        // If username is not found.
        if (user.code && user.code == 404) {
            let error = 'Sorry! Your username was not found on FSAE Slack directory!'
            res.render('index', { 'message': error })
            return
        }

        // Checks if the user has filled out the 204 form.
        /*SlackForm.findOne(user, function(err, form) {
            if (err) res.send(err)
            res.render('expense', user)
            return
            // Checks if user has filled out a 204 form.
            // if (!form) {
            //     error = 'Hey ' + user.first_name + '! You need to fill out a 204 form to use this tool!. Go to #finance'
            //     res.render('index', {
            //         'message': error
            //     })
            //     return
            // }
            //
            // If the username checks out and has filled out the 204 form, step 2!
        }) */


        // TODO: remove the below line once findOne works on mac again
        res.render('expense', user)
    })

    // TODO: does this person exist code here
    // if they do not exist, then do:
    // var message = first_name + " " + last_name + " is new, and wants to submit a reimbursement request, but hasn't filled out a 204 yet. You should message them at @" + username
    // TODO: post in #finance, here's the link: // WEBOOK URL = "https://hooks.slack.com/services/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"
    // End TODO.
})

// end router request handler

module.exports = router
