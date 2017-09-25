function solve(input) {

    let subscribers = new Map();
    let subscribedTo = new Map();

    for (let line of input){
        if (line.length === 1){
            if (subscribers.has(line)){
                continue;
            }

            subscribers.set(line, []);
        } else {
            let [firstPerson, secondPerson] = line.split('-');

            if (!subscribers.has(firstPerson) || !subscribers.has(secondPerson)){
                continue;
            }

            if (subscribers.get(firstPerson).indexOf(firstPerson) !== - 1 || firstPerson === secondPerson){
                continue;
            }

            if (!subscribedTo.has(firstPerson)){
                subscribedTo.set(firstPerson, 0);
            }

            let currentSubs = subscribedTo.get(firstPerson);
            subscribers.get(secondPerson).push(firstPerson);
            subscribedTo.set(firstPerson, currentSubs + 1);
        }
    }

    let sortedSubscribers = Array.from(subscribers).sort(sortSubscribers)[0];
    console.log(sortedSubscribers[0]);
    for (let i = 0; i < sortedSubscribers[1].length; i++){
        console.log(`${i + 1}. ${sortedSubscribers[1][i]}`)
    }


    function sortSubscribers(a, b) {
        let sortCriteria = b[1].length - a[1].length;
        if (sortCriteria !== 0){
            return sortCriteria;
        } else {
            sortCriteria = subscribedTo.get(b[0]) - subscribedTo.get(a[0]);
            return sortCriteria;
        }
    }
}

solve([
    'A',
    'B',
    'C',
    'D',
    'A-B',
    'B-A',
    'C-A',
    'D-A'
]);

solve([
    'J',
    'G',
    'P',
    'R',
    'C',
    'J-G',
    'G-J',
    'P-R',
    'R-P',
    'C-J'
]);