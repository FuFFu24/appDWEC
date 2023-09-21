// var respuesta = prompt("Escribe un numero (entre 1 y 10): ");
// if (!isNaN(respuesta) && respuesta>0 && respuesta<11) {
//     contenido = "<table><tbody>";

//     for (i = 0; i < 10; i++) {
//         contenido += "<tr>";
//         contenido += `<td>${(i + 1)}</td>`;
//         contenido += "<td> x </td>";
//         contenido += `<td> ${respuesta} </td>`;
//         contenido += "<td> = </td>";
//         contenido += "<td>" + ((i + 1) * respuesta) + "</td>";
//         contenido += "</tr>";
//     }

//     contenido += "</table></tbody>";

//     document.body.innerHTML += contenido;
// } else {
//     alert("ERROR. Numero entre 1 y 10");
// }

var respuesta = prompt("Escribe un numero (entre 1 y 10): ");
while (isNaN(respuesta) || respuesta<0 || respuesta>11) {
    alert("ERROR. Numero entre 1 y 10");
    respuesta = prompt("Escribe un numero (entre 1 y 10): ");
}

contenido = "<table><tbody>";

    for (i = 0; i < 10; i++) {
        contenido += "<tr>";
        contenido += `<td>${(i + 1)}</td>`;
        contenido += "<td> x </td>";
        contenido += `<td> ${respuesta} </td>`;
        contenido += "<td> = </td>";
        contenido += "<td>" + ((i + 1) * respuesta) + "</td>";
        contenido += "</tr>";
    }

    contenido += "</table></tbody>";

    document.body.innerHTML += contenido;