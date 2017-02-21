var request = require('request');
var promise = require('promise');
var EventEmitter = require('events').EventEmitter;

// Example
//
// var slack = new Slack({
//     'token': ''
// });
//
// slack.on('ready', function() {
//   slack.getUser('').then(function(data) {
//     console.log(data);
//   });
// })

class Slack extends EventEmitter {

    constructor(params) {
        super(params);
        this.token = params.token;

        console.assert(params.token, "Token must be defined");
        this.login();
    }

    login() {
      var _this = this;
      this.api('users.list').then(function(data) {
        _this.users = data;
        _this.emit('ready');
      });
    }

    getUser(name) {
      return this.getUsers().then(function(data) {
        for(var key in data.members) {
          var user = data.members[key];
          if(user.name == name) {
            return user;
          }
        }
      })
    }

    getUsers() {
        if (this.users) {
            return Promise.resolve(this.users);
        }

        return this.api("users.list");
    }

    api(methodName) {
        var data = {
          "url" : 'https://slack.com/api/' + methodName,
          form: { token: this.token }
        };

        return new Promise(function(resolve, reject) {
            request.post(data, function(err, req, body) {
              if(err) {
                reject(err);
                return false;
              }

              body = JSON.parse(body);
              resolve(body);
            })
        });
    }
}

module.exports = Slack;
