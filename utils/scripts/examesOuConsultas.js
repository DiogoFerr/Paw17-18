const mySqlModule = require('../models/dbModel');

document.getElementById('submit').onclick = function () {
    var pulseira2 = document.querySelector('input[name="paciente_status"]:checked').value;
    alert(pulseira2);

    var label = document.getElementById("nus");
    var result = label.getAttribute("utente");
    alert(result);

    //var sql = ("SELECT * FROM paciente");
    //alert(mySqlModule.query(sql));

}
