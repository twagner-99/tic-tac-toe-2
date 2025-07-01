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

    let activePlayer = player1;         // all this stuff should be in gamecontroller?
    // const setPlayer1 = () => {
    //     let activePlayer = player1;
    //     return activePlayer;
    // }
    
    const getActivePlayer = () => activePlayer;
    
    // each time a marker is placed, toggle active player
    const toggleActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
    }


    return {
        createPlayer,
        // setPlayer1,
        getActivePlayer,
        toggleActivePlayer,
    }

}


function gameController() {
    const gameboard = gameboardController();
    const players = playerController(); // could skip by changing playercontroller to function expression called players.


    const player1 = players.createPlayer('Taylor', 'X'); // Can create these in console later. Can be created within another function.
    const player2 = players.createPlayer('Alex', 'O');   // Then can get the names from user input when UI is added.
    console.log(player1);

    // will need function to createPlayer from userinput when we add UI
    // actually, can prob just add a console prompt. Like function playerInput

    const placeMarker = (index) => { // this seems liek it should be it's own thing outside of gamecontroller
        let board = gameboard.getBoard(); // Do I need to do this to utilize updateBoard? // board is already in gameController which I ran so I'm not sure
        let activePlayer = players.getActivePlayer();

        console.log(`${activePlayer.name}'s turn`);

        gameboard.updateBoard(index, activePlayer.marker);
        
        players.toggleActivePlayer;
        
        // get the board
        // set player1
        // get active player
        // tell active player it's their turn
        // update board. if player1, X. if player2, O.
        // toggle active player
    }

    return {
        placeMarker,
    }
}



// to play, gameController().placeMarker(index)
// or can initialize by doing gameController...
    // or, make it an IIFE then we can just do gameController.placeMarker(index);









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