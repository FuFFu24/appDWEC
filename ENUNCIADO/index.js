let intervalo;

onload = function() {
    cargarPersonasEnSelect(listaPersonas);
    crearDivEnCeldas(listaPersonas);
    intervalo = setInterval(mostrarDivOculto, 5000);
}

function cargarPersonasEnSelect(lista) {
    let select = document.getElementById("divPersonas").querySelectorAll("select")[1];

    lista.forEach(element => {
        select.innerHTML += `<option value="${element.Codigo}">${element.Nombre}</option>`;
    });

    select.addEventListener("change", mostrarPista);
}

function mostrarPista(evento) {
    let codigoPersona = evento.target.value;
    let posicion = listaPersonas.findIndex((persona) => persona.Codigo == codigoPersona);

    if (posicion != -1) {
        let select = document.getElementById("divPersonas").querySelector('input[type="text"]');
        select.value = `Celda1 : ${listaPersonas[posicion].PosicionCelda1}, Celda2 : ${listaPersonas[posicion].PosicionCelda1}`;
    }
}

function crearDivEnCeldas(lista) {
    let listaCeldas = [...document.querySelectorAll("#divTablero table")[0].querySelectorAll("td")];

    listaCeldas.forEach(element => {
        let div = document.createElement("div");
        //div.className = "oculta";
        element.appendChild(div);
        let img = document.createElement("img");
        img.width = "75";
        img.height = "75";
        div.appendChild(img);
        let p = document.createElement("p");
        div.appendChild(p);


        let numeroCelda = element.textContent;
        let posicion = listaPersonas.findIndex((persona) => persona.PosicionCelda1 == numeroCelda || persona.PosicionCelda2 == numeroCelda);

        if (posicion != -1) {
            persona = lista[posicion];
            img.src = `imagenes/${persona.Foto}`;
            p.textContent = persona.Nombre;
        } else {
            img.src = `imagenes/novale.png`;
            p.textContent = "ERROR";
        }
    });
}

function mostrarDivOculto() {
    if (a) {
        clearInterval(intervalo);
    }
}