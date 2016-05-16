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


var playButton = $('#btnPlay');
var gameForm = $('#game-form');

gameForm.on('submit', function(event) {
    event.preventDefault();
    console.log('GameForm Submitted!');
    var player = $('#txtPlayer').val();
    var column = $('#txtColumn').val();


    socket.emit('playerMove', {
        player: player,
        column: column
    });


});