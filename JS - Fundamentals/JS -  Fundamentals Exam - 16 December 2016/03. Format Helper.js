function formatHelper([input]) {

    input = input.replace(/(\.|,|!|\?|:|;)\s*([a-zA-Z0-9])/g, "$1 $2");
    input = input.replace(/(\.|,|!|\?|:|;)\s*(.)/g, "$1 $2");
    input = input.replace(/\s+(\.|,|!|\?|:|;)/g, "$1");
    input = input.replace(/\.\s+(\d)/g, ".$1");
    input = input.replace(/"\s*([^"]+?)\s*"/g, '"$1"');
    console.log(input);
}

formatHelper(
    'Terribly formatted text . With chaotic spacings." Terrible quoting "! Also this date is pretty confusing : 20 . 12. 16 .'
)