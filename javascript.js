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

            console.log(gameboardController.getBoard());
        }

        else {
            console.log('Space already occupied, go again.');
            playerController.toggleActivePlayer();
        }
    }

    const playRound = (row, column) => {
        placeMarker(row, column);
        UIController.winAnnouncer();
        playerController.toggleActivePlayer();
    }

    return {
        playRound,
    }

})();


const UIController = (function() {
    const playerInfoDialog = document.querySelector('#playerInfoDialog'); // move this stuff into a query selector function?

    const playGameUI = () => {
        const playDialog = document.querySelector('#playDialog');
        playDialog.showModal();
        
        const playBtn = document.querySelector('#playBtn');

        playBtn.addEventListener('click', () => {
            playDialog.close();
            playerInfoDialog.showModal();
            playerInfoUI();
        });
    }
    
    const playerInfoUI = () => {
        let playerName1;
        let playerName2;
        
        const playerInfoSubmitBtn = document.querySelector('#playerInfoSubmitBtn');
        
        playerInfoSubmitBtn.addEventListener('click', () => {
            playerController.players.player1.playerName = document.querySelector('#playerName1').value;
            playerController.players.player2.playerName = document.querySelector('#playerName2').value;
            gameboardController.buildBoard();
            buildBoardUI();
            playerInfoDialog.close();
        })
        
        return {
            playerName1,
            playerName2,
        }
    }

    playGameUI();

    const winAnnouncer = () => {
        if (gameboardController.winChecker()) { // If winChecker returns true, i.e. finds a winner and returns a string, do stuff
            const winDialog = document.querySelector('#winDialog');
            const winnerPara = document.querySelector('#winnerPara'); // move this stuff into a query selector function?
            winnerPara.textContent = gameboardController.winChecker();
            winDialog.showModal();

            const playAgainBtn = document.querySelector('#playAgainBtn'); // move this stuff into a query selector function?
            playAgainBtn.addEventListener('click', () => {
                gameboardController.clearBoard();
                clearBoardUI();
                gameboardController.buildBoard();
                winDialog.close();
            })
        }
        
    }

    const buildBoardUI = () => {    // Only runs one time - when play button is clicked.
        const turnIndicator = document.createElement('p');
        turnIndicator.textContent = `${playerController.getActivePlayer().playerName}'s turn`;
        turnIndicatorContainer.appendChild(turnIndicator);

        const container = document.querySelector('#container');
        const gameboardSize = container.clientHeight;
        
        const gridSize = gameboardController.getBoard().length;
        container.style.setProperty('--cell-width', (gameboardSize / gridSize) + "px");
        

        gameboardController.getBoard().forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const boardSquare = document.createElement('div');

                boardSquare.dataset.row = rowIndex;
                boardSquare.dataset.column = columnIndex;

                boardSquare.addEventListener('click', (e) => { // consider making this a separate function
                    gameController.playRound(e.target.dataset.row, e.target.dataset.column);
                    boardSquare.textContent = gameboardController.getBoard()[e.target.dataset.row][e.target.dataset.column];
                    turnIndicator.textContent = `${playerController.getActivePlayer().playerName}'s turn`;
                })

                container.appendChild(boardSquare);
            })
        })
    }

    const clearBoardUI = () => {
        const boardSquares = document.querySelectorAll('#container div');

        for (const boardSquare of boardSquares) {
            boardSquare.textContent = '';
        }
    }

    return {
        winAnnouncer,
        playerInfoUI,
    }

})();

// CSS BRAINSTORM
    // Can I create the grid with CSS grid with a gap? and color in the gap? (make container background black, add a gap, make square divs background white?)
        // would make an easy make shift border if it's possible
        // otherwise, I'll have to know which squares are external v internal to give them appropriate borders

// FUTURE CLEANUPS
    // Update so that winChecker knows when it's a cat's game without users having to fill all cells with markers