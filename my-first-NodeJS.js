//create a first server that prints hello world.
let http  = require('http')

//instead of http.createServer(function(req, res){}), just use arrow function they are just both
http.createServer((req, res) =>{
    res.writeHead(200, {'Content-type' : 'text/html'})
    res.end("Hello NodeJS")
}).listen(3000)