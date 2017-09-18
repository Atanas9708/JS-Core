function unique(input) {

    let unique = new Set();

    for (let row of input){

       let words = row.toLowerCase().split(/\W+/).filter(w => w != "");
       for (let word of words){
           unique.add(word);
       }
    }

    console.log(Array.from(unique.keys()).join(', '));
}
unique()