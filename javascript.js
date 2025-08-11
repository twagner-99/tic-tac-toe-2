const gameboardController = (function() {
    let board = [];
    const rowsAndColumnsCount = 3;
    
    for (let i = 0; i < rowsAndColumnsCount; i++) {
        board[i] = [];
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => board;

    const updateBoard = (row, column, marker) => {
        board[row][column] = marker;
    }

    const winChecker = () => {  
        // I defined this here b/c that's where the rows and columns are defined. 
        // If I put it under gameController, I would need to re-access the rows
        // and columns variables or read the board again to get that info. Felt 
        // cleaner to do it this way. And kind of makes sense... winChecker is 
        // a gameboard reader so it makes sense under gameboardController

        // DOWN
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            let markerCountDown = 0;
            let currentMarker = board[0][j];
            for (let i = 0; i < (rowsAndColumnsCount - 1); i++) {
                if (!!currentMarker && currentMarker === board[i + 1][j]) {
                    currentMarker = board[i + 1][j];
                    markerCountDown++;

                    if (markerCountDown === (rowsAndColumnsCount - 1)) {
                        return `${playerController.getActivePlayer().name} wins!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // ACROSS
        for (let i = 0; i < rowsAndColumnsCount; i++) {
            let markerCountAcross = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCountAcross++;

                    if (markerCountAcross === (rowsAndColumnsCount - 1)) {
                        return `${playerController.getActivePlayer().name} wins!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // DIAGONAL-1
            // [0][0] & [1][1] & [2][2]
        let markerCountDiag1 = 0;
        for (let i = 0, j = 0; i < (rowsAndColumnsCount - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;

                if (markerCountDiag1 === (rowsAndColumnsCount - 1)) {
                    return `${playerController.getActivePlayer().name} wins!`;
                }
            }
            
            else {
                break;
            }
        }

        // DIAGONAL-2
            // [2][0] & [1][1] & [0][2]
        let markerCountDiag2 = 0;
        for (let i = 2, j = 0; j < (rowsAndColumnsCount - 1); i--, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i - 1][j + 1]) {
                currentMarker = board[i - 1][j + 1];
                markerCountDiag2++;

                if (markerCountDiag2 === (rowsAndColumnsCount - 1)) {
                    return `${playerController.getActivePlayer().name} wins!`;
                }
            }
            
            else {
                break;
            }
        }

        // TIE
        let markerCountTie = 0;
        for (let row of board) {
            for (let column of row) {
                if (!!column) {
                    markerCountTie++;

                    if (markerCountTie === (rowsAndColumnsCount * rowsAndColumnsCount)) {
                        return `It's a tie!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        playerController.toggleActivePlayer();
        return `${playerController.getActivePlayer().name}'s turn`;
        // Returns message of who won. If nobody wins, it toggles player and says who's turn it is.
        // This works because it will only ever reach the toggle and "players turn" return
        // if no winner or tie is found because of all the return statements.
    }

    return {
        getBoard,
        updateBoard,
        winChecker,
    };      
})();

const playerController = (function() {    
    const createPlayer = (name, marker) => {
        return {
            name,
            marker,
        }
    }

    const player1 = createPlayer('Taylor', 'X'); // Can create these in console later. Can be created within another function.
    const player2 = createPlayer('Alex', 'O');   // Then can get the names from user input when UI is added.
    let activePlayer = player1;

    console.log(`${activePlayer.name}'s turn`);

    const getActivePlayer = () => activePlayer; // EXPLORE WHY CAN'T BE FUNCT DECLARATION. MAYBE NEED TO RETURN?
    
    const toggleActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    }

    return {
        createPlayer,
        getActivePlayer,
        toggleActivePlayer,
    }
    
})();


const gameController = (function() {    
    const placeMarker = (row, column) => {
        if (!gameboardController.getBoard()[row][column]) { // If value is empty string, do stuff
            gameboardController.updateBoard(row, column, playerController.getActivePlayer().marker);

            console.log(gameboardController.getBoard());
        }

        else {
            console.log('Space already occupied, go again.');
            playerController.toggleActivePlayer();
        }
    }

    const playRound = (row, column) => {
        placeMarker(row, column);
        // let winStatus = gameboardController.winChecker();

        console.log(gameboardController.winChecker()); // Returns message of who won. If nobody wins, it toggles player and says who's turn it is.

        // if (winStatus === 'win') {
        //     console.log(`${playerController.getActivePlayer().name} wins!`);
        // }
        
        // else if (winStatus === 'tie') {
        //     console.log(`It's a tie!`);
        //     // Need to add something to play again, like a prompt or play 
        //     // again button that reloads everything
        // }
        
        // else {
        //     playerController.toggleActivePlayer();
        //     console.log(`${playerController.getActivePlayer().name}'s turn`);
        // }
    }

    return {
        playRound,
    }

})();

// to play, gameController.playRound(row, column)

// gameController.playRound(0, 0)
// gameController.playRound(0, 1)
// gameController.playRound(0, 2)
// gameController.playRound(1, 1)
// gameController.playRound(1, 0)
// gameController.playRound(1, 2)
// gameController.playRound(2, 2)
// gameController.playRound(2, 0)
// gameController.playRound(2, 1)