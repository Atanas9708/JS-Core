function attachEvents() {
    $('#btnLoad').on('click', loadBook);
    $('#btnCreate').on('click', createContact);

    function loadBook() {
        $('#phonebook').empty();
        let request = {
            url: 'https://phonebook-nakov.firebaseio.com/phonebook/.json',
            method: 'GET',
            success: displayBook
        };
        $.ajax(request)
    }

    function displayBook(book) {
        let phoneBook = $('#phonebook');
        for (let key in book) {
            phoneBook.append($('<li>').text(`${book[key].person}: ${book[key].phone}`)
                .append('<button>Delete</button>').on('click', function () {
                    deleteContact(key)
                })
            );
        }
    }

    function createContact() {
        let contactName = $('#person').val();
        let contactNumber = $('#phone').val();
        if (contactName !== '' && contactNumber !== ''){
            let contact = {
                person: contactName,
                phone: contactNumber
            };

            let contactObj = {
                url: 'https://phonebook-nakov.firebaseio.com/phonebook/.json',
                method: 'POST',
                data: JSON.stringify(contact),
            };

            $.ajax(contactObj).then(() => {
                $('#person').val('');
                $('#phone').val('');
                loadBook()
            })
        }
    }

    function deleteContact(key) {
        let deleteRequest = {
            url: `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`,
            method: 'DELETE',
        };
        $.ajax(deleteRequest).then(loadBook)
    }
}