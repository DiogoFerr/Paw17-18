function Validatinator(evt) {
    var num = document.getElementById('username').value;
    var pattern_num = new RegExp("[0-9]{6}");

    var hasError = false;

    if (!pattern_num.test(num)) {
        alert("O utilizador tem de ser constituido por 6 numeros!");
        hasError = true;
    }
    if (hasError) {
        evt.preventDefault();
    }
}

function initEvents() {

    document.getElementById('login').addEventListener('click', Validatinator, false);

}

document.addEventListener('DOMContentLoaded', initEvents, false);