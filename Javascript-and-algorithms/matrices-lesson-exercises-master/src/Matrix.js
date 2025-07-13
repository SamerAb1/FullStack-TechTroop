/* Write your code below */
class Matrix{
 constructor(rows, columns) {
        this.matrix = [];
        this.rows = rows;
        this.columns = columns;
        this.generateMatrix(rows, columns);
    }

    generateMatrix(rows, columns) {
        let value = 1;
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                this.matrix[i][j] = value++;
            }
        }
    }

    print() {
        for (let i = 0; i < this.rows; i++) {
            console.log(this.matrix[i].join('\t'));
        }
    }

    get(row, column) {
        if (
            row >= 0 &&
            row < this.rows &&
            column >= 0 &&
            column < this.columns
        ) {
            return this.matrix[row][column];
        }
        return -1;
    }

    alter(row, column, value) {
        if (
            row >= 0 &&
            row < this.rows &&
            column >= 0 &&
            column < this.columns
        ) {
            this.matrix[row][column] = value;
            return true;
        }
        return false;
    }

    printRow(row) {
        if (row >= 0 && row < this.rows) {
            console.log(this.matrix[row].join(', '));
        }
    }

    printColumn(column) {
        if (
            column >= 0 &&
            column < this.columns
        ) {
            for (let i = 0; i < this.rows; i++) {
                console.log(this.matrix[i][column]);
            }
        }
    }
    findCoordinate(value){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if(this.matrix[i][j] === value){
                    return {x: j, y: i};
                }
            }
        }
    }
}



// //You can paste the code from the lesson below to test your solution
// let m = new Matrix(3, 4)
// m.print()
// //prints
// /*
// 1       2       3       4
// 5       6       7       8
// 9       10      11      12
// */
    
// m.alter(0, 0, m.get(1, 1))
// m.printColumn(0) //prints 6, 5, 9 (separate lines)
// m.printRow(0) //prints 6, 2, 3, 4 (separate lines)


// console.log(m.findCoordinate(12)) //prints {x: 3, y: 2}
// console.log(m.findCoordinate(7)) //prints {x: 2, y: 1}

/* Do not remove the exports below */
module.exports = Matrix