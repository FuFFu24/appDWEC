var listaEmpleados = [];
cargarEmpleados();
function cargarEmpleados(){
    $.getJSON("empleados.json",{},(resultado) =>{
        listaEmpleados = resultado;
        pintarTabla(listaEmpleados);
    });

}

function pintarTabla(lista) {
    var central = document.getElementById("central");
    central.innerHTML = "";
    var tabla = document.createElement("table");
    central.appendChild(tabla);
    lista.forEach(empleado => {
        var fila = document.createElement("tr");
        tabla.appendChild(fila);
        for (propiedad in empleado) {
            var celda = document.createElement("td");
            fila.appendChild(celda);
            if (propiedad != "foto") {
                celda.innerHTML = empleado[propiedad];
            } else {
                celda.innerHTML = `<img src="./images/${empleado[propiedad]}">`
            }
        }
        celda = document.createElement("td");
        fila.appendChild(celda);
        let imagenEliminar = document.createElement("img");
        imagenEliminar.src = "./images/papelera.png";
        imagenEliminar.width = 50;
        imagenEliminar.addEventListener("click", () => eliminar(empleado));
        celda.appendChild(imagenEliminar);
        let imagenEditar = document.createElement("img");
        imagenEditar.src = "./images/editar.png";
        imagenEditar.width = 50;
        imagenEditar.addEventListener("click", () => editar(empleado));
        celda.appendChild(imagenEditar);
    });
}

function eliminar(empleadoABorrar) {
    var posicion = listaEmpleados.findIndex(empleado => empleado.DNI == empleadoABorrar.DNI);
    if (posicion != -1) {
        listaEmpleados.splice(posicion, 1);
        pintarTabla(listaEmpleados);
    }
}

function ordenar() {
    listaEmpleados.sort((a, b) => {
        if (a.nombre > b.nombre) return 1
        else return -1;
    });
    pintarTabla(listaEmpleados);
}

function editar(empleado) {
    let divEditarEmpleado;
    if (document.getElementById("editarEmpleado")) {
        divEditarEmpleado = document.getElementById("editarEmpleado");
    } else {
        divEditarEmpleado = document.createElement("div");
        divEditarEmpleado.id = "editarEmpleado";
        document.body.appendChild(divEditarEmpleado);
    }
    divEditarEmpleado.innerHTML = `<span>Nombre</span><input type="text" id="nombre" value="${empleado.nombre}"><br>
        <span>Apellidos</span><input type="text" id="apellidos" value="${empleado.apellidos}"><br>
        <span>Puesto</span><input type="text" id="puesto" value="${empleado.puesto}"><br>
        <span>Edad</span><input type="text" id="edad" value="${empleado.edad}"><br>
        <span>Antiguedad</span><input type="text" id="antiguedad" value="${empleado.antiguedad}"><br>
        <span>Foto</span><input type="text" id="foto" value="${empleado.foto}"><br>
        <button type="button" onclick="guardarCambios('${empleado.DNI}')">Guardar</button>
        <button type="button" onclick="borrarDivEditarEmpleado()">Cancelar</button></button>`
}

function guardarCambios(dniEmpleado) {
    let posicion = listaEmpleados.findIndex(empleado => empleado.DNI == dniEmpleado);
    if (posicion != -1) {
        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let puesto = document.getElementById("puesto").value;
        let edad = document.getElementById("edad").value;
        let antiguedad = document.getElementById("antiguedad").value;
        let foto = document.getElementById("foto").value;
        let empleado = new Empleado(dniEmpleado, nombre, apellidos, edad, antiguedad, puesto, foto);
        listaEmpleados[posicion] = empleado;
        alert("Datos Guardados");
        borrarDivEditarEmpleado();
        pintarTabla(listaEmpleados);
    } else {
        alert("No se han podido guardar los cambios")
    }
}

function borrarDivEditarEmpleado() {
    document.getElementById("editarEmpleado").innerHTML = "";
}