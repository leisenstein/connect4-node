var chatroom = getQueryVariable('chatroom') || 'None';
var player = getQueryVariable('player') || 'Anonymous';


console.log(chatroom);
console.log(player);

var socket = io();



socket.on('connect', function() {
   console.log('connected');
   socket.emit('joinRoom', {
        name: player,
        room: chatroom
    });

});




playButton.on('submit', function(event) {
    
    var playButton = $('btnPlay');
    var player = $('player').text();
    var column = $('column').text();



    socket.emit('playerMove', {
        player: player,
        column: column
    });
});