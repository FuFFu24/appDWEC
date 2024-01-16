onload = function () {
  anadirPersonasDesplegable();
  cargarTabla();
  setInterval(mostrarDivOculto5Seg, 5000);

  let segundoDesplegable = document.querySelectorAll("#divPersonas select")[1];
  segundoDesplegable.addEventListener("change", pistaParaJugador);
};

function anadirPersonasDesplegable() {
  let segundoDesplegable = document.querySelectorAll("#divPersonas select")[1];

  listaPersonas.forEach((element) => {
    segundoDesplegable.innerHTML += `<option id="${element.Nombre}">${element.Nombre}</option>`;
  });
}

function cargarTabla() {
  let tds = document.querySelectorAll("#divTablero td");
  for (let i = 0; i < tds.length; i++) {
    for (let j = 0; j < listaPersonas.length; j++) {
      if (
        listaPersonas[j].PosicionCelda1 == tds[i].textContent ||
        listaPersonas[j].PosicionCelda2 == tds[i].textContent
      ) {
        let div = document.createElement("div");
        div.style.display = "none";
        let imagen = document.createElement("img");
        imagen.src = `./imagenes/${listaPersonas[j].Foto}`;
        imagen.height = "75";
        imagen.width = "75";
        div.appendChild(imagen);
        let parrafo = document.createElement("p");
        parrafo.textContent = `${listaPersonas[j].Nombre}`;
        div.appendChild(parrafo);
        tds[i].appendChild(div);

        tds[i].addEventListener("click", mostrarDivOculto);
      }
    }
    if (tds[i].childNodes.length == 1) {
      let div = document.createElement("div");
      div.style.display = "none";
      let imagen = document.createElement("img");
      imagen.src = `./imagenes/novale.png`;
      imagen.height = "75";
      imagen.width = "75";
      div.appendChild(imagen);
      let parrafo = document.createElement("p");
      parrafo.textContent = `ERROR`;
      div.appendChild(parrafo);
      tds[i].appendChild(div);

      tds[i].addEventListener("click", mostrarDivOculto);
    }
  }
}

let contadorClicks = 0;

let nombresRevelados = [];

function mostrarDivOculto(evento) {
  evento.target.childNodes[1].style.display = "block";
  let nombre = evento.target.childNodes[1].childNodes[1].textContent;

  nombresRevelados.push(nombre);

  let vecesApareceNombre = nombresRevelados.filter(
    (element) => element == nombre
  ).length;

  let clicksJSON = localStorage.getItem("clicks");
  let clicks = JSON.parse(clicksJSON) || [];

  if (nombre == "ERROR") {
    let nuevoClick = {
      NumeroClick: contadorClicks++,
      NumeroCelda: evento.target.childNodes[0].textContent,
      Resultado: "error",
      Persona: {},
    };

    clicks.push(nuevoClick);
    localStorage.setItem("clicks", JSON.stringify(clicks));
  } else if (vecesApareceNombre == 1) {
    let posicion = listaPersonas.findIndex(
      (element) => element.Nombre == nombre
    );

    let nuevoClick = {
      NumeroClick: contadorClicks++,
      NumeroCelda: evento.target.childNodes[0].textContent,
      Resultado: "posible",
      Persona: {
        Codigo: listaPersonas[posicion].Codigo,
        Nombre: listaPersonas[posicion].Nombre,
        Puntuacion: listaPersonas[posicion].Puntuacion,
        Foto: listaPersonas[posicion].F,
        PosicionCelda1: listaPersonas[posicion].PosicionCelda1,
        PosicionCelda2: listaPersonas[posicion].PosicionCelda2,
      },
    };

    clicks.push(nuevoClick);
    localStorage.setItem("clicks", JSON.stringify(clicks));
  } else if (vecesApareceNombre == 2) {
    let posicion = listaPersonas.findIndex(
      (element) => element.Nombre == nombre
    );

    let nuevoClick = {
      NumeroClick: contadorClicks++,
      NumeroCelda: evento.target.childNodes[0].textContent,
      Resultado: "acierto",
      Persona: {
        Codigo: listaPersonas[posicion].Codigo,
        Nombre: listaPersonas[posicion].Nombre,
        Puntuacion: listaPersonas[posicion].Puntuacion,
        Foto: listaPersonas[posicion].F,
        PosicionCelda1: listaPersonas[posicion].PosicionCelda1,
        PosicionCelda2: listaPersonas[posicion].PosicionCelda2,
      },
    };

    clicks.push(nuevoClick);
    localStorage.setItem("clicks", JSON.stringify(clicks));

    let totalAciertos = document.querySelector("#totalAciertos");
    totalAciertos.innerHTML = parseInt(totalAciertos.innerHTML) + 1;
  }

  document.querySelector("#totalClicks").innerHTML = contadorClicks;
}

let contadorTablero = 0;

function mostrarDivOculto5Seg() {
  let tds = document.querySelectorAll("#divTablero td");
  tds[contadorTablero].childNodes[1].style.display = "block";
  if (contadorTablero > tds.length) {
    clearInterval(mostrarDivOculto5Seg, 5000);
  } else {
    contadorTablero++;
  }
}

function pistaParaJugador(evento) {
  let posicion = listaPersonas.findIndex(
    (persona) => persona.Nombre == evento.target.value
  );

  if (posicion != -1) {
    let posicionInput = document.querySelector(
      "#divPersonas input[type='text']"
    );

    posicionInput.value = `Celda1 ${listaPersonas[posicion].PosicionCelda1} - Celda2 ${listaPersonas[posicion].PosicionCelda2}`;
  }
}
