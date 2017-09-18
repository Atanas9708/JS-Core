function startApp() {
    const kinveyBaseUrl = 'https://baas.kinvey.com/';
    const kinveyAppKey = 'kid_SJZmObMDZ';
    const kinveyAppSecret = '92bfd84400a44fb685fdb6a408c0b4d3';
    const kinveyAuthHeaders = {
        'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    };

    sessionStorage.clear();

    $('header').find('a').show();
    showHideMenuLinks();
    showView('viewHome');

    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListAds').click(listAds);
    $('#linkCreateAd').click(showCreateAdView);
    $('#linkLogout').click(logoutUser);

    $('#buttonLoginUser').click(loginUser);
    $('#buttonRegisterUser').click(registerUser);
    $('#buttonCreateAd').click(createAd);
    $('#buttonEditAd').click(editAd);

    $('#infoBox, #errorBox').click(function () {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show()
        },
        ajaxStop: function () {
            $('#loadingBox').hide()
        }
    });

    function showHideMenuLinks() {
        $('#linkHome').show();
        if (sessionStorage.getItem('authToken') === null) {
            $('#linkLogin').show();
            $('#linkRegister').show();
            $('#linkCreateAd').hide();
            $('#linkListAds').hide();
            $('#linkLogout').hide();
        } else {
            $('#linkLogin').hide();
            $('#linkRegister').hide();
            $('#linkCreateAd').show();
            $('#linkListAds').show();
            $('#linkLogout').show();
        }
    }

    function showView(viewName) {
        $('main > section').hide();
        switch (viewName) {
            case 'viewHome':
                $('#viewHome').show();
                break;
            case 'viewLogin':
                $('#viewLogin').show();
                break;
            case 'viewRegister':
                $('#viewRegister').show();
                break;
            case 'viewAds':
                $('#viewAds').show();
                break;
            case 'viewCreateAd':
                $('#viewCreateAd').show();
                break;
            case 'viewEditAd':
                $('#viewEditAd').show();
                break;
            case 'viewDetailsAd':
                $('#viewDetailsAd').show();
                break;
        }
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        showView('viewRegister');
        $('#formRegister').trigger('reset');
    }

    function showCreateAdView() {
        showView('viewCreateAd');
        $('#formCreateAd').trigger('reset');
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
        }
    }

    function loginUser() {
        const kinveyLoginUrl = kinveyBaseUrl + 'user/' + kinveyAppKey + '/login';
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };
        $.ajax({
            url: kinveyLoginUrl,
            method: 'POST',
            headers: kinveyAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('Login successful.');
        }
    }

    function registerUser() {
        const kinveyRegisterUrl = kinveyBaseUrl + 'user/' + kinveyAppKey + '/';
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };
        if (userData.username === '') {
            showError('Username cannot be empty!');
        }
        else if (userData.password === '') {
            showError('Password cannot be empty!');
        }
        else {
            $.ajax({
                url: kinveyRegisterUrl,
                method: 'POST',
                headers: kinveyAuthHeaders,
                data: userData,
                success: registerSuccess,
                error: handleAjaxError
            });

            function registerSuccess(userInfo) {
                saveAuthInSession(userInfo);
                showHideMenuLinks();
                listAds();
                showInfo('User registration successful.');
            }
        }
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text('');
        showView('viewHome');
        showHideMenuLinks();
        showInfo('Logout successful.');
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        $('#loggedInUser').text(`Welcome, ${username}!`);
    }

    function listAds() {
        $('#ads').empty();
        showView('viewAds');
        const kinveyAdsUrl = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/ads';
        $.ajax({
            url: kinveyAdsUrl,
            method: 'GET',
            headers: getKinveyUserAuthHeaders(),
            success: loadAdsSuccess,
            error: handleAjaxError
        });

        function loadAdsSuccess(ads) {
            showInfo('Ads loaded.');
            if (ads.length === 0) {
                $('#ads').text('There are no ads at the moment.');
            } else {
                let adTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>Title</th>',
                        '<th>Description</th>',
                        '<th>Publisher</th>',
                        '<th>Date of Publishing</th>',
                        '<th>Price</th>',
                        '<th>Actions</th>')
                    );
                for (let ad of ads) {
                    let links = [];
                    if (ad._acl.creator === sessionStorage['userId']) {
                        let deleteLink = $('<a href="#">[Delete]</a>')
                            .click(deleteAd.bind(this, ad));
                        let editLink = $('<a href="#">[Edit]</a>')
                            .click(loadAdForEdit.bind(this, ad));
                        links = [deleteLink, ' ', editLink];
                    }

                    let readMoreLink = $('<a href="#">[Read More]</a>').click(displayAdvert.bind(this, ad));

                    links.unshift(' ');
                    links.unshift(readMoreLink);

                    let usernameId = ad._acl.creator;
                    let kinveyGetPublisherUrl = kinveyBaseUrl + 'user/' + kinveyAppKey + '/' + usernameId;
                    $.ajax({
                        url: kinveyGetPublisherUrl,
                        method: 'GET',
                        headers: getKinveyUserAuthHeaders(),
                        success: loadPublisher,
                        error: handleAjaxError
                    });

                    function loadPublisher(user) {
                        adTable.append($('<tr>').append(
                            $('<td>').text(ad.title),
                            $('<td>').text(ad.description),
                            $('<td>').text(user.username),
                            $('<td>').text(ad.published),
                            $('<td>').text(ad.price),
                            $('<td>').append(links)
                        ));
                    }
                }
                $('#ads').append(adTable);
            }
        }
    }

    function createAd() {
        const kinveyAdUrl = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/ads';
        let adData = {
            title: $('#formCreateAd input[name=title]').val(),
            description: $('#formCreateAd textarea[name=description]').val(),
            published: $('#formCreateAd input[name=datePublished]').val(),
            price: Number(Number($('#formCreateAd input[name=price]').val()).toFixed(2)),
            image: $('#formCreateAd input[name=image]').val()
        };

        $.ajax({
            url: kinveyAdUrl,
            method: 'POST',
            headers: getKinveyUserAuthHeaders(),
            data: adData,
            success: createAdSuccess,
            error: handleAjaxError
        });

        function createAdSuccess(response) {
            listAds();
            showInfo('Ad created.');
        }
    }

    function deleteAd(ad) {
        const kinveyAdUrl = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/ads/' + ad._id;
        $.ajax({
            url: kinveyAdUrl,
            method: 'DELETE',
            headers: getKinveyUserAuthHeaders(),
            success: deleteAdSuccess,
            error: handleAjaxError
        });

        function deleteAdSuccess(response) {
            listAds();
            showInfo('Ad deleted.');
        }
    }

    function loadAdForEdit(ad) {
        const kinveyAdUrl = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/ads/' + ad._id;
        $.ajax({
            url: kinveyAdUrl,
            method: 'GET',
            headers: getKinveyUserAuthHeaders(),
            success: loadAdForEditSuccess,
            error: handleAjaxError
        });

        function loadAdForEditSuccess(ad) {
            $('#formEditAd input[name=id]').val(ad._id);
            $('#formEditAd input[name=title]').val(ad.title);
            $('#formEditAd textarea[name=description]').val(ad.description);
            $('#formEditAd input [name=datePublished]').val(ad.published);
            $('#formEditAd input [name=price]').val(ad.price);
            $('#formEditAd input[name=image]').val(ad.image);
            showView('viewEditAd');
        }
    }

    function editAd() {
        let adId = $('#formEditAd input[name=id]').val();
        const kinveyAdUrl = kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/ads/' + adId;
        let adData = {
            title: $('#formEditAd input[name=title]').val(),
            description: $('#formEditAd textarea[name=description]').val(),
            published: $('#formEditAd input[name=datePublished]').val(),
            price: Number(Number($('#formEditAd input[name=price]').val()).toFixed(2)),
            image: $('#formEditAd input[name=image]').val()
        };
        $.ajax({
            url: kinveyAdUrl,
            method: 'PUT',
            headers: getKinveyUserAuthHeaders(),
            data: adData,
            success: editAdSuccess,
            error: handleAjaxError
        });

        function editAdSuccess(response) {
            listAds();
            showInfo('Book edited.');
        }
    }

    function displayAdvert(ad) {
        let usernameId = ad._acl.creator;
        let kinveyGetPublisherUrl = kinveyBaseUrl + 'user/' + kinveyAppKey + '/' + usernameId;
        $.ajax({
            url: kinveyGetPublisherUrl,
            method: 'GET',
            headers: getKinveyUserAuthHeaders(),
            success: loadPublisher,
            error: handleAjaxError
        });

        function loadPublisher(user) {
            $('#viewDetailsAd').html($('<div>').append(
                $('<img>').attr('src', ad.image),
                $('<br>'),
                $('<label>').text('Title:'),
                $('<h1>').text(ad.title),
                $('<label>').text('Description:'),
                $('<p>').text(ad.description),
                $('<label>').text('Publisher:'),
                $('<div>').text(user.username),
                $('<label>').text('Date:'),
                $('<div>').text(ad.published)
            ));
        }
        showView('viewDetailsAd');
    }

    function showError(errorMsg) {
        $('#errorBox').text('Error ' + errorMsg);
        $('#errorBox').show();
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
}