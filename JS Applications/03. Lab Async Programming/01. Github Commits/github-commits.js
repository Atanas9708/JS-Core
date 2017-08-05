function loadCommits() {
    const username = $('#username').val();
    const repository = $('#repo').val();
    const serviceUrl = `https://api.github.com/repos/${username}/${repository}/commits`;
    const list = $('#commits').empty();
    let getRequest = {
        url: serviceUrl,
        method: 'GET',
        success: displayCommits,
        error: displayError
    };
    $.ajax(getRequest);

    function displayCommits(data) {
        for (let repo of data){
            list.append($(`<li>${repo.commit.author.name}: ${repo.commit.message}</li>`));
        }
    }

    function displayError() {
        list.append($('<li>Error: 404 (Not Found)</li>'));
    }
}