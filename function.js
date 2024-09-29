function upLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

function getSelected_RadioValue(dang) {
    var radios = document.getElementsByName(`${dang}`);
    var selectedValue = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }
    return selectedValue;
}