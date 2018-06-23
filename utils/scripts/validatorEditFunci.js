function Validatinator(evt) {
    var nome = document.getElementById('nome').value;
    var departamento = document.getElementById('departamento').value;
    var tipo = document.getElementById('tipo').value;
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;

    var pattern_num = new RegExp("[0-9]{6}");
    var pattern_string = new RegExp("[a-zA-Z]{2,45}");
    var pattern_password = new RegExp("^.{4,8}$");

    var hasError = false;

    if (!pattern_string.test(nome)) {
        alert("Insira um nome valido com um minimo de 2 e um maximo de 45 caracteres");
        hasError = true;
    }

    if (departamento != 1 && departamento != 2 && departamento != 3 && departamento != 4 && departamento != 5 && departamento != 6) {
        alert("Insira um departamento valido!");
        hasError = true;
    }

    if (tipo != 1 && tipo != 2 && tipo != 3) {
        alert("Insira um tipo de funcionario valido!");
        hasError = true;
    }

    if (!pattern_password.test(password)) {
        alert("Insira uma password entre 4 e 8 caracteres!");
        hasError = true;
    }

    if (password != password2) {
        alert("As passwords não coincidem!");
        hasError = true;
    }

    if (hasError) {
        evt.preventDefault();
    }
}

function initEvents() {

    document.getElementById('guardar').addEventListener('click', Validatinator, false);

}

document.addEventListener('DOMContentLoaded', initEvents, false);