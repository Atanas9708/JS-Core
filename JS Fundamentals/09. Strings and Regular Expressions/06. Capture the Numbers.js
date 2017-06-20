function captureNumbers(arr) {

    let result = [];
    let pattern = /\d+/g;

    for (let row of arr){

        let match = pattern.exec(row);
        while(match){
            result.push(match[0]);
            match = pattern.exec(row);
        }
    }

    console.log(result.join(' '));
}

captureNumbers(['The300',
    'What is that?', 'I think it’s the 3rd movie.', 'Lets watch it at 22:45']);