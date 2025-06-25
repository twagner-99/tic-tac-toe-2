function Gameboard() {
    let gameboard = [];
    const numOfSpaces = 9;
    
    for (let i = 0; i < numOfSpaces; i++) {
        gameboard.push('');
    }

    return {gameboard}; // this is a candidate for an IIFE
}

function Players(name, marker) {
    return {
        name,
        marker,
    }
}

const player1 = Players('Taylor', 'X'); // Can create these in console later. Can be created within another function.
const player2 = Players('Alex', 'O');   // Then can get the names from user input when UI is added.

function gameController(index) {
    
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