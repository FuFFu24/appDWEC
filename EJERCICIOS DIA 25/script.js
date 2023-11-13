function validar(){
    var error = false;
    //recuperar todos los elementos del formulario
    var nombre=document.getElementById("nombre");
    var edad = document.getElementById("edad2");
    var fecha2 = document.getElementById("fecha2");
    var listaRadio = document.getElementsByName("radio");
    var patronNombre =/^[a-zA-Z]/;
    // validar cada elemento del formulario
    if (nombre.value.trim() == "" ||
    !patronNombre.test(nombre.value)) {
    error=true;
    nombre.style.backgroundColor="red";
    nombre.insertAdjacentHTML("afterend","<span class='error'>NO PUEDE SER VACIO NI EMPEZAR POR NUMERO</span>")
    }
    
    if (isNaN(edad.value) || parseInt(edad.value) < 0 || parseInt(edad.value) > 100) {
    error=true;
    edad.style.backgroundColor="red";
    edad.insertAdjacentHTML("afterend","<span class='error'>ERROR</span>")
    }
    
    patronFecha=/^\d{2}-\d{2}-\d{4}$/;
    if (!patronFecha.test(fecha2.value) ||
    noEsFechaValida(fecha2.value)) {
    error=true;
    fecha2.style.backgroundColor="red";
    fecha2.insertAdjacentHTML("afterend","<span class='error'>ERROR</span>")
    }
    
    if (!listaRadio[0].checked &&
    !listaRadio[1].checked &&
    !listaRadio[2].checked) {
    error=true;
    document.getElementById("opciones").style.backgroundColor="red";
    document.getElementById("opciones").insertAdjacentHTML("afterend","<span class='error'>ERROR</span>")
    }
    
    
    // si algo esta mal
    //if (error) event.preventDefault(); // caso 1
    //return !error; // caso 2
    if (!error) forms[0].submit();
    }
    function noEsFechaValida(textoFecha){
    var dia = textoFecha.split("-")[0];
    var mes = textoFecha.split("-")[1];
    var year = textoFecha.split("-")[2];
    var fecha = new Date(year,mes-1,dia);
    if (fecha.getFullYear() != year ||
    fecha.getMonth() != mes -1 ||
    fecha.getDate() != dia){
    return true;
    } else {
    return false;
    }
    }