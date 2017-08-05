function getInfo() {
    $('#stopName').empty();
    $('#buses').empty();
    let info = $('#stopId').val();
    let request = {
        url: `https://judgetests.firebaseio.com/businfo/${info}.json`,
        method: 'GET',
        success: generateInfo,
        error: () => $('#stopName').append($('<li>Error</li>'))
    };
    $.ajax(request);
    function generateInfo(input) {
        $('#stopName').text(input.name);
        let buses = input.buses;
        for (let bus in buses){
            let minutes = buses[bus];
            $('#buses').append($(`<li>Bus ${bus} arrives in ${minutes} minutes</li>`))
        }
    }
}