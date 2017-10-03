let messageSerivce = (() =>{

    function loadSendMessages() {
        return requester.get('user', '', 'kinvey');
    }
    
    function sendMessage(sender_username, sender_name, recipient_username, text) {

        let data = {
            sender_username,
            sender_name,
            recipient_username,
            text
        };

        return requester.post('appdata', 'messages', 'kinvey', data)
    }

    function loadMyMessages(username) {
        let endpoint = `messages?query={"recipient_username":"${username}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function loadSentMessages(username) {
        let endpoint = `messages?query={"sender_username":"${username}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }
    
    function deleteMessage(msgId) {

        return requester.remove('appdata', `messages/${msgId}`)
    }


    return {
        loadSendMessages,
        sendMessage,
        loadMyMessages,
        loadSentMessages,
        deleteMessage
    }
})()