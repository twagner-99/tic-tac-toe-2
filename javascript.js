function gameboardController() { // This is a candidate for an IIFE
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
}

function playerController() { // I don't think this can be an IIFE if I want to createPlayer twice
    const createPlayer = (name, marker) => {
        return {
            name,
            marker,
        }
    }

    let activePlayer = player1;
    
    // each time a marker is placed, toggle active player
    
    const toggleActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    return {
        createPlayer,
        toggleActivePlayer,
        getActivePlayer,
    }

}


function gameController() {
    let board = gameboardController();
    const players = playerController(); // could skip by changing playercontroller to function expression called players.
    
    const player1 = players.createPlayer('Taylor', 'X'); // Can create these in console later. Can be created within another function.
    const player2 = players.createPlayer('Alex', 'O');   // Then can get the names from user input when UI is added.



    function placeMarker() {
        
        // get the board
        // get active player
        // tell active player it's their turn
        // if player1, X. if player2, O.
        // update board
        // toggle active player
    }


    // function updateBoard(index) {
    //     get
    // }
}










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