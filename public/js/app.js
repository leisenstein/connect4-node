//$(document).ready({ });

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
    var htmlText = '';
    var p = '';
    for(var i = 0; i<newBoard.length;i++) {
        console.log(newBoard[i].toString());
        p = newBoard[i].toString().trim();
        if (p.length > 0) {
            htmlText += newBoard[i].toString() + '<br />';
        } else {
            htmlText += '   |   ' + '<br />';
        }
        
    }

    var uiBoard = $('#ui-board');
    console.log(htmlText);
    uiBoard.html(htmlText);
    // for(var i = 0; i<newBoard.length;i++) {
    //     uiBoard.html(uiBoard.text() + newBoard[i].toString() + '<br />');
    // }

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