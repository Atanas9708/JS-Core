function attachEvents() {
    $('#refresh').on('click', attachRefresh);
    $('#submit').on('click', attachSubmit);

    function attachSubmit() {
        let message = {
            'author': $('#author').val(),
            'content': $('#content').val(),
            'timestamp': Date.now()
        };

        let requestMessage = {
            url: 'https://messenger-8a135.firebaseio.com/messenger/.json',
            method: 'POST',
            data: JSON.stringify(message),
            success: attachRefresh,
        };

        $.ajax(requestMessage);
    }

    function attachRefresh() {
        $.get('https://messenger-8a135.firebaseio.com/messenger/.json').then(displayMessages);
    }

    function displayMessages(messages) {
        let message = $('#messages');
        let str = '';
        for (let key in messages){
            str += `${messages[key]['author']}: ${messages[key]['content']}\n`;
        }
        message.text(str);

    }
}