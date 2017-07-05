(function solve(){
    String.prototype.ensureStart = function (str) {
        if (this.startsWith(str))
            return this.toString();
        return str + this.toString();
    };
    String.prototype.ensureEnd = function (str) {
        if (this.endsWith(str))
            return this.toString();
        return this.toString() + str;
    };

    String.prototype.isEmpty = function(){
        return this == '';
    };

    String.format = function(){
        let str = arguments[0];
        for (let i = 1; i < arguments.length; i++){
            let regexPattern = '\\{' + (i - 1) + '\\}';
            let regex = new RegExp(regexPattern, 'g');
            str = str.replace(regex, arguments[i]);
        }
        return str;
    };

    String.prototype.truncate = function(n) {
        let splitString = this.split(' ');
        if (this.length < 4)
            return ('.').repeat(n);
        else if (n >= this.length)
            return this.toString();
        else if (splitString.length == 1){
            let result = '';
            for (let i = 0; i < this.length - n - 3; i++)
                result += this[i];
            return result + '...'
        }
        let result = splitString[0];
        for (let i = 1; i < splitString.length; i++) {
            if (result.length + splitString[i].length + 4 > n)
                return result + '...';
            result += ` ${splitString[i]}`;
        }
    }
})();

let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
console.log(str);
str = str.ensureEnd('string');
str = str.ensureEnd('.nice');
console.log(str);
console.log(str.isEmpty());
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}', 'dog');
console.log(str);