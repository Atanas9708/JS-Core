function scores(json) {
    let html = '<table>\n';
    html +=  '<tr><th>name</th><th>score</th></tr>\n';
    let scores = JSON.parse(json);
    for (let score of scores){

        html += '  <tr>';
        html += `<td>${htmlEscaping(score.name)}</td>`;
        html += `<td>${score.score}</td>`;
        html += '</tr>\n';
    }

    html += '</table>';
    
    function htmlEscaping(text) {

        let map = {
            '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;'
        };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }


    console.log(html);
}

scores('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');