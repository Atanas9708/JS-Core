function attachEvents() {
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_B1lpRbRI-';
    const username = 'nasko';
    const password = 'nasko';
    const btoaAcc = btoa(username + ':' + password);
    const headerAuthentication = {
        'Authorization': 'Basic ' + btoaAcc,
        'Content-type': 'application/json'
    };

    $('.load').on('click', loadCatches);
    $('.add').on('click', createCatch);

    function request(method, endpoint, data) {
        return $.ajax({
            method: method,
            url: baseUrl + endpoint,
            headers: headerAuthentication,
            data: JSON.stringify(data)
        });
    }

    function loadCatches() {
        request('GET', '/biggestCatches')
            .then(displayCatches)
            .catch(displayError)
    }

    function displayCatches(data) {
        let catches = $('#catches');
        catches.empty();
        for (let key of data) {

            catches.append($(`<div class="catch" data-id="${key._id}">`)
                .append($('<label>Angler</label>'))
                .append($(`<input type="text" class="angler" value="${key.angler}">`))
                .append($('<label>Weight</label>'))
                .append($(`<input type="number" class="weight" value="${key.weight}">`))
                .append($('<label>Species</label>'))
                .append($(`<input type="text" class="species" value="${key.species}">`))
                .append($('<label>Location</label>'))
                .append($(`<input type="text" class="location" value="${key.location}">`))
                .append($('<label>Bait</label>'))
                .append($(`<input type="text" class="bait" value="${key.bait}">`))
                .append($('<label>Capture Time</label>'))
                .append($(`<input type="number" class="captureTime" value="${key.captureTime}">`))
                .append($('<button class="update">Update</button>').click(updateCatches))
                .append($('<button class="delete">Delete</button>').click(deleteCatch))
            )
        }
    }

    function createCatch() {
        let element = $('#addForm');
        let created = createObj(element);

        request('POST', '/biggestCatches', created)
            .then(loadCatches)
            .catch(displayError)
    }

    function updateCatches() {
        let elem = $(this).parent();
        let updated = createObj(elem);

        request('PUT', `/biggestCatches/${elem.attr('data-id')}`, updated)
            .then(loadCatches)
            .catch(displayError);
    }

    function createObj(elem) {
        return {
            angler: elem.find('.angler').val(),
            weight: +elem.find('.weight').val(),
            species: elem.find('.species').val(),
            location: elem.find('.location').val(),
            bait: elem.find('.bait').val(),
            captureTime: +elem.find('.captureTime').val()
        };
    }

    function deleteCatch() {
        let id = $(this).parent().attr('data-id');
        request('DELETE', `/biggestCatches/${id}`)
            .then(loadCatches)
            .catch(displayError)
    }

    function displayError(err) {
        alert(`ERROR: ${err.statusText}`);
    }
}