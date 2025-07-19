class Person {
    constructor(name, startYear) {
        this.name = name
        this.startYear = startYear
        this.courses = []
    }

    addCourse(course) {
        this.courses.push(course)
    }
}


class Student extends Person {
    constructor(name, startYear) {
        super(name, startYear)
        this.grades = []
    }

    receiveGrade(courseName, finalGrade) {
        this.grades.push({
            course: courseName,
            grade: finalGrade
        })
    }

    //method overriding!
    addCourse(course) {
        if ((this.courses).indexOf(course) == -1) {
            super.addCourse(course)
        }
    }
}

class Teacher extends Person {
    constructor(name, startYear, salary){
        super(name, startYear);
        this.salary = salary;
        this.courses = {}; //attribute override
    }

    giveGrade(student, courseName, grade){
        student.receiveGrade(courseName,grade);
    }
    
    //method overriding!
    addCourse(course) {
        this.courses[course] = (this.courses[course] || 0) + 1;
    }

}

class TeachingAssistant extends Teacher {
    constructor(name, startYear, salary) {
        super(name, startYear, salary)
    }
}


const ta1 = new TeachingAssistant("Brandon", 2014, 20000)
console.log(ta1.toString())
