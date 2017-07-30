function attachEvents() {
    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', viewPosts);

    const serviceIrl = 'https://baas.kinvey.com/appdata/kid_SyQ6ZIoIW/';
    const username = 'pesho';
    const password = 'p';
    const authHeaders = {'Authorization': 'Basic ' + btoa(username + ':' + password)};
    const postBody = $('#post-body');
    const commentBody = $('#post-comments');
    const selected = $('#posts');

    function loadPosts() {
        let getRequest = {
            url: serviceIrl + 'posts',
            method: 'GET',
            headers: authHeaders,
            success: displayPosts,
        };
        $.ajax(getRequest);

        function displayPosts(data) {
            selected.empty();
            for (let key of data) {
                selected.append($('<option>').text(key.title).val(key._id));
            }
        }
    }

    function viewPosts() {
        let postID = selected.find('option:selected').val();
        let getPostRequest = $.ajax({
            url: serviceIrl + 'posts/' + postID,
            method: 'GET',
            headers: authHeaders,
        });
        let getCommentRequest = $.ajax({
            url: serviceIrl + `comments/?query={"postID":"${postID}"}`,
            headers: authHeaders
        });
        Promise.all([getPostRequest, getCommentRequest])
            .then(displayPostsAndComments);

        function displayPostsAndComments([posts, comments]) {
            postBody.text(posts.body);
            $('#post-title').text(posts.title);
            commentBody.empty();

            for (let comment of comments) {
                let liElem = $('<li>').text(comment.text);
                commentBody.append(liElem);
                console.log(comment);
            }
        }
    }
}