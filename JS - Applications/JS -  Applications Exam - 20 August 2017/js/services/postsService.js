let postService = (() => {
    function loadAllPosts() {
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';
        return requester.get('appdata', endpoint, 'kinvey');
    }
    
    function submitPost(author, description, imageUrl, title, url) {
        let data = {
            author,
            description,
            imageUrl,
            title,
            url
        };
        return requester.post('appdata', 'posts', 'kinvey', data)
    }
    
    function loadMyPosts(userId) {
        let endpoint = `posts?query={"author":"${userId}"}&sort={"_kmd.ect": -1}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function loadPostById(postId) {
        let endpoint = `posts/${postId}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function deletePost(postId) {
        return requester.remove('appdata', `posts/${postId}`, 'kinvey');
    }

    function editPost(_id, author, description, url, title, imageUrl) {
        let data = {
            author,
            description,
            url,
            title,
            imageUrl
        };

        return requester.update('appdata', `posts/${_id}`, 'kinvey', data);
    }

    return {
        loadAllPosts,
        submitPost,
        loadMyPosts,
        loadPostById,
        deletePost,
        editPost
    }
})()