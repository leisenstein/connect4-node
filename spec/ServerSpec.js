describe('game', function() {
    var game;
    var board;

    beforeEach(function() {
        game = new Game();
        board = [
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "]
        ];
        game.createBoard();
    });

    it('should create a board an empty', function() {    
        expect(game.currentBoard).toEqual(board);
    });

    it('should have board with R in column 1', function() {
        board[5][0] = "R";
        game.move('R',1);
        expect(game.currentBoard).toEqual(board);

    });

    it('should have board with R in column 1, then Y in column 1', function() {
        board[5][0] = "R";
        board[4][0] = "Y";
        game.move('R',1);
        game.move('Y', 1);
        expect(game.currentBoard).toEqual(board);

    });

    it('should have board with full column 1 returns Invalid move', function() {
        game.move('R',1);
        game.move('Y', 1);
        game.move('R',1);
        game.move('Y', 1);
        game.move('R',1);
        game.move('Y', 1);
        expect(game.move('R',1)).toEqual('Invalid Move');
    });


    it('should return winner for horizontal 4 in a row R win', function() {
        game.move('R', 1);
        game.move('R', 2);
        game.move('R', 3);
        game.move('R', 4)
        expect(game.checkForWinnerHorizontal()).toEqual('R Wins');
    });

    it('should return winner for vertical 4 in a row R wins', function() {
        game.move('R', 1);
        game.move('R', 1);
        game.move('R', 1);
        game.move('R', 1);
        expect(game.checkForWinnerVertical()).toEqual('R Wins');
    });

    it('should return a winner for diagonal 4 going forward', function() {
        game.move('Y', 1);
        game.move('R', 1);
        game.move('Y', 1);
        game.move('R', 1);
        game.move('R', 2);
        game.move('Y', 2);
        game.move('R', 2);  
        game.move('Y', 3);
        game.move('R', 3);
        game.move('R', 4);
        expect(game.checkForWinnerDiagonal()).toEqual('R Wins');
    });


    it('should return a winner for diagonal 4 going forward starting at 2', function() {
        game.move('Y', 1+2);
        game.move('R', 1+2);
        game.move('Y', 1+2);
        game.move('R', 1+2);
        game.move('R', 2+2);
        game.move('Y', 2+2);
        game.move('R', 2+2);  
        game.move('Y', 3+2);
        game.move('R', 3+2);
        game.move('R', 4+2);
        expect(game.checkForWinnerDiagonal()).toEqual('R Wins');
    });


    it('should return a winner for diagonal 4 going backward direction', function() {
        game.move('Y', 7);
        game.move('R', 7);
        game.move('Y', 7);
        game.move('R', 7);
        game.move('R', 6);
        game.move('Y', 6);
        game.move('R', 6);  
        game.move('Y', 5);
        game.move('R', 5);
        game.move('R', 4);
        expect(game.checkForWinnerDiagonal()).toEqual('R Wins');
    });



    it('should return a winner for diagonal 4 going backward direction along top row', function() {
        game.move('Y', 7-3);
        game.move('R', 7-3);
        game.move('Y', 7-3);
        game.move('R', 7-3);
        game.move('R', 6-3);
        game.move('Y', 6-3);
        game.move('R', 6-3);  
        game.move('Y', 5-3);
        game.move('R', 5-3);
        game.move('R', 4-3);
        expect(game.checkForWinnerDiagonal()).toEqual('R Wins');
    });

    it('should return invalid input for diagonal 4 going backward direction along top row', function() {
        expect(game.move('R', 0)).toEqual('Invalid Move');
        expect(game.move('R', 8)).toEqual('Invalid Move');
    });


});

