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

    const winChecker = () => {
        // DOWN
        for (let j = 0; j < columns; j++) {
            let markerCount = 0;                    // Can repeat these variable names b/c of block scope, but not sure if it's good practice. 
            let currentMarker = board[0][j];        // May be better to delineate (like markerCountDown) for debugging purposes...
            for (let i = 0; i < rows; i++) {
                if (!!currentMarker && currentMarker === board[i][j]) {               // If value at index is empty string, do stuff
                    currentMarker = board[i][j];
                    markerCount++;

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
        for (let i = 0; i < rows; i++) {
            let markerCount = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < columns; j++) {
                if (!!currentMarker && currentMarker === board[i][j]) {               // If value at index is empty string, do stuff
                    currentMarker = board[i][j];
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

        // DIAG
        // for (let i = 0; i < rows; i++) {
        //     for (let j = 0; j < columns; j++) {
        //         board[i + 1][j]
        //     }

        // forEach
        //     let i = 0
        // }
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
        }
    }

    const playRound = (row, column) => {
        placeMarker(row, column);
        gameboardController.winChecker();

        if (!gameboardController.winChecker()) {
            playerController.toggleActivePlayer();
            console.log(`${playerController.getActivePlayer().name}'s turn`);
        }

        else {
            console.log(`${playerController.getActivePlayer().name} wins!`);
        }
    }

    return {
        playRound,
    }

})();

// to play, gameController.placeMarker(row, column)
// gameController.playRound(row, column)

// create playRound function that places marker, creates player, toggles, etc?






// Things needed:
    // gameboard
    // players
    // something to control the game

// To-do
    // function to create players - DONE
    // function to create gameboard - DONE
    // function to play game
        // pass function an index and mark it.
            // Extend that function to alternate between X (player1) and O (player2)
                // Use : ? 
        // if there's something in that spot, don't overwrite and make player choose again
        // functionality to tell if there's a winner
            // Array layout and indices:
                // 0, 1, 2
                // 3, 4, 5
                // 6, 7, 8
            // I can hard code these win conditiions... or check my array methods maybe there's something better
    
    // // 1D ARRAY BRAINSTORM
    // let board = [0, 1, 2,
    //              3, 4, 5, 
    //              6, 7, 8]
    
    // // DOWN
    //     // 0, 1, 2 plus three = win
    // // ACROSS
    //     // 0, 3, 6 plus one = win
    // // DIAG
    //     // 0 plus four = win
    //     // 2 plus two = win

    // // 2D ARRAY BRAINSTORM
    //     let board = [[0, 1, 2], [0, 1, 2], [0, 1, 2]]

    //     let board = [
    //         [0, 1, 2],
    //         [0, 1, 2],
    //         [0, 1, 2]
    //     ]

    //     let test = board[0][0]
    //     board.forEach((item) => {
    //         board.forEach((item) => {
    //             if test === X or O
    //             let test === item
    //         })

    //         return winner
    //     })

    //     // DOWN
    //     for (let i = 0; i < ; i++)
    //         for (let j = 0; j < ; j++)
    //             board[j][i]

    //     // ACROSS
    //     for (let i = 0; i < ; i++)
    //         for (let j = 0; j < ; j++)
    //             board[i][j]

    //     // DIAG
    //     for (let i = 0; i < ; i++)
    //         for (let j = 0; j < ; j++)
    //             board[i + 1][j]

    //     forEach
    //         let i = 0


    // // DOWN, EVERY LAST IS SAME
    //     [0][0] & [1][0] & [2][0]
    //     [0][1] & [1][1] & [2][1]
    //     [0][2] & [1][2] & [2][2]

    // // ACROSS, EVERY FIRST IS SAME
    //     [0][0] & [0][1] & [0][2]
    //     [1][0] & [1][1] & [1][2]
    //     [2][0] & [2][1] & [2][2]

    // // DIAGONAL
    //     [0][0] & [1][1] & [2][2]
    //     [2][0] & [1][1] & [0][2]