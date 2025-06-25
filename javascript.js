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

const player1 = Players('Taylor', 'X'); // Can create these in console later or in code.
const player2 = Players('Alex', 'O');

// Things needed:
    // gameboard
    // players
    // something to control the game