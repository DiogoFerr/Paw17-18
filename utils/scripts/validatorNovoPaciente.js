function Validatinator(evt) {
    var NUS = document.getElementById('NUS').value;
    var nome = document.getElementById('nome').value;
    var date = document.getElementById('date').value;
    var rua = document.getElementById('rua').value;
    var concelho = document.getElementById('concelho').value;
    var distrito = document.getElementById('distrito').value;
    var pais = document.getElementById('pais').value;

    var pattern_nus = new RegExp("[0-9]{9}");
    var pattern_nome = new RegExp();
    var pattern_date = new RegExp();
    var pattern_rua = new RegExp();
    var pattern_concelho = new RegExp();
    var pattern_distrito = new RegExp();
    var pattern_pais = new RegExp();
    var hasError = false;
  
    if(!pattern_nus.test(NUS)){
        alert("O NUS tem de ser constituido por 9 numeros!");
        hasError = true;
    }

    if(!pattern_nome.test(nome)){
        alert("O NUS tem de ser constituido por 9 numeros!");
        hasError = true;
    }













    if (hasError) {
        evt.preventDefault();
    }
}
function initEvents() {

    document.getElementById('Registar').addEventListener('click', Validatinator, false);

}

document.addEventListener('DOMContentLoaded', initEvents, false);