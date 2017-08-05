function attachEvents() {
    const baseUrl = 'https://judgetests.firebaseio.com';
    $('#submit').on('click', displayForecast);


    function request(endpoint) {
       return $.ajax({
           method: 'GET',
           url: baseUrl + endpoint
        })
    }

    function displayForecast() {
        request('/locations.json')
            .then(displayLocations)
            .catch(displayError)
    }
    
    function displayLocations(data) {
        let location = $('#location').val();
        let code = data.filter(el => el['name'] === location)
            .map(el => el['code'])[0];

        if (!code){
            displayError();
        }

        let todayForecast = request(`/forecast/today/${code}.json`);
        let upcomingForecast = request(`/forecast/upcoming/${code}.json`);
        Promise.all([todayForecast, upcomingForecast])
            .then(displayForecasts)
            .catch(displayError)
    }

    function displayForecasts([todayWeather, upcomingWeather]) {
        let symbols = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;'
        };

        let forecast = $('#forecast').css('display', 'block');
        displayCurrentWeather(todayWeather, symbols);
        displayUpcomingWeather(upcomingWeather, symbols);
    }

    function displayCurrentWeather(todayWeather, symbols) {
        let current = $('#current');
        current.empty();
        current.append($('<div class="label">Current conditions</div>'))
            .append($(`<span class="condition symbol">${symbols[todayWeather['forecast']['condition']]}</span>`))
            .append($('<span class="condition">')
                .append($(`<span class="forecast-data">${todayWeather['name']}</span>`))
                .append($(`<span class="forecast-data">${todayWeather['forecast']['low']}&#176;/${todayWeather['forecast']['high']}&#176;</span>`))
                .append($(`<span class="forecast-data">${todayWeather['forecast']['condition']}</span>`)))
    }

    function displayUpcomingWeather(upcomingWeather, symbols) {
        let upcoming = $('#upcoming');
        upcoming.empty();
        upcoming.append($('<div class="label">Three-day forecast</div>'));
        let data = upcomingWeather['forecast'];
        for (let info of data){
            upcoming.append($('<span class="upcoming">')
                    .append($(`<span class="symbol">${symbols[info['condition']]}</span>`))
                    .append($(`<span class="forecast-data">${info['low']}&#176;/${info['high']}&#176;</span>`))
                    .append($(`<span class="forecast-data">${info['condition']}</span>`)))
        }
    }
    
    function displayError() {
        $('#forecast')
            .css('display', 'block')
            .text('Error');
    }
}