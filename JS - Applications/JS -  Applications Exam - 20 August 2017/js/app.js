$(() => {

    const app = Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: () => $("#loadingBox").show(),
            ajaxStop: () => $('#loadingBox').fadeOut()
        });

        this.get('index.html', function (ctx) {

            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/welcome/welcomeForm.hbs');
            })
        });

        this.post('#/login', function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo('Login successful.');

                    ctx.redirect('#/catalog');
                }).catch(auth.handleError)
        });

        this.post('#/register', function (ctx) {

            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            let isValid = validateUserRegistration(username, password, repeatPass);

            if (isValid) {
                auth.register(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo('User registration successful!');

                        ctx.redirect('#/catalog');
                    }).then(auth.handleError);
            }

        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('Logout successful.');

                    ctx.redirect('index.html');
                })
        });

        this.get('#/catalog', function (ctx) {
            ctx.isAuthor = auth.isAuth();
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            postService.loadAllPosts()
                .then(function (posts) {
                    let rank = 1;
                    posts.forEach(p => {
                        p.isAuthor = p.author === sessionStorage.getItem('username');
                        p.rank = rank++;
                        p.time = calcTime(p._kmd.ect);
                    });

                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        post: './templates/home/post.hbs'
                    }).then(function () {
                        this.partial('./templates/home/catalog.hbs');
                    })
                });

        });

        this.get('#/submit', function (ctx) {
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                menu: './templates/common/menu.hbs',
                submit: './templates/submit/submit.hbs'
            }).then(function () {
                this.partial('./templates/submit/submitPage.hbs');
            })
        });

        this.post('#/submit', function (ctx) {
            ctx.isAuthor = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let title = ctx.params.title;
            let imageUrl = ctx.params.image;
            let description = ctx.params.description;

            postService.submitPost(author, title, url, imageUrl, description)
                .then(function () {
                    auth.showInfo('Post created!');

                    ctx.redirect('#/catalog');
                })

        });

        this.get('#/myPosts', function (ctx) {
            ctx.isAuthor = auth.isAuth();
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            let username = sessionStorage.getItem('username');

            postService.loadMyPosts(username)
                .then(function (posts) {
                    let rank = 1;
                    posts.forEach(p => {
                        p.isAuthor = p.author === sessionStorage.getItem('username');
                        p.rank = rank++;
                        p.time = calcTime(p._kmd.ect);
                    });

                    ctx.myPosts = posts;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        myPost: './templates/myPosts/myPost.hbs'
                    }).then(function () {
                        this.partial('./templates/myPosts/myPostsPage.hbs');
                    })
                })

        });

        this.get('#/details/:id', function (ctx) {
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            let postId = ctx.params.id.substr(1);

            let commentsPromise = commentService.loadComments(postId);
            let postInfoPromise = postService.loadPostById(postId);

            Promise.all([postInfoPromise, commentsPromise])
                .then(function ([postInfo, comments]) {
                    ctx.time = calcTime(postInfo._kmd.ect);
                    ctx.isAuthor = postInfo.author === sessionStorage.getItem('username');
                    ctx.author = postInfo.author;
                    ctx.title = postInfo.title;
                    ctx.url = postInfo.url;
                    ctx.imageUrl = postInfo.imageUrl;
                    ctx.description = postInfo.description;
                    comments.forEach(c => {
                        c.isAuthor = c.author === sessionStorage.getItem('username');
                        c.postId = postInfo._id;
                        c.time = calcTime(c._kmd.ect);
                    });

                    ctx.comments = comments;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        details: './templates/details/details.hbs',
                        postComment: './templates/details/postComment.hbs',
                        comment: './templates/details/comment.hbs'
                    }).then(function () {
                        this.partial('./templates/details/detailsPage.hbs');
                    })

                })
        });

        this.post('#/createComment', function (ctx) {
            let postId = location.hash.substr(location.hash.indexOf(':') + 1);
            let content = ctx.params.content;
            let author = sessionStorage.getItem('username');

            commentService.createComment(postId, content, author)
                .then(function () {
                    auth.showError('Comment created.');
                    ctx.redirect(`#/details/:${postId}`);
                })

        });

        this.get('#/deleteComment/:id', function (ctx) {
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            let commentId = ctx.params.id.substr(1);

            commentService.deleteComment(commentId)
                .then(function () {
                    auth.showInfo('Comment deleted.');
                    window.history.go(-1);
                }).catch(auth.handleError);
        });

        this.get('#/deletePost/:id', function (ctx) {
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            let postId = location.hash.substr(location.hash.indexOf(':') + 1);

            postService.deletePost(postId)
                .then(function () {
                    auth.showInfo('Post deleted.');
                    ctx.redirect('#/catalog');
                })
        });

        this.get('#/editPost/:id', function (ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.isLogged = sessionStorage.getItem('username') !== null;
            ctx.username = sessionStorage.getItem('username');

            let postId = location.hash.substr(location.hash.indexOf(':') + 1);

            postService.loadPostById(postId)
                .then(function (postInfo) {
                    ctx._id = postInfo._id;
                    ctx.url = postInfo.url;
                    ctx.title = postInfo.title;
                    ctx.imageUrl = postInfo.imageUrl;
                    ctx.description = postInfo.description;

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        menu: './templates/common/menu.hbs',
                        editPostForm: './templates/editPost/editPostForm.hbs'
                    }).then(function () {
                        this.partial('./templates/editPost/editPostPage.hbs');
                    })
                }).catch(auth.handleError);

        });

        this.post('#/editPost/:id', function (ctx) {
            let postId = ctx.params.id.substr(1);
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let image = ctx.params.image;
            let title = ctx.params.title;
            let description = ctx.params.description;

            let isValid = validateCreatePost(url, title);

            if (isValid) {
                postService.editPost(postId, author, description, url, image)
                    .then(function () {
                        auth.showError(`Post ${title} updated!`);
                        ctx.redirect('#/catalog');
                    }).catch(auth.handleError);
            }


        });


        function validateUserRegistration(username, password, repeatPass) {

            let usernameValidation = /^[a-zA-Z]{3,}/g;
            let passwordValidation = /^[a-zA-Z0-9]{6,}/g;

            if (!usernameValidation.test(username)) {
                auth.showError('Username should be at least 3 characters long and should contain only english alphabet letters!');
                return false;
            }

            if (!passwordValidation.test(password)) {
                auth.showError('Password should be at least 6 characters long and should contain only english alphabet letters and digits!');
                return false;
            }

            if (password !== repeatPass) {
                auth.showError('Passwords should match!');
                return false;
            }

            return true;

        }

        function validateCreatePost(url, title) {
            if (url === '') {
                auth.showError('Link url should not be empty!');
                return false;
            }

            if (title === '') {
                auth.showError('Title should not be empty!');
                return false;
            }

            if (!url.startsWith('http')) {
                auth.showError('Url should be a valid link!');
                return false;
            }

            return true;
        }

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);
            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }


    });


    app.run();

})