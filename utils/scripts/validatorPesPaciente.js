function Validatinator(evt) {
    var NUS = document.getElementById('NUS').value;
    var pattern_nus = new RegExp("[0-9]{9}");
    var hasError = false;

    if (!pattern_nus.test(NUS)) {
        alert("O NUS tem de ser constituido por 9 numeros!");
        hasError = true;
    }

    if (hasError) {
        evt.preventDefault();
    }
}
function initEvents() {

    document.getElementById('pesquisar').addEventListener('click', Validatinator, false);

}

document.addEventListener('DOMContentLoaded', initEvents, false);