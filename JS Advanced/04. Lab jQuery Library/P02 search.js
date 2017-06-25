function search() {
    let input = $('#searchText').val();
    let towns = $(`ul#towns li:contains(${input})`);
    towns.css('font-weight', 'bold');
    $('#result').text(`${towns.length} matches found`);
}