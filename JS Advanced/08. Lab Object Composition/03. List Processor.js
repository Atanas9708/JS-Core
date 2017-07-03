function result(input) {

    let processor = (function () {
        let result = [];
        return obj = {
            add: function (word) {
                result.push(word);
            },
            remove: function (word) {
                result = result.filter(i => i != word);
            },
            print: function () {
                console.log(result.toString());
            }
        }
    })();

    for (let arg of input){
        let splitTokens = arg.split(' ');
        let command = splitTokens[0];
        let word = splitTokens[1];
        obj[command](word);
    }
}

result(['add hello', 'add again', 'remove hello', 'add again', 'print']);
