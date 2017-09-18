let postService = (() => {
    function loadAllPosts() {
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';
        return requester.get('appdata', endpoint, 'kinvey');
    }
    
    function submitPost(author, title, url, imageUrl, description) {
        let data = {
            author,
            title,
            url,
            imageUrl,
            description
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

    function editPost(postId, author, description, url, imageUrl) {
        let data = {
            postId,
            author,
            description,
            url,
            imageUrl
        };

        return requester.update('appdata', `posts/${postId}`, 'kinvey', data);
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