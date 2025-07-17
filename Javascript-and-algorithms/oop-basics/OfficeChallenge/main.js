//write your code here to make the tests pass
class Document {
    constructor(name){
        this.EmployeeName = name;
    }
}

class Cleaner {
    constructor(name){
        this.name = name;
    }
    clean(){
        console.log("Clean");
    }
}

class Employee {
    constructor(name){
        this.name = name;
    }
    work(office){
        for(let i = 0; i < 10; i++){
            let temp = new Document(this.name);
            office.documents.push(temp);
        }
    }
}

class Office {
    constructor(){
        this.documents = [];
        this.managers = [];
        this.cleaners = [];
    }

    hireCleaner(name){
        let cleaner = new Cleaner(name);
        this.cleaners.push(cleaner);
    }
    hireManager(name){
        let manager = new Manager(name);
        this.managers.push(manager);
    }
    startWorkDay(){
        this.managers.forEach(manager => manager.askEmployeesToWork(this));
        this.cleaners.forEach(cleaner => cleaner.clean());
    }
}

class Manager {
    constructor(name){
        this.name = name;
        this.employees = [];

    }
    hireEmployee(name){
        let employee = new Employee(name);
        this.employees.push(employee);
    }

    askEmployeesToWork(office){
        this.employees.forEach(employee => employee.work(office));
    }
}





