var fs              = require('fs');
var Promise         = require('promise');
var GoogleAPI       = require('googleapis');
var EventEmitter    = require('events');
var StringFormat    = require('./StringFormat.js');

const AUTH_METHOD_JWT   = 1;

const ACCESS_READ       = 1;
const ACCESS_WRITE      = 2;

const ROW_MAJOR         = 1;
const COLUMN_MAJOR      = 2;

class GSheetsBaseAuthenticator extends EventEmitter {
    constructor(params) {
        super();

        this.hasFired_ = {};
        this.eventData_ = {};
    }
    emitPersistent(eventName, eventData) {
        this.eventData_[eventName] = eventData;
        this.hasFired_[eventName] = true;

        this.emit(eventName, eventData);

        return this;
    }
    on(eventName, eventListener) {
        if (this.hasFired_[eventName] === true) {
            eventListener(this.eventData_[eventName]);
        } else {
            super.on(eventName, eventListener);
        }
        return this;
    }
}
class GSheetsJWTAuthenticator extends GSheetsBaseAuthenticator {
    constructor(params) {
        super(params);

        GetGoogleAuthKey(params)
          .then(GetGoogleAuthClient)
          .done(
            (authClient) => {
                this.emitPersistent('auth', authClient);
            },
            (err) => {
                this.emitPersistent('error', err);
            }
        );
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

class GSheetsAPICaller {
    constructor(params) {
        this.apiPromise_ = Promise.resolve(null);
    }
    apiCall(apiFn, callbackFn) {
        this.apiPromise_ = this.apiPromise_.then(() => {
            return new Promise((resolveFn, rejectFn) => {
                apiFn((err, result) => {
                    callbackFn(err, result);

                    if (err) {
                        rejectFn(err);
                        return;
                    }
                    resolveFn(result);
                });
            });
        });
    }
}
class GSheetsTableWriter extends GSheetsAPICaller {
    constructor(params) {
        super(params);

        this.auth_ = params.auth;
        this.sheetID_ = params.sheetID;
        this.range_ = params.range;
        this.valueFormat_ = params.valueFormat;
        this.majorDimension_ = params.majorDimension;

        this.gSheets_ = GoogleAPI.sheets('v4').spreadsheets.values;
    }
    append(data, callback = () => {}) {
        let formattedData = FormatData(this.valueFormat_, data);

        let apiFn = (callbackFn) => {
            this.gSheets_.append({
                    auth: this.auth_,
                    spreadsheetId: this.sheetID_,
                    range: this.range_,
                    valueInputOption: 'RAW',
                    resource: {
                        majorDimension: this.majorDimension_,
                        values: [formattedData]
                    }
                },
                callbackFn
            );
        };
        this.apiCall(apiFn, callback);

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

function AuthenticateGSheets(authMode, authParams) {
    switch (authMode) {
        case AUTH_METHOD_JWT:
            return new GSheetsJWTAuthenticator(authParams);
        default:
            throw new Error('Unrecognized authentication method.');
    }
}
function ConnectToGSheet(authClient, sheetId) {
    return new GSheetsInternal({
        auth: authClient,
        sheetID: sheetId
    });
}

module.exports = {
    authenticate:       AuthenticateGSheets,
    connect:            ConnectToGSheet,

    AUTH_METHOD_JWT:    AUTH_METHOD_JWT,

    ACCESS_READ:        ACCESS_READ,
    ACCESS_WRITE:       ACCESS_WRITE,

    ROW_MAJOR:          ROW_MAJOR,
    COLUMN_MAJOR:       COLUMN_MAJOR
};
