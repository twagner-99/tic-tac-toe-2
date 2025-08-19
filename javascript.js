const gameboardController = (function() {
    let board = [];
    const rowsAndColumnsCount = 3;

    const buildBoard = () => {
        for (let i = 0; i < rowsAndColumnsCount; i++) {
            board[i] = [];
            for (let j = 0; j < rowsAndColumnsCount; j++) {
                board[i].push('');
            }
        }
    }
    
    const getBoard = () => board;

    const updateBoard = (row, column, marker) => {
        board[row][column] = marker;
    }

    const clearBoard = () => {
        board = [];
    }

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
        // DOWN
        for (let j = 0; j < rowsAndColumnsCount; j++) {
            let markerCountDown = 0;
            let currentMarker = board[0][j];
            for (let i = 0; i < (rowsAndColumnsCount - 1); i++) {
                if (!!currentMarker && currentMarker === board[i + 1][j]) {
                    currentMarker = board[i + 1][j];
                    markerCountDown++;

                    if (markerCountDown === (rowsAndColumnsCount - 1)) {
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
        for (let i = 0; i < rowsAndColumnsCount; i++) {
            let markerCountAcross = 0;
            let currentMarker = board[i][0];
            for (let j = 0; j < (rowsAndColumnsCount - 1); j++) {
                if (!!currentMarker && currentMarker === board[i][j + 1]) {
                    currentMarker = board[i][j + 1];
                    markerCountAcross++;

                    if (markerCountAcross === (rowsAndColumnsCount - 1)) {
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
        for (let i = 0, j = 0; i < (rowsAndColumnsCount - 1); i++, j++) {
            let currentMarker = board[i][j];
            if (!!currentMarker && currentMarker === board[i + 1][j + 1]) {
                currentMarker = board[i + 1][j + 1];
                markerCountDiag1++;

                if (markerCountDiag1 === (rowsAndColumnsCount - 1)) {
                    winCounter();
                    return `${playerController.getActivePlayer().playerName} wins!`;
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

                    if (markerCountTie === (rowsAndColumnsCount * rowsAndColumnsCount)) {
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
        buildBoard,
        getBoard,
        updateBoard,
        clearBoard,
        winChecker,
        winCounter,
        getWinCounts,
    };      
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
        UIController.winAnnouncerUI();
        playerController.toggleActivePlayer();
    }

    return {
        playRound,
    }

})();


const UIController = (function() {
    const getExistingElements = () => {
        const playerInfoDialog = document.querySelector('#playerInfoDialog'); // move this stuff into a query selector function?
        const playDialog = document.querySelector('#playDialog');
        const playBtn = document.querySelector('#playBtn');
        const playerInfoSubmitBtn = document.querySelector('#playerInfoSubmitBtn');
        const winDialog = document.querySelector('#winDialog');
        const winnerPara = document.querySelector('#winnerPara');
        const playAgainBtn = document.querySelector('#playAgainBtn');
        const gameboardContainer = document.querySelector('#gameboardContainer');
        const turnIndicatorContainer = document.querySelector('#turnIndicatorContainer');
    }

    getExistingElements(); // Doing this syntax instead of making it an IIFE so it's more readable. Easier to miss an IIFE.

    const playBtnUI = () => {       // Need to update modal background to white opaque so you can't see anything until play is clicked.
        playDialog.showModal();
        
        playBtn.addEventListener('click', () => {
            playDialog.close();
            playerInfoDialog.showModal();
        });
    }

    playBtnUI();    // Initialize so this is first thing user sees.
    
    const buildPlayerInfoUI = () => {        
        playerInfoSubmitBtn.addEventListener('click', () => {
            playerController.players.player1.playerName = document.querySelector('#playerName1').value;
            playerController.players.player2.playerName = document.querySelector('#playerName2').value;
            // gameboardController.buildBoard();
            // buildBoardUI();
            playerInfoDialog.close();
        })
    }

    const buildPlayAgainUI = () => {
        playAgainBtn.addEventListener('click', () => {
            gameboardController.clearBoard();
            clearBoardUI();
            gameboardController.buildBoard();
            winDialog.close();
        })
    }

    const winAnnouncerUI = () => {
        if (gameboardController.winChecker()) { // If winChecker returns true, i.e. finds a winner and returns a string, do stuff
            winnerPara.textContent = gameboardController.winChecker();
            winDialog.showModal();
        }
    }

    const buildScoreCardUI = () => {
        const scoreCard = document.createElement('p');
        scoreCard.innerText = `Player1: ${gameboardController.getWinCounts().player1WinCount}
                                 Player2: ${gameboardController.getWinCounts().player2WinCount}
                                 Ties: ${gameboardController.getWinCounts().tieCount}`;
        turnIndicatorContainer.appendChild(scoreCard);
    }

    const buildTurnIndicatorUI = () => {
        const turnIndicator = document.createElement('p');
        turnIndicator.id = 'turnIndicator';
        turnIndicator.textContent = `${playerController.getActivePlayer().playerName}'s turn`;
        turnIndicatorContainer.appendChild(turnIndicator);
    }

    const buildResetBtnUI = () => {
        const resetBtn = document.createElement('button')
        resetBtn.id = 'resetBtn';
        resetBtn.textContent = 'Reset';
        resetBtn.addEventListener('click', () => {
            location.reload()
        });
        turnIndicatorContainer.appendChild(resetBtn);
    }

    const buildBoardSquaresUI = () => {
        gameboardController.getBoard().forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const boardSquare = document.createElement('div');
    
                boardSquare.dataset.row = rowIndex;
                boardSquare.dataset.column = columnIndex;
    
                boardSquare.addEventListener('click', (e) => { // consider making this a separate function
                    gameController.playRound(e.target.dataset.row, e.target.dataset.column);
                    boardSquare.textContent = gameboardController.getBoard()[e.target.dataset.row][e.target.dataset.column];
                    const turnIndicator = document.querySelector('#turnIndicator');
                    turnIndicator.textContent = `${playerController.getActivePlayer().playerName}'s turn`;
                })
    
                gameboardContainer.appendChild(boardSquare);
            })
        })
    }

    const buildBoardGrid = () => {
        const gameboardSize = gameboardContainer.clientHeight;
        
        const gridSize = gameboardController.getBoard().length;
        gameboardContainer.style.setProperty('--cell-width', (gameboardSize / gridSize) + "px");
    }

    const clearBoardUI = () => {
        const boardSquares = document.querySelectorAll('#gameboardContainer div');

        for (const boardSquare of boardSquares) {
            boardSquare.textContent = '';
        }
    }

    const buildBoardUI = () => {
        buildTurnIndicatorUI();
        buildResetBtnUI();
        buildPlayAgainUI();
        buildPlayerInfoUI();
        buildScoreCardUI();
        buildBoardSquaresUI();
        buildBoardGrid();
    }

    gameboardController.buildBoard();
    buildBoardUI();

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