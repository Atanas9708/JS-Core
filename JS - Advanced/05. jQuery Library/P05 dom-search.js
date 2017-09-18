function domSearch(content, bool) {

    $(content).addClass('items-control');

    let addDiv = $('<div>')
        .addClass('add-controls')
        .append($('<label>')
            .text("Enter text:")
            .append($('<input>')))
        .append($('<a>')
            .addClass('button')
            .css('display', 'inline-block')
            .text('Add')
            .on('click', addItemToList));
    let searchDiv = $('<div>')
        .addClass('search-controls')
        .append($('<label>')
            .text('Search:')
            .append($('<input>'))
            .on('input', searchList));

    let resultsDiv = $('<div>')
        .addClass('result-controls')
        .append($('<ul>')
            .addClass('items-list'));

    $(content).append(addDiv)
        .append(searchDiv)
        .append(resultsDiv)

    function addItemToList(){
        let inputText = ($('.add-controls input').val());
        let li = $('<li>')
            .addClass('list-item')
            .append($('<a>')
                .addClass('button')
                .on('click', deleteItem)
                .text('X'))
            .append($('<strong>')
                .text(inputText));
        $('.items-list').append(li);
        $('.add-controls input').val('');
    }

    function deleteItem(){
        $(this).parent().remove()
    }

    function searchList(){
        let textToSearch = $('.search-controls input').val();
        let options = bool ? "g" : "gi";
        let regex = new RegExp(textToSearch, options);
        let allItems = $('ul li.list-item strong');
        for (let item of allItems){
            if (!$(item).text().match(regex))
                $(item).parent().css('display', 'none');
            else
                $(item).parent().css('display', '');
        }
    }
}