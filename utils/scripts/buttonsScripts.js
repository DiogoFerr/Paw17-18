var pacientesAtendidos = document.getElementById("pacientesAtendidos");
var logout = document.getElementById("logout");

pacientesAtendidos.addEventListener("click", function () {
    window.location = "/triagem/pacientesAtendidos";
}, false)

logout.addEventListener("click", function () {
    window.location = "/logout";
}, false)
