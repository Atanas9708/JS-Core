function attachEvents() {
    $('#btnLoadTowns').click(fillTown);

    let townSource = $('#towns-template').html();
    let townTemplate = Handlebars.compile(townSource);
    let div = $('#root');
    
    function fillTown() {
        div.empty();
        let towns = $('#towns').val().split(/\s*,\s*/g);
        for (let town of towns){
            let li = townTemplate({ townName: town });
            div.append(li);
        }
    }
}