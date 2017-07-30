function loadRepos() {
    $('#repos').empty();
    let user = $('#username').val();
    let request = {
        url: `https://api.github.com/users/${user}/repos`,
        method: "GET",
        success: display,
        error: () => $('#repos').append('<li>Error</li>')
    };
    $.ajax(request);

    function display(repos) {
        for (let repo of repos) {
            $('#repos')
                .append($('<li>')
                    .append($('<a>')
                        .attr('href', repo.html_url)
                        .text(repo.full_name)));
        }
    }
}