$(document).ready(()=>{
    $("button").click(anadirCoches);
});

function anadirCoches() {
    $.post("addCoche.php",{
        "modelo": $("#modelo").val(),
        "color": $("#color").val(),
    },procesarRespuesta,"json")
}

function procesarRespuesta(respuesta) {
    if (respuesta.estado == "ok") {
        alert("Coche dado de alta");
    } else {
        alert(respuesta.mensaje);
    }
}