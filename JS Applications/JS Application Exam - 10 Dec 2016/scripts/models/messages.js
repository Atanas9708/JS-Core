let messages = (() => {
    function loadMyMessages(username) {
        let endpoint = `messages?query={"recipient_username":"${username}"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }
    
    function loadArchiveMessages(username) {
        let endpoint = `messages?query={"sender_username":"${username}"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }
    
    function deleteMessage(id) {
        let endpoint = `messages/${id}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function loadAllUsers() {
        return remote.get('user', '', 'kinvey');
    }
    
    function sendMessage(sender_username, sender_name, recipient_username, text) {
        let messageData = {
            sender_username,
            sender_name,
            recipient_username,
            text
        };

        return remote.post('appdata', 'messages', 'kinvey', messageData);
    }

    return{
        loadMyMessages,
        loadArchiveMessages,
        deleteMessage,
        loadAllUsers,
        sendMessage
    }
})()