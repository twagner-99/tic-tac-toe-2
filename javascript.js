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

    return {
        createPlayer,
        // setPlayer1,
    }
    
})();


const gameController = (function() {
    // const players = playerController(); // could skip by changing playercontroller to function expression called players.
    
    // will need function to createPlayer from userinput when we add UI
    // actually, can prob just add a console prompt. Like function playerInput
    const player1 = playerController.createPlayer('Taylor', 'X'); // Can create these in console later. Can be created within another function.
    const player2 = playerController.createPlayer('Alex', 'O');   // Then can get the names from user input when UI is added.
    let activePlayer = player1;

    const getActivePlayer = () => activePlayer; // EXPLORE WHY CAN'T BE FUNCT DECLARATION. MAYBE NEED TO RETURN?
    
    const toggleActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    }
    
    const placeMarker = (index) => { // this seems liek it should be it's own thing outside of gamecontroller
        let board = gameboardController.getBoard();
        let activePlayer = getActivePlayer();

        console.log(`${activePlayer.name}'s turn`); // Is player1. Should be player2.

        gameboardController.updateBoard(index, activePlayer.marker);
        console.log(board);
        
        toggleActivePlayer();
        console.log(activePlayer);
        
        // get the board
        // set player1
        // get active player
        // tell active player it's their turn
        // update board. if player1, X. if player2, O.
        // toggle active player
    }

    return {
        placeMarker,
        getActivePlayer,    // not sure that we need to return this
        toggleActivePlayer, // not sure that we need to return this
    }
})();

// to play, gameController.placeMarker(index)








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