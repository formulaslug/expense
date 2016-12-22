var fs = require('fs');
var Promise = require('promise');
var Slack = require('slack-node');

// TODO: Halp! We need a slack library that takes in auth key and returns slack node object!
// We also might not want to keep pulling every time since we're running async.
// Can we do a cache with the user data?
// Preferably including these in built functions
// # getSlackUser(username) - Reason: Slack API only returns the list of users
var key = getSlackAuthKey('slack-auth');
var slack = new Slack(key);

function getSlackAuthKey(filePath) {
  var fs = require('fs');
  var contents = fs.readFileSync(filePath, 'utf8');
  return contents;
}

module.exports = slack;
