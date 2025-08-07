const gameboardController = (function() {
    let board = [];
    const rows = 3;
    const columns = 3;
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => board;

    const updateBoard = (row, column, marker) => {
        board[row][column] = marker;
    }

    const winChecker = () => {  // I defined this here b/c that's where the rows and columns are defined. If I put it under gameController, I would need to re-access the rows and columns variables or read the board again to get that info. Felt cleaner to do it this way.
        // DOWN
            // [0][0] & [1][0] & [2][0]
            // [0][1] & [1][1] & [2][1]
            // [0][2] & [1][2] & [2][2]
        for (let j = 0; j < columns; j++) {
            let markerCount = 0;              // Can repeat these variable names b/c of block scope, but not sure if it's good practice. 
            let currentMarker = board[0][j];  // May be better to delineate (like markerCountDown) for debugging purposes...
            for (let i = 0; i < (rows - 1); i++) {  // End condition doesn't really matter b/c it'll either break or end/return true
                if (!!currentMarker && currentMarker === board[i + 1][j]) {     // If current spot is NOT an empty string (aka an 'X' or 'O'), do stuff.
                    currentMarker = board[i + 1][j];                            // If it's an empty string, it'll evaluate to falsy. If it's an 'X' or 'O'
                    markerCount++;                                              // it will evaluate to truthy.

                    if (markerCount === (rows - 1)) {
                        return true;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // ACROSS
            // [0][0] & [0][1] & [0][2]
            // [1][0] & [1][1] & [1][2]
            // [2][0] & [2][1] & [2][2]
        for (let i = 0; i < rows; i++) {
            let markerCount = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (columns - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCount++;

                    if (markerCount === (columns - 1)) {
                        return true;
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
        for (let i = 0, j = 0; i < (rows - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;

                if (markerCountDiag1 === (rows - 1)) {
                    return true;
                }
            }
            
            else {
                break;
            }
        }

        // DIAGONAL-2
            // [2][0] & [1][1] & [0][2]
        let markerCountDiag2 = 0;
        for (let i = 2, j = 0; j < (columns - 1); i--, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i - 1][j + 1]) {
                currentMarker = board[i - 1][j + 1];
                markerCountDiag2++;

                if (markerCountDiag2 === (rows - 1)) {
                    return true;
                }
            }
            
            else {
                break;
            }
        }
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
        gameboardController.winChecker();

        if (gameboardController.winChecker()) {
            console.log(`${playerController.getActivePlayer().name} wins!`);
        }
        
        else {
            playerController.toggleActivePlayer();
            console.log(`${playerController.getActivePlayer().name}'s turn`);
        }
    }

    return {
        playRound,
    }

})();

// to play, gameController.playRound(row, column)