/* Write your code below */
const Matrix = require('./Matrix');

class EmployeeMatrix extends Matrix{
    constructor() {
        super(0, 0);
    }
    loadData(salaryData){

        this.matrix = salaryData.map(obj => Object.values(obj));
        this.rows = this.matrix.length;
        this.columns = this.matrix[0] ? this.matrix[0].length : 0;
    }

    print() {
        for (let i = 0; i < this.rows; i++) {
            console.log(this.matrix[i].join('\t'));
        }
    }

    getEmployees(department){
        const employees = [];
        for(let i in this.matrix){
            if(this.matrix[i][2] === department) {employees.push(this.matrix[i][1])}
        }
        return employees;
    }
    getTotalSalary(department){
        let sum = 0;
            for(let i in this.matrix){
                if(this.matrix[i][2] === department) sum += this.matrix[i][3];
        }
        return sum;
        
    }
    findRichest(){
        let higherSalary = {name: "", salary: 0};
            for(let i in this.matrix){
                if(this.matrix[i][3] > higherSalary.salary){
                    higherSalary.name = this.matrix[i][1];
                    higherSalary.salary = this.matrix[i][3];
                }
        }
        return higherSalary.name;
    }
}

//You can paste the code from the lesson below to test your solution
let data = [
        { _id: "e10021", name: "Gillian", department: "Finance", salary: 2000 },
        { _id: "e10725", name: "Tibor", department: "Design", salary: 1200 },
        { _id: "e10041", name: "Anisha", department: "Finance", salary: 2300 },
        { _id: "e10411", name: "Jakub", department: "Design", salary: 1600 },
        { _id: "e11995", name: "Mar", department: "Design", salary: 1300 },
        { _id: "e10732", name: "Nisha", department: "Design", salary: 1200 }
]

let m = new EmployeeMatrix()
m.loadData(data)
m.print()
console.log(m.getEmployees("Finance")) //prints [ 'Gillian', 'Anisha' ]
console.log(m.getEmployees("Design")) //prints [ 'Tibor', 'Jakub', 'Mar', 'Nisha' ]

console.log(m.getTotalSalary("Finance")) //prints 4300
console.log(m.getTotalSalary("Design")) //prints 5300

console.log(m.findRichest()) //prints Anisha


/* Do not remove the exports below */
module.exports = EmployeeMatrix