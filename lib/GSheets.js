var fs              = require('fs');
var Promise         = require('promise');
var GoogleAPI       = require('googleapis');
var EventEmitter    = require('events');
var StringFormat    = require('./StringFormat.js');

class GSheetsAuthenticator extends EventEmitter {
    constructor(params) {
        super();

        this.hasFired_ = {};
        this.hasFired_.ready = false;
        this.hasFired_.error = false;

        this.on('ready', (gSheets) => {
            this.hasFired_.ready = true;
            this.gSheetsObj_ = gSheets;
        });
        this.on('error', (err) => {
            this.hasFired_.error = true;
            this.errorObj_ = err;
        });
        this.on('newListener', (evName, listenerFn) => {
            if (evName === 'ready' && this.hasFired_.ready) {
                listenerFn(this.gSheetsObj_);
            } else if (evName === 'error' && this.hasFired_.error) {
                listenerFn(this.errorObj_);
            }
        });

        GetGoogleAuthKey(params)
          .then(GetGoogleAuthClient)
          .done(
            (authClient) => {
                let gSheetsObj = new GSheetsInternal({
                    auth: authClient,
                    sheetID: params.spreadsheetId
                });
                this.emitReadyEvent_(gSheetsObj);
            },
            (err) => {
                this.emitErrorEvent_(err);
            }
        );
    }
    emitReadyEvent_(gSheets) {
        this.gSheetsObj_ = gSheets;

        this.hasFired_.ready = true;
        this.emit('ready', gSheets);
    }
    emitErrorEvent_(errObj) {
        this.errorObj_ = errObj;

        this.hasFired_.error = true;
        this.emit('error', errObj);
    }
}

class GSheetsInternal {
    constructor(params) {
        this.auth_ = params.auth;
        this.sheetID_ = params.sheetID;
    }
    getTableWriter(params) {
        return new GSheetsTableWriter({
            auth: this.auth_,
            sheetID: this.sheetID_,
            range: params.range,
            valueFormat: params.valueFormat,
            majorDimension: params.majorDimension
        });
    }
}

class GSheetsTableWriter {
    constructor(params) {
        this.auth_ = params.auth;
        this.sheetID_ = params.sheetID;
        this.range_ = params.range;
        this.valueFormat_ = params.valueFormat;
        this.majorDimension_ = params.majorDimension;

        this.gSheets_ = GoogleAPI.sheets('v4');
    }
    append(data) {
        let formattedData = FormatData(this.valueFormat_, data);

        this.gSheets_.spreadsheets.values.append({
            auth: this.auth_,
            spreadsheetId: this.sheetID_,
            range: this.range_,
            valueInputOption: 'RAW',
            resource: {
                majorDimension: this.majorDimension_,
                values: [formattedData]
            }
        });
        return this;
    }
}

function FormatData(valueFormat, data) {
    return valueFormat.map((formatStr) => StringFormat.format(formatStr, data));
}

function GetGoogleAuthKey(params) {
    if (params.authJSON !== undefined) {
        return Promise.resolve(params.authJSON);
    } else if (params.authJSONFile !== undefined) {
        return new Promise((resolveFn, rejectFn) => {
            fs.readFile(params.authJSONFile, (err, fileData) => {
                if (err) {
                    rejectFn(err);
                    return;
                }
                resolveFn(JSON.parse(fileData));
            });
        });
    }
    return Promise.reject(new Error('Missing required auth parameters.'));
}
function GetGoogleAuthClient(authJSON) {
    return new Promise((resolveFn, rejectFn) => {
        let googleAuth = new GoogleAPI.auth.JWT(
            authJSON.client_email,
            null,
            authJSON.private_key,
            'https://www.googleapis.com/auth/spreadsheets',
            null
        );
        googleAuth.authorize((err) => {
            if (err) {
                rejectFn(err);
                return;
            }
            resolveFn(googleAuth);
        });
    });
}

module.exports = GSheetsAuthenticator;
