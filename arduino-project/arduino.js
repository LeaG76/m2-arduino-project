const SerialPort = require('serialport').SerialPort;
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
// for windows
const portName = 'COM4';
// for linux/unix
// const portName = '/dev/ttyACM0';
const port = 4000;
const wss = new WebSocket.Server({ port: 7000,ip:'0.0.0.0' });
const clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
    ws.on('message', (str) => {
        str = str.toString();
        if(str == "send data") {
            let data1 = fs.readFileSync('./public/databases/walkers.json', 'utf8');
            let data2 = fs.readFileSync('./public/databases/cars.json', 'utf8');
            let json1 = JSON.parse(data1);
            let json2 = JSON.parse(data2);
            let lenght1 = Object.keys(json1).length;
            let lenght2 = Object.keys(json2).length;
            let numberWalkers = json1[lenght1]["numbers"];
            let numberCars = json2[lenght2]["numbers"];
            let str = numberWalkers + "|" + numberCars;
            console.log(str);
            
            arduino.write(str, function(err) {
                if (err) {
                return console.log('Error on write: ', err.message)
                }
                console.log('message written')
            });
        }
    });
});

const index = fs.readFileSync('./views/index.pug');

var arduino = new SerialPort({
    path: portName,
    baudRate: 9600
});

arduino.on("open", () => {
    console.log('Serial Port open, communication with arduino : OK');
});

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

server.listen(port,()=>{
    console.log("server run on", port)
});

console.log("Server OK");

var io = require('socket.io')(server);

arduino.on('data', function(data) {
    data = data.toString().trim();
    if(data == "1" || data == "2" || data == "3" || data == "4") {

        for(let i=0; i< clients.length; i++) {
            clients[i].send(data);
        }

        if(data == "1") {
            console.log("Feu vert");
        } else if(data == "2") {
            console.log("Feu orange");
        } else if(data == "3") {
            console.log("Feu rouge");
        } else if(data == "4") {
            console.log("Feu orange et rouge");
        }
        console.log('Received data from port : ' + data);
    }
});