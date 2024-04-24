var {Server} = require('socket.io');
const {kakegurui} = require('./sockets-events-server.js');

var http = require('http');
var fs = require('fs');
var path = require('path');

var extFiles = {'.html': 'text/html', '.js':'text/javascript', '.css':'text/css'};

const app= http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': extFiles[path.extname(req.url)]});
    res.end(fs.readFileSync(req.url.substring(1)))
})

const io = new Server(app);

io.on("conection" , kakegurui(io));

app.listen(4000, ()=> {
    console.log('Corriendo');
});