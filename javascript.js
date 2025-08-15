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

    const winChecker = () => {  
        // I defined this here b/c that's where the rows and columns are defined. 
        // If I put it under gameController, I would need to re-access the rows
        // and columns variables or read the board again to get that info. Felt 
        // cleaner to do it this way. And kind of makes sense... winChecker is 
        // a gameboard reader so it makes sense under gameboardController

        // DOWN
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            let markerCountDown = 0;
            let currentMarker = board[0][j];
            for (let i = 0; i < (rowsAndColumnsCount - 1); i++) {
                if (!!currentMarker && currentMarker === board[i + 1][j]) {
                    currentMarker = board[i + 1][j];
                    markerCountDown++;

                    if (markerCountDown === (rowsAndColumnsCount - 1)) {
                        return `${playerController.getActivePlayer().name} wins!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        // ACROSS
        for (let i = 0; i < rowsAndColumnsCount; i++) {
            let markerCountAcross = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCountAcross++;

                    if (markerCountAcross === (rowsAndColumnsCount - 1)) {
                        return `${playerController.getActivePlayer().name} wins!`;
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
        for (let i = 0, j = 0; i < (rowsAndColumnsCount - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;

                if (markerCountDiag1 === (rowsAndColumnsCount - 1)) {
                    return `${playerController.getActivePlayer().name} wins!`;
                }
            }
            
            else {
                break;
            }
        }

        // DIAGONAL-2
            // [2][0] & [1][1] & [0][2]
        let markerCountDiag2 = 0;
        for (let i = 2, j = 0; j < (rowsAndColumnsCount - 1); i--, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i - 1][j + 1]) {
                currentMarker = board[i - 1][j + 1];
                markerCountDiag2++;

                if (markerCountDiag2 === (rowsAndColumnsCount - 1)) {
                    return `${playerController.getActivePlayer().name} wins!`;
                }
            }
            
            else {
                break;
            }
        }

        // TIE
        let markerCountTie = 0;
        for (let row of board) {
            for (let column of row) {
                if (!!column) {
                    markerCountTie++;

                    if (markerCountTie === (rowsAndColumnsCount * rowsAndColumnsCount)) {
                        return `It's a tie!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }

        playerController.toggleActivePlayer();
        return `${playerController.getActivePlayer().name}'s turn`;
        // Returns message of who won. If nobody wins, it toggles player and says who's turn it is.
        // This works because it will only ever reach the toggle and "players turn" return
        // if no winner or tie is found because of all the return statements.
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

    console.log(`${activePlayer.name}'s turn`); // Initialization message.

    const getActivePlayer = () => activePlayer;
    
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
        console.log(gameboardController.winChecker());
    }

    return {
        playRound,
    }

})();


const userInterfaceController = (function() {
    const buildBoard = () => {
        const container = document.querySelector('#container');
        const gameboardSize = container.clientHeight;
        
        const gridSize = gameboardController.getBoard().length;
        container.style.setProperty('--cell-width', (gameboardSize / gridSize) + "px");
        

        gameboardController.getBoard().forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const boardSquare = document.createElement('div');

                boardSquare.dataset.row = rowIndex;
                boardSquare.dataset.column = columnIndex;

                boardSquare.addEventListener('click', () => {
                    gameController.playRound
                })

                boardSquare.textContent = 'X';  // UPDATE LATER IF YOU WANT TO REFLECT ACTUAL VALUE

                container.appendChild(boardSquare);
            })
        })
    }

    const clickHandler = () => {
        const boardSquares = document.querySelectorAll('#container > div')
        boardSquares.forEach((square) => {
            square
            square.addEventListener('click', () => {
                gameController.playRound
            })
        })
    }



    return {
        buildBoard,
    }

})();

// NEED TO ADD A WAY TO PLAY AGAIN.

// to play, gameController.playRound(row, column)

// UI PORTION
    // I want to populate the board with JS, that way if they want a bigger board it can be done
    // The play again? button should use modals
    // Starting screen (ONLY INITIAL PLAY, NOT AFTER PLAY AGAIN BUTTON)
        // Will have a start, or play button. Once clicked, players can enter names and then board populates
    // player entry inputs should be modals.
    // Winner and tie announcements should be pop-ups

    // Can I create the grid with CSS grid with a gap? and color in the gap? (make container background black, add a gap, make square divs background white?)
        // would make an easy make shift border if it's possible
        // otherwise, I'll have to know which squares are external v internal to give them appropriate borders

    // how pass params to event handler?
        // use regular arrow function with event and then run your other function in that?

        // or try writing the function with e like
            // function doSomething(e) ... then click, doSomething. maybe that'd work