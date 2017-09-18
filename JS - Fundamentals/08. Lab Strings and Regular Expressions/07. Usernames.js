function usernames(emails) {

    let users = emails.map(s => s.split('@'));
    let result = [];

    for (let user of users){

        let [name, domain] = user;
        let tokens = domain.split('.');
        tokens = tokens.map(e => e[0]);
        let username = name + '.' + tokens.join('');

        result.push(username);
    }

    return result.join(', ');
}

console.log(usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']));