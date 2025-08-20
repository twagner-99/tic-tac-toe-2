const gameboardController = (function() {
// Build board
    let board = [];
    const rowsAndColumnsCount = 3;

    for (let i = 0; i < rowsAndColumnsCount; i++) {
        board[i] = [];
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            board[i].push('');
        }
    }
    
// Create functions
    const getBoard = () => board;

    const updateBoard = (row, column, marker) => {
        board[row][column] = marker;
    }

    const resetBoardValues = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                board[rowIndex][columnIndex] = '';
            })
        })
    }

    
    return {
        getBoard,
        updateBoard,
        resetBoardValues,
    };      
})();

const winController = (function() {
    let player1WinCount = 0;
    let player2WinCount = 0;
    let tieCount = 0;

    const winCounter = () => {
        if (playerController.getActivePlayer() === playerController.players.player1) {
            player1WinCount++;
        }
    
        else if (playerController.getActivePlayer() === playerController.players.player2) {
            player2WinCount++;
        }
    
        else {
            tieCount++;
        }
    }
    
    const getWinCounts = () => {
        return {player1WinCount,
                player2WinCount,
                tieCount,
        };
    }
    
    const winChecker = () => {  
        const rowsAndColumnsRead = gameboardController.getBoard().length;
        const board = gameboardController.getBoard()
        // DOWN
        for (let j = 0; j < rowsAndColumnsRead; j++) {
            let markerCountDown = 0;
            let currentMarker = board[0][j];
            for (let i = 0; i < (rowsAndColumnsRead - 1); i++) {
                if (!!currentMarker && currentMarker === board[i + 1][j]) {
                    currentMarker = board[i + 1][j];
                    markerCountDown++;
    
                    if (markerCountDown === (rowsAndColumnsRead - 1)) {
                        winCounter()
                        return `${playerController.getActivePlayer().playerName} wins!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }
    
        // ACROSS
        for (let i = 0; i < rowsAndColumnsRead; i++) {
            let markerCountAcross = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (rowsAndColumnsRead - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCountAcross++;
    
                    if (markerCountAcross === (rowsAndColumnsRead - 1)) {
                        winCounter();
                        return `${playerController.getActivePlayer().playerName} wins!`;
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
        for (let i = 0, j = 0; i < (rowsAndColumnsRead - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;
    
                if (markerCountDiag1 === (rowsAndColumnsRead - 1)) {
                    winCounter();
                    return `${playerController.getActivePlayer().playerName} wins!`; // IDEA. VARIABLE CALLED WINNER THAT GETS UPDATED DEPENDING. THEN USE THAT VALUE IN UI SECTION TO DO DIFFERENT THINGS
                }                                                                      // THEN MAYBE WINCOUNTER AND UPDATING INNERTEXT WILL WORK
            }
            
            else {
                break;
            }
        }
    
        // DIAGONAL-2
            // [2][0] & [1][1] & [0][2]
        let markerCountDiag2 = 0;
        for (let i = 2, j = 0; j < (rowsAndColumnsRead - 1); i--, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i - 1][j + 1]) {
                currentMarker = board[i - 1][j + 1];
                markerCountDiag2++;
    
                if (markerCountDiag2 === (rowsAndColumnsRead - 1)) {
                    winCounter();
                    return `${playerController.getActivePlayer().playerName} wins!`;
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
    
                    if (markerCountTie === (rowsAndColumnsRead * rowsAndColumnsRead)) {
                        winCounter();
                        return `It's a tie!`;
                    }
                }
                
                else {
                    break;
                }
            }
        }
    
        return false;   // false only returned if no winner or tie is found
    
    }

    return {
        winChecker,
        winCounter,
        getWinCounts,
    }

})();

const playerController = (function() {    
    const players = {
        player1: {
            playerName: 'player1',
            marker: 'X'
        },
        player2: {
            playerName: 'player2',
            marker: 'O'
        }
    }

    let activePlayer = players.player1;

    const getActivePlayer = () => activePlayer;
    
    const toggleActivePlayer = () => {
        activePlayer = (activePlayer === players.player1) ? players.player2 : players.player1;
    }

    return {
        players,
        getActivePlayer,
        toggleActivePlayer,
    }
    
})();


