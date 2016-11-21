var fs              = require('fs');
var Promise         = require('promise');
var GoogleAPI       = require('googleapis');
var EventEmitter    = require('events');
var StringFormat    = require('./StringFormat.js');

class GSheetsAuthenticator extends EventEmitter {
    constructor(params) {
        super();

        this.hasFired_ = {};
        this.eventData_ = {};

        GetGoogleAuthKey(params)
          .then(GetGoogleAuthClient)
          .done(
            (authClient) => {
                let gSheetsObj = new GSheetsInternal({
                    auth: authClient,
                    sheetID: params.spreadsheetId
                });
                this.emitPersistentEvent_('ready', gSheetsObj);
            },
            (err) => {
                this.emitPersistentEvent_('error', err);
            }
        );
    }
    on(eventName, listenerFn) {
        if (this.hasFired_[eventName] === true) {
            listenerFn(this.eventData_[eventName]);

            return;
        }
        super.on(eventName, listenerFn);
    }
    emitPersistentEvent_(eventName, eventData) {
        this.eventData_[eventName] = eventData;
        this.hasFired_[eventName] = true;

        this.emit(eventName, eventData);
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

        this.apiPromise_ = Promise.resolve(null);
    }
    append(data, callback) {
        this.apiPromise_ = this.apiPromise_.then(() => {
            let formattedData = FormatData(this.valueFormat_, data);

            return new Promise((resolveFn, rejectFn) => {
                this.gSheets_.spreadsheets.values.append({
                    auth: this.auth_,
                    spreadsheetId: this.sheetID_,
                    range: this.range_,
                    valueInputOption: 'RAW',
                    resource: {
                        majorDimension: this.majorDimension_,
                        values: [formattedData]
                    }
                },
                (err, response) => {
                    callback(err, response);

                    if (!err) {
                        resolveFn();
                    }
                });
            });
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
