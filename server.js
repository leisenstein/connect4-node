var PORT = 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));



io.on('connection', function(socket) {
    console.log('User connected via socket.io!');


    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;  // sets req obj for each client identified by socket.id
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!'
        });
    });



    socket.on('message', function (message) {    
         console.log('Message received: ' + message.text);
         
         if(message.text === '@currentUsers') {
            sendCurrentUsers(socket);
         } else {
            message.timespamp = moment().valueOf();
            // socket.broadcast.emit sends to all EXCEPT current connection
            // ONLY emit the MESSAGE to members in the same room as the current client connection
            io.to(clientInfo[socket.id].room).emit('message', message); 
         }
         
    });


});






http.listen(PORT, function() {
    console.log('Server started!');
});
