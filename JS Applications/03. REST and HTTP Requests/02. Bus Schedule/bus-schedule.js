let result = (function solve() {
    let currentId = 'depot';
    let oldName = '';
    function depart() {
        let departBtn = {
            url: `https://judgetests.firebaseio.com/schedule/${currentId}.json`,
            method: 'GET',
            success: busDepart,
            error: busError
        };
        $.ajax(departBtn);

    }

    function arrive() {
        $('#info').find('span').text(`Arriving at ${oldName}`);
        $('#depart').prop('disabled', false);
        $('#arrive').prop('disabled', true);
    }

    function busDepart(info) {
        $('#info').find('span').text(`Next stop ${info.name}`);
        currentId = info.next;
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', false);
        oldName = info.name;
    }

    function busError() {
        $('#info').find('span').text('Error');
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', true);
    }
    return {
        depart,
        arrive
    };
})();