var readLine = require('readline');
var Order = require('./order');
var digikey = require('./parser/digikey');
var fs = require('fs');

function createReadStream(filePath) {
  return readLine.createInterface({
    input: require('fs').createReadStream(filePath)
  });
}

function csvToOrder(filePath) {
  return new Promise((resolve, reject) => {
    var orders = [];
    var lineReader = createReadStream(filePath + ".csv");
    lineReader.on('line', function (line) {
      var parts = line.split(',');
      var link = parts[0],
          user = 'wx',
          quantity = parts[1];
      var order = new Order(link, user, quantity);
      digikey.parse(link).then(function(attr) {
        if(attr.partNumber) order.setPartNumber(attr.partNumber);
        if(attr.mPartNumber) order.setMPartNumber(attr.mPartNumber);
        orders.push(order);
        console.log(order);
        let orderData = order.getUser() + "," + order.getLink() + "," + order.getQuantity() + ","
                            + order.getPartNumber() + "," + order.getMPartNumber() + "\n";
        fs.appendFile(filePath + '-gen.csv', orderData, 'utf8');
      })
    });
  })
}

let file = './csv/cb-form';
csvToOrder(file);
