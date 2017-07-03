function getModel() {
    let num1, num2, result;
    return {
        init: function (sel1, sel2, resultSel) {
            num1 = $(sel1);
            num2 = $(sel2);
            result = $(resultSel);
        },
        add: function () {
            result.val(Number(num1.val()) + Number(num2.val()))
        },
        subtract: function () {
            result.val(Number(num1.val()) - Number(num2.val()));
        }
    };
}