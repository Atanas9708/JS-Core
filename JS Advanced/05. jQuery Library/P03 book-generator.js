function createBook(selector, title, author, isbn) {
   let bookGenerator = (function () {
        let id = 1;
        return function (selector, title, author, isbn) {
            let container = $(selector);
            let divElement = $('<div>');
            divElement.attr('id', `book${id}`);
            divElement.css('border', 'none');
            $(`<p class="title">${title}</p>`)
                .appendTo(divElement);
            $(`<p class="author">${author}</p>`)
                .appendTo(divElement);
            $(`<p class="isbn">${isbn}</p>`)
                .appendTo(divElement);

            let selectBtn = $('<button>Select</button>');
            let deselectBtn = $('<button>Deselect</button>');

            selectBtn.on('click', () => divElement.css('border', '2px solid blue'));
            deselectBtn.on('click', () => divElement.css('border', 'none'));

            selectBtn.appendTo(divElement);
            deselectBtn.appendTo(divElement);
            divElement.appendTo(container);
            id++;
         }
       }());

   bookGenerator(selector, title, author, isbn);

}