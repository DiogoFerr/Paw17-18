function Validatinator(evt) {
    if (!Date.prototype.toISODate) {
        Date.prototype.toISODate = function () {
            return this.getFullYear() + '-' +
                ('0' + (this.getMonth() + 1)).slice(-2) + '-' +
                ('0' + this.getDate()).slice(-2);
        }
    };

    var NUS = document.getElementById('NUS').value;
    var nome = document.getElementById('nome').value;
    var date = document.getElementById('date').value;  
    var tipo = document.getElementById('tipo').value;
    var rua = document.getElementById('rua').value;
    var concelho = document.getElementById('concelho').value;
    var distrito = document.getElementById('distrito').value;
    var pais = document.getElementById('pais').value;

    var pattern_nus = new RegExp("[0-9]{9}");
    var pattern_string = new RegExp("[a-zA-Z]{2,45}");

    var hasError = false;

    if (!pattern_nus.test(NUS)) {
        alert("O NUS tem de ser constituido por 9 numeros!");
        hasError = true;
    }

    if (!pattern_string.test(nome)) {
        alert("Insira um nome valido com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }

    if (date > new Date().toISODate() || date < '1800/12/31' ) {
        alert("Data invalida!");
        hasError = true;
    }

    if (tipo!=1 && tipo!=2) {
        alert("Insira um genero valido!");
        hasError = true;
    }

    if (hasError) {
        evt.preventDefault();
    }

    if (!pattern_string.test(rua)) {
        alert("Insira uma rua valida com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }
    if (!pattern_string.test(concelho)) {
        alert("Insira um concelho valido com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }
    if (!pattern_string.test(distrito)) {
        alert("Insira um distrito valido com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }
    if (!pattern_string.test(pais)) {
        alert("Insira um pais valido com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }
}
function initEvents() {

    document.getElementById('Registar').addEventListener('click', Validatinator, false);

}

document.addEventListener('DOMContentLoaded', initEvents, false);