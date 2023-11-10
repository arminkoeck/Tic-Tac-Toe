


const game = {
    
}



const gameboard = (function createGameboard () {
    let board = ["", "", "", "", "", "", "", "", ""];
    return {board};
})();



const Players = (function getPlayers () {

    function createPlayer (playerName, playerSymbol) {
        const name = playerName;
        const symbol = playerSymbol;

        function sayHello () {
            console.log("Hello");
        };
        function makeMove (value) {
            if (gameboard.board[value] === "") {
                gameboard.board[value] = this.symbol;
            }
        };

        return { name, symbol, sayHello, makeMove };
    }
    
    const Player1 = createPlayer ("Player1", "X");
    const Player2 = createPlayer ("Player2", "O");
    return { Player1, Player2 };
})();


