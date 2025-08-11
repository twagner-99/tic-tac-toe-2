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

    const winChecker = () => {  // I defined this here b/c that's where the rows and columns are defined. If I put it under gameController, I would need to re-access the rows and columns variables or read the board again to get that info. Felt cleaner to do it this way.
        // DOWN - NOT SURE HOW I COULD IMPLEMENT THIS USING A FOREACH OR FOR ...OF LOOP
            // [0][0] & [1][0] & [2][0]
            // [0][1] & [1][1] & [2][1]
            // [0][2] & [1][2] & [2][2]
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            let markerCount = 0;              // Can repeat these variable names b/c of block scope, but not sure if it's good practice. 
            let currentMarker = board[0][j];  // May be better to delineate (like markerCountDown) for debugging purposes...
            for (let i = 0; i < (rowsAndColumnsCount - 1); i++) {  // End condition doesn't really matter b/c it'll either break or end/return true
                if (!!currentMarker && currentMarker === board[i + 1][j]) {     // If current spot is NOT an empty string (aka an 'X' or 'O'), do stuff.
                    currentMarker = board[i + 1][j];                            // If it's an empty string, it'll evaluate to falsy. If it's an 'X' or 'O'
                    markerCount++;                                              // it will evaluate to truthy.

                    if (markerCount === (rowsAndColumnsCount - 1)) {
                        return 'win';
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // ACROSS - COULD EASILY BE DONE WITH FOREACH OR FOR ...OF LOOP
            // [0][0] & [0][1] & [0][2]
            // [1][0] & [1][1] & [1][2]
            // [2][0] & [2][1] & [2][2]
        for (let i = 0; i < rowsAndColumnsCount; i++) {
            let markerCount = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCount++;

                    if (markerCount === (rowsAndColumnsCount - 1)) {
                        return 'win';
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // DIAGONAL-1 - NOT SURE HOW I COULD IMPLEMENT THIS USING A FOREACH OR FOR ...OF LOOP
            // [0][0] & [1][1] & [2][2]
        let markerCountDiag1 = 0;
        for (let i = 0, j = 0; i < (rowsAndColumnsCount - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;

                if (markerCountDiag1 === (rowsAndColumnsCount - 1)) {
                    return 'win';
                }
            }
            
            else {
                break;
            }
        }

        // DIAGONAL-2 - NOT SURE HOW I COULD IMPLEMENT THIS USING A FOREACH OR FOR ...OF LOOP
            // [2][0] & [1][1] & [0][2]
        let markerCountDiag2 = 0;
        for (let i = 2, j = 0; j < (rowsAndColumnsCount - 1); i--, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i - 1][j + 1]) {
                currentMarker = board[i - 1][j + 1];
                markerCountDiag2++;

                if (markerCountDiag2 === (rowsAndColumnsCount - 1)) {
                    return 'win';
                }
            }
            
            else {
                break;
            }
        }

        // // TIE - STANDARD FOR LOOP VERSION - ORIGINAL
        // let markerCountTie = 0;
        // for (let i = 0; i < rowsAndColumnsCount; i++) {
        //     let currentMarker = board[i][0];
        //     for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
        //         if (!!currentMarker) {                              // If current spot is NOT an empty string (aka an 'X' or 'O'), do stuff.
        //             currentMarker = board[i][j + 1];

        //             if (!currentMarker) {                           // If current spot is an empty string, break.
        //                 break;
        //             }

        //             else {
        //                 markerCountTie++;

        //                 if (markerCountTie === ((rowsAndColumnsCount * rowsAndColumnsCount) - rowsAndColumnsCount)) {  // Total grid size minus the first row since the first comparison of each row doesn't contribute towards the count.
        //                     return 'tie';
        //                 }
        //             }

        //         }
                
        //         else {
        //             break;
        //         }
        //     }
        // }

        // // TIE - STANDARD FOR LOOP VERSION - NEW. SIMPLIFIED BY UPDATING IF CONDITION IN SECOND FOR LOOP. LET ME REMOVE ANOTHER IF AND ELSE SET.    
        // let markerCountTie = 0;
        // for (let i = 0; i < rowsAndColumnsCount; i++) {
        //     let currentMarker = board[i][0];
        //     for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
        //         if (!!currentMarker && !!board[i][j + 1]) {      // If current spot is NOT an empty string AND next spot
        //             currentMarker = board[i][j + 1];             // is NOT an empty string (aka an 'X' or 'O'), do stuff.
        //             markerCountTie++;
        //             if (markerCountTie === ((rowsAndColumnsCount * rowsAndColumnsCount) - rowsAndColumnsCount)) {  
        //                 // Total grid size minus the first row since the first comparison of each row doesn't contribute towards the count.
        //                 return 'tie';
        //             }

        //         }
                
        //         else {
        //             break;
        //         }
        //     }
        // }


    
        // // TIE - FOREACH VERSION. NO BREAKS, NOT ALLOWED IN FOREACH.
        // let markerCountTie = 0;
        // board.forEach((row) => {
        //     row.forEach((column) => {
        //         if (!!column) { // If current spot is NOT an empty string (aka an 'X' or 'O'), do stuff.
        //             markerCountTie++;
        //         }
        //     })
        // })
        
        // if (markerCountTie === (rowsAndColumnsCount * rowsAndColumnsCount)) {
        //     return 'tie';
        // }

        // TIE - FOR ...OF LOOP VERSION.
        let markerCountTie = 0;
        for (let row of board) {
            for (let column of row) {
                if (!!column) {
                    markerCountTie++;

                    if (markerCountTie === (rowsAndColumnsCount * rowsAndColumnsCount)) {
                        return 'tie';
                    }
                }
                
                else {
                    break;
                }
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
        let winStatus = gameboardController.winChecker();

        if (winStatus === 'win') {
            console.log(`${playerController.getActivePlayer().name} wins!`);
        }
        
        else if (winStatus === 'tie') {
            console.log(`It's a tie!`);
            // Need to add something to play again, like a prompt or play again button that reloads everything
            // Should all these console.logs be in the win checker? Have win checker return
            // Make something called win messages?
            // console.log(gameboardController.winMessages())??
            // in winChecker, we could have variable called win message that gets updated depending on what happens
            // Variable updated and is returned within if statement if a condition is met
            // But, if it gets to end, message would be updated to it's players turn and returned
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

// gameController.playRound(0, 0)
// gameController.playRound(0, 1)
// gameController.playRound(0, 2)
// gameController.playRound(1, 1)
// gameController.playRound(1, 0)
// gameController.playRound(1, 2)
// gameController.playRound(2, 2)
// gameController.playRound(2, 0)
// gameController.playRound(2, 1)