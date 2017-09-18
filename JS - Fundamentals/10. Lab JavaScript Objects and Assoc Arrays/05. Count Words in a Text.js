function countWords([text]) {

    let input = text.split(/\W+/).filter(w => w!= '');
    let obj = {};

    for (let word of input ){

       if (!obj.hasOwnProperty(word)){
           obj[word] = 1;
       } else {
           obj[word]++;
       }
    }

    console.log(JSON.stringify(obj));
}

countWords("JS devs use Node.js for server-side JS.-- JS for devs");