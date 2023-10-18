var listaEmpleados = [];
listaEmpleados.push(new Empleado("12345678A", "Fernando", "Garcia Jimenez", 50, 2010, "Jefe"));
listaEmpleados.push(new Empleado("22345678A", "Federico", "Perez Lopez", 40, 2012, "Analista"));
listaEmpleados.push(new Empleado("44445678C", "Felix", "Martinez Alba", 60, 2013, "Programador Senior"));
listaEmpleados.push(new Empleado("92345678A", "Feliciano", "Castro Gomez", 30, 2016, "Programador"));
listaEmpleados.push(new Empleado("12345999Z", "Fermin", "Gutierrez Mesa", 20, 2020, "Becario"));


window.onload = function() {
    pintarTabla(listaEmpleados);
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
                celda.innerHTML = `<img src="${empleado[propiedad]}">`
                celda.addEventListener("click", () => editar(empleado.DNI))
            }
        }
        var celda = document.createElement("td");
        fila.appendChild(celda);
        celda.innerHTML = "Eliminar";
        celda.addEventListener("click", () => eliminar(empleado));
    });
}

function editar(empleadoAEditar) {
    let divNuevoEmpleado;
    if (document.getElementById("nuevoEmpleado")) {
        divNuevoEmpleado = document.getElementById("nuevoEmpleado");
    } else {
        divNuevoEmpleado = document.createElement("div");
        divNuevoEmpleado.id = "nuevoEmpleado";
        document.body.appendChild(divNuevoEmpleado);
    }
    divNuevoEmpleado.innerHTML = `<table>
                        <tr>
                        <td>Nombre: </td>
                        <td><input type="text" id="nombreEmpleado" value=""></td>
                        </tr>
                        <tr>
                        <td>Apellidos: </td>
                        <td><input type="text" id="apellidosEmpleado"></td>
                        </tr>
                        <tr>
                        <td>Edad: </td>
                        <td><input type="text" id="edadEmpleado"></td>
                        </tr>
                        <tr>
                        <td>Antiguedad: </td>
                        <td><input type="text" id="antiguedadEmpleado"></td>
                        </tr>
                        <tr>
                        <td>Puesto: </td>
                        <td><input type="text" id="puestoEmpleado"></td>
                        </tr>
                        </table>
                        <button type="button" onclick="editarEmpleado(empleadoAEditar)">Editar</button>
                        <button type="button" onclick="borrarDivNuevoEmpleado()">Cancelar</button>
                        `
}

function editarEmpleado(empleadoAEditar) {
    listaEmpleados[empleadoAEditar].nombre = document.getElementById("nombreEmpleado").value;
    listaEmpleados[empleadoAEditar].apellidos = document.getElementById("apellidosEmpleado").value;
    listaEmpleados[empleadoAEditar].edad = document.getElementById("edadEmpleado").value;
    listaEmpleados[empleadoAEditar].antiguedad = document.getElementById("antiguedadEmpleado").value;
    listaEmpleados[empleadoAEditar].puesto = document.getElementById("puestoEmpleado").value;
    pintarTabla(listaEmpleados);
}

function borrarDivNuevoEmpleado() {
    document.getElementById("nuevoEmpleado").innerHTML = "";
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