const gameboardController = (function() {
    let board = [];
    const numOfSpaces = 9;
    
    for (let i = 0; i < numOfSpaces; i++) {
        board.push('');
    }

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        board[index] = marker;
    }

    return {
        getBoard, 
        updateBoard,
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
    const placeMarker = (index) => {
        gameboardController.updateBoard(index, playerController.getActivePlayer().marker);
        
        playerController.toggleActivePlayer();
        
        console.log(`${playerController.getActivePlayer().name}'s turn`); // Is player1. Should be player2.

        // get the board
        // set player1
        // get active player
        // tell active player it's their turn
        // update board. if player1, X. if player2, O.
        // toggle active player
    }

    const playRound = () => {

    }

    return {
        placeMarker,
    }
})();

// to play, gameController.placeMarker(index)

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
    // Could everything go into the gameplay function as an IIFE?