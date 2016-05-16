var PORT = 3000;




var Game = require('./Game.js');




var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
    console.log('Welcome to Node Connect-4!');

    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req;  // sets req obj for each client identified by socket.id
        clientInfo[socket.id].game = new Game();
        clientInfo[socket.id].game.createBoard();



        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!'
        });
    });    


    socket.on('playerMove', function(move) {
        var p = move.player.toUpperCase();
        var c = move.column.toUpperCase();

        console.log('Player: ' + move.player + ' chooses column: ' + move.column);

        clientInfo[socket.id].game.move(p, c);


    });


    socket.on('message', function(data) {
        console.log('Message received: ' + message.text);
            // socket.broadcase.emit sends to all EXCEPT current connection
            // ONLY emit the MESSAGE to members in the same room as the current client connection
        io.to(clientInfo[socket.id].room).emit('message', message); 
    });




    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];
        if(typeof userData !== undefined) {
            socket.leave(userData.room);
            console.log(userData.name + ' has left the game.');
        }
        delete clientInfo[socket.id];
    });



});






http.listen(PORT, function() {
    console.log('Server started!');
});