const gameController = (function() {    
    const placeMarker = (row, column) => {
        if (!gameboardController.getBoard()[row][column]) { // If value is empty string, do stuff
            gameboardController.updateBoard(row, column, playerController.getActivePlayer().marker);
        }

        else {
            console.log('Space already occupied, go again.');   // need modal popup
            playerController.toggleActivePlayer();
        }
    }

    const playRound = (row, column) => {
        placeMarker(row, column);
        UIController.winAnnouncerUI();  // Investigate whether it's backwards or not to be passing a UI function to playRound
        playerController.toggleActivePlayer();
    }

    return {
        playRound,
    }

})();


const UIController = (function() {
// Get Existing HTML Elements
    const playerInfoDialog = document.querySelector('#playerInfoDialog');
    const playDialog = document.querySelector('#playDialog');
    const playBtn = document.querySelector('#playBtn');
    const playerInfoSubmitBtn = document.querySelector('#playerInfoSubmitBtn');
    const winDialog = document.querySelector('#winDialog');
    const winnerPara = document.querySelector('#winnerPara');
    const playAgainBtn = document.querySelector('#playAgainBtn');
    const gameboardContainer = document.querySelector('#gameboardContainer');
    const turnIndicatorContainer = document.querySelector('#turnIndicatorContainer');

// Create New HTML Elements
    const turnIndicator = document.createElement('p');
    turnIndicatorContainer.appendChild(turnIndicator);

    const scoreCard = document.createElement('p');
    turnIndicatorContainer.appendChild(scoreCard);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', () => {
        location.reload()
    });
    turnIndicatorContainer.appendChild(resetBtn);

    gameboardController.getBoard().forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const boardSquare = document.createElement('div');

            boardSquare.dataset.row = rowIndex;
            boardSquare.dataset.column = columnIndex;

            boardSquare.addEventListener('click', (e) => {
                gameController.playRound(e.target.dataset.row, e.target.dataset.column);
                boardSquare.textContent = gameboardController.getBoard()[e.target.dataset.row][e.target.dataset.column];
                updateTurnIndicator();
            })
            gameboardContainer.appendChild(boardSquare);
        })
    })
    
    
// Add additional event handlers
    playBtn.addEventListener('click', () => {
        playDialog.close();
        playerInfoDialog.showModal();
    });
    
    playerInfoSubmitBtn.addEventListener('click', () => {
        playerController.players.player1.playerName = document.querySelector('#playerName1').value;
        playerController.players.player2.playerName = document.querySelector('#playerName2').value;
        updateTurnIndicator();
        updateScoreCard();
        playerInfoDialog.close();
    })
    
    playAgainBtn.addEventListener('click', () => {
        gameboardController.resetBoardValues();
        clearBoardUI();
        winDialog.close();
    })
    
// Build board grid
    const gameboardSize = gameboardContainer.clientHeight;
    const gridSize = gameboardController.getBoard().length;
    gameboardContainer.style.setProperty('--cell-width', (gameboardSize / gridSize) + "px");


// Create additional functions
    const winAnnouncerUI = () => {
        if (winController.winChecker()) { // If winChecker returns true, i.e. finds a winner and returns a string, do stuff
            winnerPara.textContent = winController.winChecker();
            winDialog.showModal();
        }
    }

    const updateScoreCard = () => {
        scoreCard.innerText = `Player1: ${winController.getWinCounts().player1WinCount}
                                Player2: ${winController.getWinCounts().player2WinCount}
                                Ties: ${winController.getWinCounts().tieCount}`;
    }

    const updateTurnIndicator = () => {
        turnIndicator.textContent = `${playerController.getActivePlayer().playerName}'s turn`;
    }

    const clearBoardUI = () => {
        const boardSquares = document.querySelectorAll('#gameboardContainer div');

        for (const boardSquare of boardSquares) {
            boardSquare.textContent = '';
        }
    }

    playDialog.showModal();

    return {
        winAnnouncerUI,     // This feels kinda backwards (passing UI to playRound). Investigate.
    }

})();

// CSS BRAINSTORM
    // Can I create the grid with CSS grid with a gap? and color in the gap? (make container background black, add a gap, make square divs background white?)
        // would make an easy make shift border if it's possible
        // otherwise, I'll have to know which squares are external v internal to give them appropriate borders

// FUTURE CLEANUPS
    // Update so that winChecker knows when it's a cat's game without users having to fill all cells with markers

// CURRENT CLEANUPS
    // FIX SCORE COUNTER
    // MESSAGE FOR ALREADY OCCUPIED SPACE NEEDS TO BE A MODAL