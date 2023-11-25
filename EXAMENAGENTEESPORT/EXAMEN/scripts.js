const listaEquipos = [
  "ARCTIC GAMING",
  "CREAM REAL BETIS",
  "EMONKEYZ",
  "MAD LIONS E.C.",
  "MOVISTAR RIDERS",
  "BCN SQUAD",
  "S2V ESPORTS",
  "TEAM HERETICS",
  "TEAM QUESO",
  "UCAM ESPORTS CLUB",
  "VODAFONE GIANTS",
  "WIZARDS CLUB",
  "WYGERS",
  "X6TENCE",
];

const listaImgEquipos = [
  "artic_logo.png",
  "cream_sports.png",
  "emonkeyz_logo.png",
  "mad_lions.png",
  "movistar_logo.png",
  "bcn_squad_logo.png",
  "s2v_digital_sports.png",
  "heretics_logo.png",
  "team_queso.png",
  "ucam_penguins_logo.png",
  "giants_logo.png",
  "wizards.png",
  "wygers.png",
  "x6tence.png",
];

onload = () => {
  pintarLista();
  setInterval(mostrarImagenesAnuncio, 3000);

  const enlaceJugadores = document.querySelectorAll("a")[1];

  enlaceJugadores.addEventListener("click", function () {
    const divCentral = document.getElementById("central");
    divCentral.innerHTML = "";
    const etiquetaLabel = document.createElement("label");
    etiquetaLabel.textContent = "Jugador: ";
    divCentral.appendChild(etiquetaLabel);
    const selectOpt = document.createElement("select");
    selectOpt.id = "selectOpt";
    divCentral.appendChild(selectOpt);
    const optDefault = document.createElement("option");
    optDefault.textContent = "Escoge un jugador";
    selectOpt.appendChild(optDefault);
    listaJugadores.forEach((element) => {
      const optJugador = document.createElement("option");
      optJugador.textContent = `${element.apellidos}, ${element.nombre}`;
      optJugador.value = element.nif;
      selectOpt.appendChild(optJugador);
    });

    selectOpt.addEventListener("change", pintarInfoJugadores);
  });

  const enlaceNuevoContrato = document.querySelectorAll("a")[2];

  enlaceNuevoContrato.addEventListener("click", function () {
    borrarDivCentral();
    const divNuevoContrato = document.getElementById("nuevoContrato");
    divNuevoContrato.className =
      divNuevoContrato.className === "oculta" ? "visible" : "oculta";

    const selectOpt = document.querySelector('select[name="jugador"]');
    const optDefault = document.createElement("option");
    optDefault.textContent = "Escoge un jugador";
    selectOpt.appendChild(optDefault);
    listaJugadores.forEach((element) => {
      const optJugador = document.createElement("option");
      optJugador.textContent = `${element.apellidos}, ${element.nombre}`;
      optJugador.value = element.nif;
      selectOpt.appendChild(optJugador);
    });
  });
};

function pintarLista() {
  const divCentral = document.getElementById("central");
  divCentral.innerHTML = "";
  listaJugadores.forEach((element) => {
    const parrafo = document.createElement("p");
    const boton = document.createElement("button");
    parrafo.textContent = `${element.nombre} `;
    boton.textContent = "Borrar";
    boton.addEventListener("click", () => borrar(element.nif));
    divCentral.appendChild(parrafo);
    parrafo.appendChild(boton);
  });
}

function borrar(nif) {
  let posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);

  if (posicion != -1) {
    listaJugadores.splice(posicion, 1);
    pintarLista();
  }
}

let contador = 0;

function mostrarImagenesAnuncio() {
  const divAnuncio = document.getElementById("anuncio");
  const parrafoHijo = divAnuncio.querySelectorAll("p")[0];

  const imagen = divAnuncio.querySelector("p img");
  imagen.src = `imagenes/${listaImgEquipos[contador]}`;
  contador++;
  if (contador == listaImgEquipos.length) {
    contador = 0;
  }
  parrafoHijo.appendChild(imagen);
}

function pintarInfoJugadores() {
  const optionSelect = document.getElementById("selectOpt").value;
  let posicion = listaJugadores.findIndex(
    (jugador) => jugador.nif === optionSelect
  );

  if (posicion != -1) {
    const divCentral = document.getElementById("central");
    const divDatosJugadores = document.getElementById("datosJugadores");
    if (divDatosJugadores) {
      divDatosJugadores.innerHTML = "";
    } else {
      const divDatosJugadores = document.createElement("div");
      divDatosJugadores.id = "datosJugadores";
      divCentral.appendChild(divDatosJugadores);
    }

    let label = document.createElement("label");
    label.textContent = "nombre: ";
    divDatosJugadores.appendChild(label);
    const nombre = document.createElement("input");
    nombre.type = "text";
    nombre.value = listaJugadores[posicion].nombre;
    divDatosJugadores.appendChild(nombre);

    label = document.createElement("label");
    label.textContent = "apellidos: ";
    divDatosJugadores.appendChild(label);
    const apellidos = document.createElement("input");
    apellidos.type = "text";
    apellidos.value = listaJugadores[posicion].apellidos;
    divDatosJugadores.appendChild(apellidos);

    label = document.createElement("label");
    label.textContent = "nif: ";
    divDatosJugadores.appendChild(label);
    const nif = document.createElement("input");
    nif.type = "text";
    nif.value = listaJugadores[posicion].nif;
    nif.disabled = "disabled";
    divDatosJugadores.appendChild(nif);

    label = document.createElement("label");
    label.textContent = "correo: ";
    divDatosJugadores.appendChild(label);
    const correo = document.createElement("input");
    correo.type = "text";
    correo.value = listaJugadores[posicion].correo;
    divDatosJugadores.appendChild(correo);

    label = document.createElement("label");
    label.textContent = "comentarios: ";
    divDatosJugadores.appendChild(label);
    const comentarios = document.createElement("input");
    comentarios.type = "text";
    comentarios.value = listaJugadores[posicion].comentarios;
    divDatosJugadores.appendChild(comentarios);

    const botonGuardar = document.createElement("button");
    const botonBorrar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonBorrar.textContent = "Borrar";
    divDatosJugadores.appendChild(botonGuardar);
    divDatosJugadores.appendChild(botonBorrar);

    botonGuardar.addEventListener("click", () => guardarDatos(optionSelect));
    botonBorrar.addEventListener("click", () => borrarDatos(optionSelect));
  }
}

function guardarDatos(nif) {
  const posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);

  if (posicion !== -1) {
    listaJugadores[posicion].nombre =
      document.querySelectorAll("div input")[1].value;
    listaJugadores[posicion].apellidos =
      document.querySelectorAll("div input")[2].value;
    listaJugadores[posicion].correo =
      document.querySelectorAll("div input")[4].value;
    listaJugadores[posicion].comentarios =
      document.querySelectorAll("div input")[5].value;
    pintarInfoJugadores();
  }
}

function borrarDatos(nif) {
  const posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);

  if (posicion !== -1) {
    listaJugadores.splice(posicion, 1);
    pintarInfoJugadores();
  }
}

function borrarDivCentral() {
  const divCentral = document.getElementById("central");
  divCentral.innerHTML = "";
}
