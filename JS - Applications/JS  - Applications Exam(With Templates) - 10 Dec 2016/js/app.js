$(() => {

    const app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: function () {
                $("#loadingBox").show();
            },
            ajaxStop: function () {
                $("#loadingBox").hide();
            }
        });

        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                home: './templates/home/homeForm.hbs'
            }).then(function () {
                this.partial('./templates/home/homePage.hbs');
            })
        };


        this.get('#/login', function (ctx) {

            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            })
        });

        this.post('#/login', function (ctx) {

            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Login successful.');

                    displayHome(ctx);
                })

        });

        this.get('#/register', function (ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            });
        });

        this.post('#/register', function (ctx) {

            let username = ctx.params.username;
            let password = ctx.params.password;
            let name = ctx.params.name;

            auth.register(username, password, name)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('User registration successful.');

                    displayHome(ctx);
                });
        });

        this.get('#/logout', function (ctx) {

            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout successful.');

                    displayHome(ctx);
                }).catch(auth.handleError);
        });

        this.get('#/sendMessages', function (ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            messageSerivce.loadSendMessages()
                .then(function (userList) {
                    userList = userList.filter(u => u.username !== sessionStorage.getItem('username'));
                    ctx.userList = userList;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        sendMessage: './templates/sendMessages/sendMessage.hbs'
                    }).then(function () {
                        this.partial('./templates/sendMessages/sendMessagesForm.hbs')
                    });
                });
        });

        this.post('#/sendMessages', function (ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            let senderName = sessionStorage.getItem('name');
            let senderUsername = sessionStorage.getItem('username');
            let recipientUsername = $('#msgRecipientUsername').val();
            let text = $('#msgText').val();

            messageSerivce.sendMessage(senderUsername, senderName, recipientUsername, text)
                .then(function () {
                    auth.showInfo('Message sent.');
                    ctx.redirect('#/sentMessages');
                }).catch(auth.handleError);
        });

        this.get('#/myMessages', function (ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            let username = sessionStorage.getItem('username');

            messageSerivce.loadMyMessages(username)
                .then(function (messages) {
                    for (let message of messages) {
                        message.timestamp = formatDate(message._kmd.lmt);
                        formatSender(message.name, message.username);
                    }
                    ctx.myMessages = messages;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        myMessage: './templates/myMessages/myMessage.hbs'
                    }).then(function () {
                        this.partial('./templates/myMessages/myMessagesForm.hbs');
                    });
                });

        });

        this.get('#/sentMessages', function (ctx) {
            ctx.isAnonymous = sessionStorage.getItem('username') === null;
            ctx.username = sessionStorage.getItem('username');

            let username = sessionStorage.getItem('username');

            messageSerivce.loadSentMessages(username)
                .then(function (messages) {
                    for (let message of messages) {
                        message.timestamp = formatDate(message._kmd.lmt);
                        formatSender(message.name, message.username);
                    }
                    ctx.sentMessages = messages;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        sentMessage: './templates/sentMessages/sentMessage.hbs'
                    }).then(function () {
                        this.partial('./templates/sentMessages/sentMessagesForm.hbs')
                            .then(function () {
                                let button = $('button');
                                button.click(function () {
                                    let msgId = $(this).attr('data-id');
                                    deleteMsg(msgId);
                                })
                            });

                    });
                });
            function deleteMsg(msgId) {
                messageSerivce.deleteMessage(msgId)
                    .then(function () {
                        location.reload();
                        setTimeout(() => auth.showInfo('Message deleted').fadeOut(), 3000);
                    });
            }
        });


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

    });

    app.run();
})