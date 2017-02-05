var fs = require('fs');
var Promise = require('promise');
var Slack = require('slack-node');

const key = getSlackAuthKey('slack-auth');
const slack = new Slack(key);

function getSlackAuthKey(filePath) {
    var fs = require('fs');
    var contents = fs.readFileSync(filePath, 'utf8');
    return contents;
}

var _SlackUtil = class SlackUtil {
    constructor() {
        this._slack = slack;
        this._members = [];
        this.map = []; // implement map
    }

    getUser(username, callback) {
        this._slack.api("users.list", function(err, response) {
            if (!SlackUtil._members) {
                SlackUtil._members = response.members;
            }
            for (var key = 0; key <= SlackUtil._members.length; key++) { // key { 1 to x }
                if (key == SlackUtil._members.length) {
                    const error = { 'code': '404' };
                    callback && callback(error);
                    return;
                }

                // response does not have child, continue
                if (!SlackUtil._members.hasOwnProperty(key)) continue;
                const user = SlackUtil._members[key];
                const _username = user.name;
                if (_username == username) {
                    var _user = {
                        'first_name': user.profile.first_name,
                        'last_name': user.profile.last_name,
                        'username': _username,
                        'email': user.profile.email
                    };
                    callback && callback(_user);
                    return;
                }
            }
        })
        // return { 'error': 'User not found!', 'code': '404'};
    }
};

var util = new _SlackUtil();
module.exports = util;
