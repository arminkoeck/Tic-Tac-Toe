

"use strict";

const game = (function () {
    

    const createPlayer = function (playerName, playerSymbol) {
        const name = playerName;
        const symbol = playerSymbol;
        let count = 0;

        function getCount () {
            return count;
        }

        function setCount () {
            count++
        }
    
        return { name, symbol, getCount, setCount };
    }
    

    const gameboard = (function () {
        let board = ["", "", "", "", "", "", "", "", ""];
        
        return { board }; 
    })();


    const displayController = (function () {
        
        const fields = document.querySelectorAll(".field");
        const xCount = document.querySelector("#player-x-count");
        const oCount = document.querySelector("#player-o-count");
        const tieCount = document.querySelector("#tie-count");
        const restart = document.querySelector("#restart");
        const modal = document.querySelector("#modal");
        const modalRestart = document.querySelector("#modal-restart");
        const activePlayer = document.querySelector("#active-player");
        const winnerMessage = document.querySelector("#winner-message")
        

        function updateDisplay () {
            //update gameboard
            for (let i = 0; i < 9; i++) {
                fields[i].textContent = gameboard.board[i];
            };

            //update winner message
            activePlayer.textContent = gameController.getCurrentSymbol();
            if (gameController.getWinner() !== "Tie") {
                winnerMessage.textContent = "Player " + gameController.getWinner() + " has won!";
            } else if (gameController.getWinner() === "Tie") {
                winnerMessage.textContent = "It's a Tie!";
            }

            //update counts
            xCount.textContent = gameController.getCountX();
            oCount.textContent = gameController.getCountO();
            tieCount.textContent = gameController.getTies();
        };


        const clickHandlerBoard = (function () {
            
            fields.forEach((field) =>
                field.addEventListener("click", (e) => {
                    gameController.playRound(e.target.dataset.index);
                    updateDisplay();
                    if (gameController.getCurrentStatus() === true) {
                        modal.showModal();
                    };
                })
            );

            restart.addEventListener("click", () => {
                gameController.reset();
                updateDisplay();
            })

            modalRestart.addEventListener("click", () => {
                gameController.reset();
                updateDisplay();
                modal.close();
            })

        })();


        return { updateDisplay, fields }
    })();
    
    
    const gameController = (function createGameLogic () {
        const PlayerX = createPlayer ("Player X", "X");
        const PlayerO = createPlayer ("Player O", "O");
        let round = 1;
        let currentSymbol = PlayerX.symbol;
        let gameOver = false;
        let winner = "";
        let ties = 0;

        const getCurrentStatus = () => gameOver;
        const getCurrentSymbol = () => currentSymbol;
        const getWinner = () => winner;
        const setTies = () => ties++;
        const getTies = () => ties;
        const getCountX = () => PlayerX.getCount();
        const getCountO = () => PlayerO.getCount();
        

        function checkTie () {
            if (!gameboard.board.includes("")) {
                winner = "Tie"
                setTies();
                gameOver = true;
            };
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
                    gameOver = true;
                    PlayerX.setCount()
                    winner = currentSymbol;
                    currentSymbol = PlayerX.symbol;
                } else if (value1 === PlayerO.symbol && value2 === PlayerO.symbol && value3 === PlayerO.symbol) {
                    gameOver = true;
                    PlayerO.setCount()
                    winner = currentSymbol;
                    currentSymbol = PlayerX.symbol;
                };
            }

            if (gameOver === false) {
                checkTie();
            };   
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
            winner = "";
        }
       

        return { playRound, reset, getCurrentStatus, getCurrentSymbol, getWinner, getTies, getCountX, getCountO };
    })();
    return { gameController, gameboard, displayController }
})();










