function solve() {

    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new TypeError('Cannot instantiate Employee');
            }
            this.name = name;
            this.age = Number(age);
            this.salary = 0;
            this.tasks = [];
        };

        work() {
            let currentTask = this.tasks.shift();
            console.log(this.name + currentTask);
            this.tasks.push(currentTask);
        };

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(' is working on a simple task.');
        };
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks.push(' is working on a complicated task.');
            this.tasks.push(' is taking time off work.');
            this.tasks.push(' is supervising junior workers.');
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks.push(' scheduled a meeting.');
            this.tasks.push(' is preparing a quarterly report.');
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    };
}

let person = solve();

let pesho = new person.Junior('Pesho', 21, 1500);
console.log(pesho);

let gosho = new person.Senior('Gosho', 23, 2500);
console.log(gosho);

let vankata = new person.Manager('Ivan', 25, 5000);
console.log(vankata);
