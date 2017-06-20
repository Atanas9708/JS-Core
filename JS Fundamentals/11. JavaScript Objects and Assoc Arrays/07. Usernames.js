function usernames(input) {

    let usernames = new Set();

    for (let user of input){

        usernames.add(user);
    }

    Array.from(usernames.keys()).sort((a, b) => sortUsernames(a, b)).forEach(user => console.log(user));
    
    function sortUsernames(a, b) {

        if(a.length != b.length){
            return(a.length - b.length)
        } else {
            return a.localeCompare(b);
        }
    }
}

usernames([
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston'
])