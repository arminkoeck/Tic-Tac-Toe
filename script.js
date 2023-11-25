

const game = (function () {
    

    const createPlayer = function (playerName, playerSymbol) {
        const name = playerName;
        const symbol = playerSymbol;
    
        return { name, symbol };
    }
    

    const gameboard = (function () {
        let board = ["", "", "", "", "", "", "", "", ""];
        
        return { board }; 
    })();


    const displayController = (function () {
        
        function updateDisplay () {

        };

        function clickHandlerBoard () {

        };

        return { updateDisplay, clickHandlerBoard }
    })();
    
    
    const gameController = (function createGameLogic () {
        const PlayerX = createPlayer ("Player X", "X");
        const PlayerO = createPlayer ("Player O", "O");
        let round = 1;
        let currentSymbol = PlayerX.symbol;
        let gameOver = false;
    

        function checkTie () {
            if (!gameboard.board.includes("")) {alert("It's a Tie!")};
        };


        function checkWin () {
            const winConditions = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
                [1, 5, 9],
                [3, 5, 7]
            ];

            for (let i = 0; i < 8; i++) {
                let value1 = gameboard.board[winConditions[i][0]-1]
                let value2 = gameboard.board[winConditions[i][1]-1]
                let value3 = gameboard.board[winConditions[i][2]-1]
                if (value1 === PlayerX.symbol && value2 === PlayerX.symbol && value3 === PlayerX.symbol) {
                    alert("Player X has won!")
                    gameOver = true;
                    currentSymbol = PlayerX.symbol;
                } else if (value1 === PlayerO.symbol && value2 === PlayerO.symbol && value3 === PlayerO.symbol) {
                    alert("Player O has won!")
                    gameOver = true;
                    currentSymbol = PlayerX.symbol;
                };
            };

            if (gameOver === false) {
                checkTie();
            }
        };
    
            
        function playRound (field) {
            if (gameboard.board[field] === "" && gameOver === false && field <= 8 && field >= 0) {
                gameboard.board[field] = currentSymbol;
                checkWin();
                round++
                currentSymbol = round % 2 === 0 ? PlayerO.symbol : PlayerX.symbol;
            };
        };


        function reset () {
            gameboard.board = ["", "", "", "", "", "", "", "", ""]
            gameOver = false;
            round = 1;
            currentSymbol = PlayerX.symbol;
        }
       

        return { playRound, reset };
    })();
    return { gameController, gameboard }
})();




// const gameboard = (function createGameboard () {
//     let board = ["", "", "", "", "", "", "", "", ""];

//     const setField = function (field, currentSymbol) {
//         if (board[field] === "") {
//         board[field] = currentSymbol;
//         };
//     };

//     const checkField = function (field) {
//         return board[field] === "" ? true : false;
//     }

//     const reset = function () {
//         board = ["", "", "", "", "", "", "", "", ""];
//     }

//     return { setField, checkField, reset, board }; 
// })();


// const game = (function createGameLogic () {
//     const PlayerX = createPlayer ("Player X", "X");
//     const PlayerO = createPlayer ("Player O", "O");
//     let round = 1;
//     let currentSymbol = PlayerX.symbol;

    

//     function checkWin () {
//         return
//     };

//     function checkTie () {
//         if (!gameboard.board.includes("")) {alert("It's a Tie!")};
//     };

        
//     function playRound (field) {
//         if (gameboard.checkField(field)) {
//             gameboard.setField(field, currentSymbol)
//             checkWin(); // if statement ob field sich ändert aber wie überprüfen?
//             checkTie();
//             round++
//             round % 2 === 0 ? currentSymbol = PlayerO.symbol : PlayerX.symbol;
//         };
//     };
   
//     return { playRound };
// })();










