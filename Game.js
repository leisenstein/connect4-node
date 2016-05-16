function Game() {
    var currentBoard;

}

Game.prototype.createBoard = function() {
    this.currentBoard =  [
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " "]
    ];
}

Game.prototype.move = function(player, column) {
    column = column - 1;
    if( column < 0 || column > 6 || this.currentBoard[0][column] != ' ') {
        return 'Invalid Move';
    }
    for(var i = 5; i>=0; i--) {
        if(this.currentBoard[i][column] == " ") {
            this.currentBoard[i][column] = player;

            var result = this.checkForWinner();
            if(result == 'No Winner')
                return 'Player : ' + player + ' moved';

            return result;
        }
    }
}


Game.prototype.checkForWinner = function() {
    var winner = this.checkForWinnerHorizontal();
    if(winner != 'No Winner')
        return winner;

   winner = this.checkForWinnerVertical();
    if(winner != 'No Winner')
        return winner;

    return this.checkForWinnerDiagonal();
   
}


Game.prototype.checkForWinnerHorizontal = function() {
    var winner = "No Winner";
    this.currentBoard.map(function(row) {
        var rowString = row.join("");
        if(rowString.includes("RRRR")) {
            winner = "R Wins";
        }
        if(rowString.includes("YYYY")) {
            winner = "Y Wins";
        }
    });

    return winner;
}
Game.prototype.checkForWinnerVertical = function() {
    var columnStrings = ["", "", "", "", "", "", ""];
    var winner = "No Winner";
    for(var i = 0; i < this.currentBoard.length; i++) {
        for(var j = 0; j < this.currentBoard[i].length; j++) {
            columnStrings[j] += this.currentBoard[i][j];
        }
    }

    columnStrings.map(function(column) {
        if(column.includes("RRRR")) {
            winner = "R Wins";
        }
        if(column.includes("YYYY")) {
            winner = "Y Wins";
        }
    });

    return winner;
}
Game.prototype.checkForWinnerDiagonal = function() {
    var diagonalStrings = [];
    var winner = "No Winner";
    for(var i = 0; i < this.currentBoard.length; i++) {
        diagonalStrings.push(this.getValidDiagonal(i, 0, 1));
    }

    for(var i = 1; i < this.currentBoard[0].length; i++) {
        diagonalStrings.push(this.getValidDiagonal(0, i, 1));
    }

    for(var i = 0; i < this.currentBoard.length; i++) {
        diagonalStrings.push(this.getValidDiagonal(i, 6, -1));
    }

    for(var i = 1; i < this.currentBoard[0].length; i++) {
        diagonalStrings.push(this.getValidDiagonal(0, i, -1));
    }


    //console.log(diagonalStrings);
    diagonalStrings.map(function(diag) {
        if(diag.includes("RRRR")) {
            winner = "R Wins";
        }
        if(diag.includes("YYYY")) {
            winner = "Y Wins";
        }
    });
    this.printBoard();
    return winner;
}
    
Game.prototype.getValidDiagonal = function(row, col, direction) {
    var MAXROW = 6;
    var MAXCOL = 5;
    var result = '';
    if(direction === 1) {
        for(var i = 0; i<=MAXROW; i++) {
            if((row+i) <= MAXCOL && (col+i) <= MAXROW) {
                result += this.currentBoard[row+i][col+i];
            }
        }
    } else if(direction === -1) {
        for(var i = 0; i<=MAXROW; i++) {
            if((row+i) <= MAXCOL && (col-i) >= 0) {
                
                result += this.currentBoard[row+i][col-i];

            }
        }
    }
    

    return result;
}


Game.prototype.printBoard = function() {
    // console.log(this.currentBoard.length);
    for(var i = 0; i<this.currentBoard.length;i++) {
        console.log(this.currentBoard[i].toString());
    }
}

module.exports = Game;