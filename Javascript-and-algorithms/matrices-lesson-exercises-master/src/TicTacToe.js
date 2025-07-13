const Matrix = require('./Matrix');

class TicTacToe extends Matrix{
    constructor(){
        super(3,3);
    }

    loadBoard(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                this.alter(i,j,".");
            }
        }
    }

    play(rowNum, columnNum, Player){
        Player === 1 ? (this.matrix[rowNum][columnNum] === "." ? this.alter(rowNum, columnNum, "x") : console.log("Pick another place")) : (this.matrix[rowNum][columnNum] === "." ? this.alter(rowNum, columnNum, "o") : console.log("Pick another place"))
        this.checkBoard();
    }

    checkBoard(){
      const allMatch = arr => {
        return arr[0] === arr[1] && arr[0] === arr[2];
      }
      for(let i = 0; i < 3; i++){
        if(allMatch(this.matrix[i])){
            if(this.matrix[i][0] === "x" ){
                console.log("Congratulations Player 1");
                return;
            } else if (this.matrix[i][0] === "o"){
                console.log("Congratulations Player 2");
                return;
            }
        }
        if(allMatch([this.matrix[0][i], this.matrix[1][i], this.matrix[2][i]])){
            if(this.matrix[0][i] === "x" ){
                console.log("Congratulations Player 1");
                return;
            } else if (this.matrix[0][i] === "o"){
                console.log("Congratulations Player 2");
                return;
            }
        }

      }  
        if(allMatch([this.matrix[0][0], this.matrix[1][1], this.matrix[2][2]])){
            if(this.matrix[0][0] === "x" ){
                console.log("Congratulations Player 1");
                return;
            } else if (this.matrix[0][0] === "o"){
                console.log("Congratulations Player 2");
                return;
            }
        }
        if(allMatch([this.matrix[0][2], this.matrix[1][1], this.matrix[2][0]])){
            if(this.matrix[0][2] === "x" ){
                console.log("Congratulations Player 1");
                return;
            } else if (this.matrix[0][2] === "o"){
                console.log("Congratulations Player 2");
                return;
            }
        }
      
      
    }
}

let board = new TicTacToe()
board.loadBoard()
// board.print()

    
// board.play(2, 2, 1)
// board.play(0, 0, 2)
// // board.print()
   

board.play(2, 2, 1)
board.play(0, 0, 2)
board.play(0, 2, 1)
board.play(1, 0, 2)
board.play(1, 2, 1) //prints Congratulations Player 1
    
board.print()
/* Do not remove the exports below */
module.exports = TicTacToe