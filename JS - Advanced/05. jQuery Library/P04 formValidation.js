function validate() {

    let username = $('#username');
    let password = $('#password');
    let confirmPw = $('#confirm-password');
    let email = $('#email');
    let companyCheckBox = $('#company');
    let companyNumber = $('#companyNumber');
    let companyInfo = $('#companyInfo');
    let submitBtn = $('#submit');
    let validation = $('#valid');
    let isValid = true;
    
    companyCheckBox.on('change', function () {
        if (companyCheckBox.is(':checked')){
            companyInfo.css('display', 'block');
        } else {
            companyInfo.css('display', 'none');
        }
    });

    submitBtn.on('click',function (ev) {
         ev.preventDefault();
         validateForm();
         validation.css('display', isValid ? 'block' : 'none');
         isValid = true;
    });
    
    function validateForm() {
        validateInput(username, /^[A-Za-z\d]{3,20}$/g);
        validateInput(email, /^.*?@.*?\..*$/g);
        if(confirmPw.val() === password.val()){
            validateInput(password, /^\w{5,15}$/g);
            validateInput(confirmPw, /^\w{5,15}$/g);
        } else {
            confirmPw.css('border', 'solid red');
            password.css('border', 'solid red');
            isValid = false;
        }
        if (companyCheckBox.is(':checked')){
            validateCompanyInfo();
        }
    }

    function validateInput(input, pattern) {

        if (pattern.test(input.val())){
            input.css('border','none');
        } else {
            input.css('border', 'solid red');
            isValid = false;
        }
    }
    
    function validateCompanyInfo() {
        let numValue = +companyNumber.val();
        if (numValue >= 1000 && numValue <= 9999){
            companyNumber.css('border', 'none');
        } else {
            companyNumber.css('border', 'solid red');
            isValid = false;
        }
    }
}
