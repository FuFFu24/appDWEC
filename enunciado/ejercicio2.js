listaVinilos = ['25996_1.jpg','25996_2.jpg','25997_1.jpg','25997_3.jpg','26650_3.jpg','26704_3.jpg','26868_1.jpg','26868_2.jpg','26869_1.jpg','26869_2.jpg','26873_1.jpg']
listaLaminas = ['26873_2.jpg','27095_3.jpg','27356_3.jpg','27429_1.jpg','27429_2.jpg','27773_3.jpg','28155_1.jpg','28155_2.jpg','28192_3.jpg','28192_4.jpg','29776_3.jpg']
listaOtros = ['30390_3.jpg','30473_1.jpg','31386_1.jpg','31386_2.jpg','31469_3.jpg']
listaTodos = [...listaVinilos,...listaLaminas,...listaOtros]

function generarOptions() {
    let opciones = "";
    for (let i = 1; i <= 20; i++) {
        opciones += `<option>${i}</option>\n`;
    }
    return opciones;
}

function cargarCuadros() {
    const exposicion = document.querySelector("#exposicion");
    const tabla = document.createElement("table");
    let contadorTds = 1;

    let tr = document.createElement("tr");

    for (let i = 0; i < listaTodos.length; i++) {
        let contenido = `
            <img src="./pagina2_files/${listaTodos[i]}" alt=""><br>
            <button type="button">CONTRATAR</button><br>
            <button type="button">ALQUILAR</button>
            <input type="text" name="cantidad" id="cantidad"><br>
            <label for="duracion">DURACION: </label>
            <select name="duracion" id="duracion">
                <option>Escoge</option>
                ${generarOptions()}
            </select>
        `;

        if (contadorTds % 4 === 0) {
            tr = document.createElement("tr");
        }

        const td = document.createElement("td");
        td.innerHTML = contenido;
        tr.appendChild(td);

        if (contadorTds % 4 === 0 || i === listaTodos.length - 1) {
            tabla.appendChild(tr);
        }

        contadorTds++;
    }

    exposicion.appendChild(tabla);
}

function filtrarPorTipoCuadros() {
    const tipoCuadroSelect = document.querySelector("#central select").value;
    
}

window.onload = function () {
    cargarCuadros();
}