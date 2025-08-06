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
            let markerCount = 0;                    // Can repeat these variable names b/c of block scope, but not sure if it's good practice. 
            let currentMarker = board[0][j];        // May be better to delineate (like markerCountDown) for debugging purposes...
            for (let i = 0; i < rows; i++) {
                if (!!currentMarker && currentMarker === board[i][j]) { // If current spot is not an empty string, DO STUFF. I THINK this works this way b/c if statements converT to boolean.
                    currentMarker = board[i][j];                        // !!'' evaluates to false. So if we have an empty string and we have !!'' evaluating to false
                    markerCount++;                                      // then the if statment says, "yes it's true that !!'' is false" so it runs the code with &&

                    if (markerCount === rows) {
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
            for (let j = 0; j < columns; j++) {
                if (!!currentMarker && currentMarker === board[i][j]) { // change to j + 1 to avoid comparing against self? Would need to update markerCount formula.
                    currentMarker = board[i][j];                        // Not sure if one is preferred over the other... the j+1 version might be more clear
                    markerCount++;

                    if (markerCount === columns) {
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
        if (!gameboardController.getBoard()[row][column]) { // If value at index is empty string, do stuff
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
            playerController.toggleActivePlayer();  // need to change so it doesn't toggle if player goes in occupied space
            console.log(`${playerController.getActivePlayer().name}'s turn`);
        }
    }

    return {
        playRound,
    }

})();

// to play, gameController.playRound(row, column)