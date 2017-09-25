function solve(input) {

    for (let line of input){
        let result = new Map();

        line = line.replace(/(\+|%20)+/g, ' ');

        let pattern = '([^&?]+?)=([^&?]+?)(?=&|$)';
        let regex = new RegExp(pattern, 'g');
        let match = regex.exec(line);

        while (match){
            let key = match[1].trim();
            let value = match[2].trim();

            if (!result.has(key)){
                result.set(key, []);
            }

            result.get(key).push(value);

            match = regex.exec(line);
        }

        let output = '';
        for (let [key, value] of result){
            output += `${key}=[${value.join(', ')}]`;
        }

        console.log(output);
    }
}

solve([
    'foo=%20foo&value=+val&foo+=5+%20+203',
    'foo=poo%20&value=valley&dog=wow+',
    'url=https://softuni.bg/trainings/coursesinstances/details/1070',
    'https://softuni.bg/trainings.asp?trainer=nakov&course=oop&course=php'
]);