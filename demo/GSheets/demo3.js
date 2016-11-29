var GSheets = require('../../lib/GSheets.js');

var authorizer = GSheets.authorize(GSheets.AUTH_METHOD_JWT, {
    authJSONFile: 'service-account.json',
    accessMode: GSheets.READ_MODE | GSheets.WRITE_MODE
});

authorizer.on('auth', OnAuth);
authorizer.on('error', (err) => {
    console.log(err);
});

function OnAuth(authClient) {
    const spreadsheetID = '1Rg7K7F4y4PL4LPvB32kKRb6FEd8uV5hOkSa0rcnkDWM';

    var expenseSheet = GSheets.connect(authClient, spreadsheetID);
    var recordWriter = expenseSheet.getTableWriter({
        range: 'A1:C1',
        majorDimension: GSheets.ROW_MAJOR,
        valueFormat: ['${name}', '${email}', '${cost}']
    });
    recordWriter
      .append({name: 'John Doe', email: 'example@example.org', cost: '99.99'})
      .append({name: 'John Dough', email: 'example@example.org.uk', cost: '66.66'})
      .append({name: 'Jean D\'eau', email: 'exemple@exemple.fr', cost: '33.33'});
}
