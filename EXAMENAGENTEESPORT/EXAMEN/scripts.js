document.addEventListener("DOMContentLoaded", function () {
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

  const divAnuncio = document.getElementById("anuncio");
  const imagenAnuncio = divAnuncio.querySelector("p img");
  imagenAnuncio.src = `imagenes/${listaImgEquipos[0]}`;
  let contador = 1;

  setInterval(function cambiarImgAnuncio() {
    imagenAnuncio.src = `imagenes/${listaImgEquipos[contador]}`;
    contador++;
    if (contador >= listaImgEquipos.length) {
      contador = 0;
    }
  }, 3000);

  const linkJugadores = document.querySelectorAll("li a")[1];

  const divCentral = document.getElementById("central");

  function limpiarDivCentral() {
    if (divCentral.hasChildNodes()) {
      divCentral.innerHTML = "";
    }
  }

  linkJugadores.addEventListener("click", function mostrarSelect() {
    divNuevoContrato.className = "oculta";
    pintarSelect();
  });

  function pintarSelect() {
    limpiarDivCentral();
    const selectJugadores = document.createElement("select");
    selectJugadores.id = "selectJugadores";
    const optDefault = document.createElement("option");
    optDefault.textContent = "Escoge un jugador";
    selectJugadores.appendChild(optDefault);
    listaJugadores.forEach((element) => {
      const optJugadores = document.createElement("option");
      optJugadores.value = element.nif;
      optJugadores.textContent = `${element.apellidos}, ${element.nombre}`;
      selectJugadores.appendChild(optJugadores);
    });
    selectJugadores.addEventListener("change", function () {
      pintarDatos(selectJugadores.value);
    });
    divCentral.appendChild(selectJugadores);
  }

  function pintarDatos(nif) {
    let posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);
    if (document.getElementById("divDatos")) {
      document.getElementById("divDatos").remove();
    }
    const divDatos = document.createElement("div");
    divDatos.id = "divDatos";
    divDatos.innerHTML = `
    <p>
      <label for="nombre">nombre</label>
    <input type="text" name="nombre" id="nombre" value="${listaJugadores[posicion].nombre}">
    </p>
    <p>
      <label for="apellidos">apellidos</label>
    <input type="text" name="apellidos" id="apellidos" value="${listaJugadores[posicion].apellidos}">
    </p>
    <p>
      <label for="nif">nif</label>
    <input type="text" name="nif" id="nif" value="${listaJugadores[posicion].nif}" disabled>
    </p>
    <p>
      <label for="correo">correo</label>
    <input type="text" name="correo" id="correo" value="${listaJugadores[posicion].correo}">
    </p>
    <p>
      <label for="comentarios">comentarios</label>
    <input type="text" name="comentarios" id="comentarios" value="${listaJugadores[posicion].comentarios}">
    </p>
    <p>
    <button type="button" id="modificarBtn">Modificar</button>
    <button type="button" id="borrarBtn">Borrar</button>
    </p>
    `;
    divCentral.appendChild(divDatos);

    document
      .getElementById("modificarBtn")
      .addEventListener("click", function () {
        modificarDatos(nif);
      });
    document.getElementById("borrarBtn").addEventListener("click", function () {
      borrarDatos(nif);
    });
  }

  function modificarDatos(nif) {
    let posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);
    if (posicion !== -1) {
      listaJugadores[posicion].nombre = document.getElementById("nombre").value;
      listaJugadores[posicion].apellidos =
        document.getElementById("apellidos").value;
      listaJugadores[posicion].correo = document.getElementById("correo").value;
      listaJugadores[posicion].comentarios =
        document.getElementById("comentarios").value;
      pintarSelect();
    }
  }

  function borrarDatos(nif) {
    let posicion = listaJugadores.findIndex((jugador) => jugador.nif === nif);
    if (posicion !== -1) {
      listaJugadores.splice(posicion, 1);
      pintarSelect();
    }
  }

  const enlaceNuevoContrato = document.querySelectorAll("li a")[2];

  const divNuevoContrato = document.getElementById("nuevoContrato");

  enlaceNuevoContrato.addEventListener("click", function () {
    limpiarDivCentral();
    mostrarContrato();
  });

  function mostrarContrato() {
    divNuevoContrato.className = "visible";
    const selectJugador = document.querySelector("select[name='jugador']");
    const selectEquipo = document.querySelector("select[name='equipo']");
    selectJugador.innerHTML = "";
    selectEquipo.innerHTML = "";

    const selectJugadorDefault = document.createElement("option");
    selectJugadorDefault.textContent = "Escoge un jugador";
    selectJugador.appendChild(selectJugadorDefault);

    const selectEquipoDefault = document.createElement("option");
    selectEquipoDefault.textContent = "Escoge un equipo";
    selectEquipo.appendChild(selectEquipoDefault);

    listaJugadores.forEach((element) => {
      const optJugadores = document.createElement("option");
      optJugadores.value = element.nif;
      optJugadores.textContent = `${element.apellidos}, ${element.nombre}`;
      selectJugador.appendChild(optJugadores);
    });

    listaEquipos.forEach((element) => {
      const optEquipos = document.createElement("option");
      optEquipos.value = element;
      optEquipos.textContent = `${element}`;
      selectEquipo.appendChild(optEquipos);
    });
  }

  const btnGuardar = document.getElementById("guardar");

  btnGuardar.addEventListener("click", function () {
    let selectJugadoresValue = document.querySelector(
      "select[name='jugador']"
    ).value;
    let selectEquiposValue = document.querySelector(
      "select[name='equipo']"
    ).value;

    let fechaDesdeValue = document.querySelector(
      "input[name='fechaDesde']"
    ).value;
    let fechaHastaValue = document.querySelector(
      "input[name='fechaHasta']"
    ).value;
    let importeAnualValue = document.querySelector(
      "input[name='importeAnual']"
    ).value;
    let porcentajeAgenteValue = document.querySelector(
      "input[name='porcentajeAgente']"
    ).value;

    if (
      selectJugadoresValue &&
      selectEquiposValue &&
      fechaDesdeValue &&
      fechaHastaValue &&
      importeAnualValue &&
      porcentajeAgenteValue
    ) {
      if (
        validarJugador(selectJugadoresValue) &&
        validarEquipo(selectEquiposValue) &&
        validarPorcentaje(porcentajeAgenteValue) &&
        validarFecha(fechaDesdeValue) &&
        validarFecha(fechaHastaValue) &&
        validarFechaMayor(fechaDesdeValue, fechaHastaValue)
      ) {
        let contratosLS = localStorage.getItem("contratos");
        let contratos = JSON.parse(contratosLS) || [];

        let nuevoContrato = {
          jugador: selectJugadoresValue,
          equipo: selectEquiposValue,
          fechaDesde: fechaDesdeValue,
          fechaHasta: fechaHastaValue,
          importeAnual: importeAnualValue,
          porcentajeAgente: porcentajeAgenteValue,
        };

        contratos.push(nuevoContrato);

        localStorage.setItem("contratos", JSON.stringify(contratos));
      }
    }
  });

  function validarJugador(value) {
    let posicion = listaJugadores.findIndex((jugador) => jugador.nif === value);
    if (posicion !== -1) {
      return true;
    } else {
      return false;
    }
  }

  function validarEquipo(value) {
    let posicion = listaEquipos.findIndex((equipo) => equipo === value);
    if (posicion !== -1) {
      return true;
    } else {
      return false;
    }
  }

  function validarPorcentaje(value) {
    if (value >= 1 && value <= 10) {
      return true;
    } else {
      return false;
    }
  }

  function validarFecha(value) {
    let valores = value.split("-");
    let fecha = new Date(valores[0], valores[1] - 1, valores[2]);
    if (
      fecha.getDate() != valores[2] ||
      fecha.getMonth() != valores[1] - 1 ||
      fecha.getFullYear() != valores[0]
    ) {
      return false;
    } else {
      return true;
    }
  }

  function validarFechaMayor(desde, hasta) {
    let valores1 = desde.split("-");
    let fecha1 = new Date(valores1[0], valores1[1] - 1, valores1[2]);
    let valores2 = hasta.split("-");
    let fecha2 = new Date(valores2[0], valores2[1] - 1, valores2[2]);

    if (fecha1 < fecha2) {
      return true;
    } else {
      return false;
    }
  }
});
