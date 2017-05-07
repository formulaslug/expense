var phantom = require('x-ray-phantom');
var Xray = require('x-ray');
var Promise = require('bluebird');

var x = Xray({
    filters: {
        trim: function(value) {
            return typeof value === 'string' ? value.trim() : value
        },
        reverse: function(value) {
            return typeof value === 'string' ? value.split('').reverse().join('') : value
        },
        slice: function(value, start, end) {
            return typeof value === 'string' ? value.slice(start, end) : value
        }
    }
}).driver(phantom());


function parse(link) {
    return new Promise((resolve, reject) => {
        x(link, 'html', {
            partNumber: 'meta@content',
            mPartNumber: 'h1[itemprop] | trim',
            title: 'title'

        })(function(err, obj) {
            if (err) throw err;
            console.log(obj);
            resolve(obj);
        });
    })
}

module.exports = {
    parse: parse
}
