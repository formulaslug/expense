var server = require('http').createServer(function(req, res) {
    res.writeHead(200)
    res.end('Hello Http')
})

server.listen(8080)
