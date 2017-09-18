function table(input) {

    let html = '<table>\n';

    for (let row of input){

        let json = JSON.parse(row);

        html +='     <tr>\n';
        html +=`       <td>${htmlEscape(json.name)}</td>\n`;
        html +=`       <td>${htmlEscape(json.position)}</td>\n`;
        html +=`       <td>${json.salary}</td>\n`;
        html +='     <tr>\n';

    }

    html += '</table>';

    console.log(html);

    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

table(
'{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}'
);