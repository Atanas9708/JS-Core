function solve() {


    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }

        toString() {
            let base = super.toString().slice(0, -1);
            return `${base}, subject: ${this.subject})`;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this.course = course;
        }

        toString() {
            let base = super.toString().slice(0, -1);
            return `${base}, course: ${this.course})`;
        }
    }
    return{
        Person,
        Teacher,
        Student
    }
}


let person = new Person('Pesho', 'pesho@gmail.com');
console.log(person.toString());

let teacher = new Teacher('Vankata', 'vankata@mail.bg', 'Chemistry');
console.log(teacher.toString());

let student = new Student('Sashkata', 'sasho@yahoo.com', 'JavaScript');
console.log(student.toString());