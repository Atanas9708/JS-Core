function generateSummary(selector) {
    $(selector).on('click',function () {
        let summaryText = $('#content strong').text();
        resultSummary(summaryText);
    });

    function resultSummary(summaryText) {
        let resultDiv = $('<div>').attr('id', 'summary');
        let title = $('<h2>').text('Summary');
        let text = $('<p>').text(summaryText);
        resultDiv.append(title);
        resultDiv.append(text);
        $('#content').parent().append(resultDiv);
    }
}