var fs = require('fs');
var Promise = require('promise');
var GoogleApis = require('googleapis');

var globalData = {};

var TEST_ROW_DATA = {
    majorDimension: 'ROWS',
    values: [
        ['John Doe', 'example@example.org', '99.99']
    ]
};

function LoadFile(fileName, encoding = 'utf-8') {
    return new Promise(function(resolveFn, rejectFn) {
        fs.readFile(fileName, encoding, function(err, fileData) {
            if (err) {
                rejectFn(fileName, err);
                return;
            }
            resolveFn(fileData);
        });
    });
}
function GetGoogleAuthClient() {
    var serviceAccountFile = 'service-account.json';

    return LoadFile(serviceAccountFile).then(function(fileData) {
        var keyData = JSON.parse(fileData);

        var auth = new GoogleApis.auth.JWT(
            keyData.client_email,
            null,
            keyData.private_key,
            'https://www.googleapis.com/auth/spreadsheets',
            null
        );
        return new Promise(function(resolveFn, rejectFn) {
            auth.authorize(function(err) {
                if (err) {
                    rejectFn(err);
                    return;
                }
                resolveFn(auth);
            });
        });
    });
}
function GetSpreadsheetID() {
    // Reading from a file was not working correctly for some reason.
    return Promise.resolve('1Rg7K7F4y4PL4LPvB32kKRb6FEd8uV5hOkSa0rcnkDWM');
}
function AppendRow() {
    var gSheets = GoogleApis.sheets('v4');

    gSheets.spreadsheets.values.append({
        auth: globalData.gAPIAuthClient,
        spreadsheetId: globalData.spreadsheetID,
        range: 'A1:C1',
        valueInputOption: 'USER_ENTERED',
        resource: TEST_ROW_DATA
    });
}
    
function main() {
    var googleAuth = GetGoogleAuthClient().then(function(authClient) {
        globalData.gAPIAuthClient = authClient;
    });
    var spreadsheetIDFetcher = GetSpreadsheetID().then(function(id) {
        globalData.spreadsheetID = id;
    });

    Promise.all([googleAuth, spreadsheetIDFetcher]).done(function() {
        AppendRow();
    });
}
main();
