function muestraMensaje1() {

    alert('Gracias por pinchar 1');

}

function muestraMensaje2() {

    alert('Gracias por pinchar 2');

}

document.getElementById("pinchable").addEventListener("click", muestraMensaje1);
document.getElementById("pinchable").addEventListener("click", muestraMensaje2);
//document.getElementById("pinchable").onclick = muestraMensaje1;
//document.getElementById("pinchable").onclick = muestraMensaje2;

//document.getElementById("pinchable").setAttribute("onclick", "muestraMensaje2()");
//document.getElementById("pinchable").setAttribute("id", "otroId");