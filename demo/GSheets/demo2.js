var GSheets = require('../../lib/GSheets.js');

var gSheets = new GSheets({
    authJSONFile: 'service-account.json',
    spreadsheetId: '1Rg7K7F4y4PL4LPvB32kKRb6FEd8uV5hOkSa0rcnkDWM'
});

gSheets.on('ready', OnReady);
gSheets.on('error', function(err) {
    console.log(err);
});

function OnReady(expenseSheet) {
    var recordWriter = expenseSheet.getTableWriter({
        range: 'A1:C1',
        valueFormat: ['${name}', '${email}', '${cost}'],
        majorDimension: 'ROWS'
    });
    recordWriter
      .append({name: 'John Doe', email: 'example@example.org', cost: '99.99'})
      .append({name: 'John Dough', email: 'example@example.org.uk', cost: '66.66'});
}
