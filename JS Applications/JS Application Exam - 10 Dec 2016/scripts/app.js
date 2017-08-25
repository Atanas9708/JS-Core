$(() => {

    showView('AppHome');

    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#formRegister').submit(userRegister);
        $('#formLogin').submit(userLogin);
        $('#formSendMessage').submit(sendMessage);
        $('#linkMenuLogout').click(userLogout);

        $('#linkUserHomeMyMessages').click(() => {
            showView('MyMessages');
            loadReceivedMessages();
        });
        $('#linkUserHomeArchiveSent').click(() => {
            showView('ArchiveSent');
            loadSentMessages();
        });
        $('#linkUserHomeSendMessage').click(() => {
            showView('SendMessage');
            loadAllUsers();
        });
        $('#linkMenuMyMessages').click(loadReceivedMessages);
        $('#linkMenuArchiveSent').click(loadSentMessages);
        $('#linkMenuSendMessage').click(loadAllUsers)
    })()

    if (sessionStorage.getItem('authtoken') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    });

    function saveUserInfoInSession(userInfo) {
        sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('name', userInfo.name);
        userLoggedIn();
    }

    function showView(viewName) {
        $('main > section').hide();
        $('#view' + viewName).show();
    }

    function navigateTo() {
        let viewName = $(this).attr('data-target');
        showView(viewName);
    }

    function userLoggedIn() {
        $('.anonymous').hide();
        $('.useronly').show();
        let username = sessionStorage.getItem('username');
        $('#spanMenuLoggedInUser').text(`Welcome, ${username}!`);
        $('#viewUserHomeHeading').text(`Welcome, ${username}!`);
        showView('UserHome');
    }

    function userLoggedOut() {
        $('.anonymous').show();
        $('.useronly').hide();
        $('#spanMenuLoggedInUser').text('');
        showView('AppHome');
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    function showError(errorMsg) {
        $('#errorBox').text('Error ' + errorMsg);
        $('#errorBox').show();
        setTimeout(() => $('#errorBox').fadeOut(), 3000);
    }

    function userRegister(event) {
        event.preventDefault();
        let registerUsername = $('#registerUsername');
        let registerName = $('#registerName');
        let registerPassword = $('#registerPasswd');

        let usernameVal = registerUsername.val();
        let nameVal = registerName.val();
        let passVal = registerPassword.val();

        auth.register(usernameVal, passVal, nameVal)
            .then((userInfo) => {
                saveUserInfoInSession(userInfo);
                registerUsername.val('');
                registerPassword.val('');
                registerName.val('');
                showInfo('Registration successful.');
            }).catch(handleAjaxError);
    }

    function userLogin(event) {
        event.preventDefault();

        let loginUsername = $('#loginUsername');
        let loginPassword = $('#loginPasswd');

        let usernameVal = loginUsername.val();
        let userPassword = loginPassword.val();

        auth.login(usernameVal, userPassword)
            .then((userInfo) => {
                saveUserInfoInSession(userInfo);
                loginUsername.val('');
                loginPassword.val('');
                showInfo('Login successful.');
            }).catch(handleAjaxError);
    }

    function userLogout() {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                showInfo('Logout successful.');
                userLoggedOut();
            }).catch(handleAjaxError);
    }

    function loadReceivedMessages() {
        let username = sessionStorage.getItem('username');
        messages.loadMyMessages(username)
            .then((myMessages) => {
                displayAllMessages(myMessages);
            }).catch(handleAjaxError);
    }

    function displayAllMessages(myMessages) {
        let messagesContainer = $('#myMessages');
        messagesContainer.empty();
        let messagesTable = $('<table>');
        messagesTable.append($('<thead>')
            .append($('<tr>')
                .append('<th>From</th>')
                .append('<th>Message</th>')
                .append('<th>Date Received</th>')));
        let tableBody = $('<tbody>');

        for(let msg of myMessages) {
            let tableRow = $('<tr>');
            let sender = formatSender(msg.sender_name, msg.sender_username);
            let msgText = msg.text;
            let msgDate = formatDate(msg._kmd.lmt);
            tableRow.append($('<td>').text(sender));
            tableRow.append($('<td>').text(msgText));
            tableRow.append($('<td>').text(msgDate));
            tableBody.append(tableRow);
        }

        messagesTable.append(tableBody);
        messagesContainer.append(messagesTable);
    }

    function loadSentMessages() {
        let username = sessionStorage.getItem('username');
        messages.loadArchiveMessages(username)
            .then((myMessages) => {
                displayArchivedMessages(myMessages);
            }).catch(handleAjaxError);
    }

    function displayArchivedMessages(myMessages) {
        let container = $('#sentMessages');
        container.empty();

        let messagesTable = $('<table>');
        messagesTable.append($('<thead>')
            .append($('<tr>')
                .append('<th>To</th>')
                .append('<th>Message</th>')
                .append('<th>Date Sent</th>')
                .append('<th>Actions</th>')));

        let tbody = $('<tbody>');
        for (let message of myMessages) {
            let tr = $('<tr>');
            let recipient = message.recipient_username;
            let text = message.text;
            let date = formatDate(message._kmd.lmt);
            let deleteBtn = $(`<button value="${message._id}">Delete</button>`)
                .click(deleteMessage);

            tr.append($('<td>').text(recipient));
            tr.append($('<td>').text(text));
            tr.append($('<td>').text(date));
            tr.append($('<td>').append(deleteBtn));
            tbody.append(tr);

        }

        messagesTable.append(tbody);
        container.append(messagesTable);
    }

    function deleteMessage() {
        let id = $(this).val();

        messages.deleteMessage(id)
            .then(() => {
                showInfo('Message deleted.');
                loadSentMessages();
            }).catch(handleAjaxError)
    }

    function loadAllUsers() {
        messages.loadAllUsers()
            .then((allUsers) => {
                displayUsersInList(allUsers);
            })
    }

    function displayUsersInList(allUsers) {
        let container = $('#msgRecipientUsername');
        container.empty();

        for (let user of allUsers) {
            let username = user.username;
            let fullName = formatSender(user.name, username);

            if (username !== sessionStorage.getItem('username')) {
                container.append($(`<option value="${username}">${fullName}</option>`));
            }

        }
    }

    function sendMessage(event) {
        event.preventDefault();

        let recipientUsernameInput = $('#msgRecipientUsername');
        let messageTextInput = $('#msgText');
        let senderName = sessionStorage.getItem('name');
        let senderUsername = sessionStorage.getItem('username');
        let recipientUsernameVal = recipientUsernameInput.val();
        let messageTextVal = messageTextInput.val();
        messages.sendMessage(senderUsername, senderName, recipientUsernameVal, messageTextVal)
            .then(() => {
                messageTextInput.val('');
                showInfo('Message sent.');
                showView('ArchiveSent');
                loadSentMessages();
            }).catch(handleAjaxError);
    }

    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            "." + date.getFullYear() + ' ' + date.getHours() + ':' +
            padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 4) {
            errorMsg = 'Cannot connect due to network error.';
        }
        if (response.responseJSON && response.responseJSON.description) {
            errorMsg = response.responseJSON.description;
        }
        showError(errorMsg);
    }
})

