var _ = require('lodash'); // https://lodash.com/
var request = require('request');
var promise = require('promise');
var EventEmitter = require('events').EventEmitter;

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

var slack = new Slack({
    'token': 'xoxp-6044688833-89005245079-117527095396-dc881c9094fcc59c0d896904969f771e'
});
slack.on('ready', function() {
  slack.getUser('williamxu').then(function(data) {
    console.log(data);
  });
})
