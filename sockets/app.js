const express = require('express');
const app = express();
var { SerialPort } = require('serialport');

var port = 3000;

var arduinoCOMPort = "COM6";

var arduinoSerialPort = new SerialPort({
    path:arduinoCOMPort,
    baudRate:9600,
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {

    return res.send('Working');
 
})

app.get('/:action', function (req, res) {
    
   var action = req.params.action || req.param('action');
    
    if(action == 'led'){
        arduinoSerialPort.write("w");
        return res.send('Led light is on!');
    } 
    if(action == 'off') {
        arduinoSerialPort.write("t");
        return res.send("Led light is off!");
    }
    
    return res.send('Action: ' + action);
 
});

app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});