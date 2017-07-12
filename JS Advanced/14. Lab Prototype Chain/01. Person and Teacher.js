function solve() {

    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this.subject = subject;
        }
    }

    return {
        Person,
        Teacher
    };
}

let person = new Person('Pesho', 'pesho@mail.bg');
console.log(person);
let teacher = new Teacher('Vankata', 'vankata@mail.bg', 'English');
console.log(teacher);