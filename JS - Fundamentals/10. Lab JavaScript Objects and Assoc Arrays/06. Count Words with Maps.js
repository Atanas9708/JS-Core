function countWordsWithMaps([text]) {

    let input = text.toLowerCase().split(/\W+/).filter(w => w!= '');
    let map = new Map();

    for (let word of input){

        if(!map.has(word)){
            map.set(word, 1);
        } else {
            map.set(word, map.get(word) + 1);
        }
    }

    let sortedMap = Array.from(map.keys()).sort();

    for (let key of sortedMap){

        console.log("'" + key + "'" + " -> " + map.get(key) + " times");
    }
}

countWordsWithMaps(["Far too slow, you're far too slow."]);