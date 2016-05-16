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

socket.on('boardUpdate', function(newBoard) {
    for(var i = 0; i<newBoard.length;i++) {
        console.log(newBoard[i].toString());
    }

});
var playButton = $('#btnPlay');
var gameForm = $('#game-form');

gameForm.on('submit', function(event) {
    event.preventDefault();
    // console.log('GameForm Submitted!');
    var txtPlayer = $('#txtPlayer');
    var txtColumn = $('#txtColumn');

    var player = txtPlayer.val();
    var column = txtColumn.val();

    socket.emit('playerMove', {
        player: player,
        column: column
    });
    txtPlayer.val('');
    txtColumn.val('');


});