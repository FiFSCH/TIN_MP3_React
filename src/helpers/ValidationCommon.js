function resetErrors(inputs, errorTexts) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let k = 0; k < errorTexts.length; k++) {
        errorTexts[k].innerText = "";
    }
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return value !== "";
}

function checkTxtLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const len = value.length;
    if (len > max) {
        return false;
    }
    if(len <min){
        return false;
    }
    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(value);
}

function checkPhone(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    let re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(value);
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    let tmp = new Date();
    let d = tmp.getDay();
    let m = tmp.getMonth() + 1;
    let y = tmp.getFullYear();
    let today = new Date(y, m, d);
    let dateInput = new Date(value.toString());
    return dateInput < today;
}

function checkDateTermination(from, to) {
    if (!from) {
        return false;
    }
    if (to === "") {
        return true;
    }
    let fromDate = new Date(from.toString());
    let toDate = new Date(to.toString());
    return toDate >= fromDate;
}
export {checkRequired,resetErrors,checkTxtLengthRange,checkDate,checkDateTermination,checkPhone,checkEmail}