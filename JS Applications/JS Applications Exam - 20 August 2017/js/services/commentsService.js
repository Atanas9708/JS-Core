let commentService = (() => {

    function loadComments(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }
    
    function createComment(postId, content, author) {
        let data = {
            postId,
            content,
            author
        };

        return requester.post('appdata', 'comments', 'kinvey', data);
    }

    function deleteComment(commentId) {
        return requester.remove('appdata', `comments/${commentId}`, 'kinvey');
    }

    return {
        loadComments,
        createComment,
        deleteComment
    }
})()