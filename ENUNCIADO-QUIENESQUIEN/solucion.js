console.log(codigoPersonaBuscada);

let listaPreguntas = [
  "Tiene gafas",
  "Es un hombre",
  "Tiene bigote",
  "Tiene pelo en la cara",
  "Tiene pelo largo",
];

let listaPreguntasRealizadas = [];

onload = function () {
  cargarDesplegablePreguntas();
  cargarTablaPersonas();

  let btnIntentar = document.querySelector("#btnIntentar");

  btnIntentar.addEventListener("click", function () {
    realizarIntento();
  });

  localStorage.removeItem("errores");

  let desplegablePreguntas = document.querySelectorAll(
    "#divPreguntas select"
  )[1];

  desplegablePreguntas.addEventListener("change", function () {
    responderPreguntas(desplegablePreguntas.value);
  });

  let intervaloAumentarImagenesValidas = setInterval(
    aumentarImagenesValidas,
    5000
  );
};

function cargarDesplegablePreguntas() {
  let desplegablePreguntas = document.querySelectorAll(
    "#divPreguntas select"
  )[1];

  listaPreguntas.forEach((element) => {
    desplegablePreguntas.innerHTML += `
              <option>${element}</option>
          `;
  });
}

function cargarTablaPersonas() {
  let listaPersonasOrdenada = listaPersonas.sort((a, b) =>
    a.Nombre.localeCompare(b.Nombre)
  );

  let tablaDivTablero = [...document.querySelectorAll("#divTablero td")];

  tablaDivTablero.forEach((element, index) => {
    element.innerHTML = `
        <img src="./imagenes/${listaPersonasOrdenada[index].Foto}" alt="${listaPersonasOrdenada[index].Nombre}" width="75" height="75">
        <p>${listaPersonasOrdenada[index].Nombre}</p>
        `;
    element.addEventListener("click", function (event) {
      mostrarDatosPersona(event.currentTarget);
    });
  });
}

function mostrarDatosPersona(event) {
  let nombre = event.querySelector("p").textContent;
  let posicion = listaPersonas.findIndex(
    (persona) => persona.Nombre === nombre
  );
  let imagen = event.querySelector("img").src;
  let partes = imagen.split("/");

  // Obtener las dos últimas partes de la URL
  let ultimasDosPartes = partes.slice(-2);

  // Unir las dos últimas partes con una barra "/"
  let resultado = ultimasDosPartes.join("/");

  if (posicion != -1 && resultado != "imagenes/novale.png") {
    let divDatosPersona = document.querySelector("#divDatosPersona");
    if (listaPersonas[posicion].EsHombre === "y") {
      divDatosPersona.querySelector("input[value='y']").checked = "checked";
    } else {
      divDatosPersona.querySelector("input[value='n']").checked = "checked";
    }

    let campoNombre = divDatosPersona.querySelector("#txtNombre");
    campoNombre.value = listaPersonas[posicion].Nombre;

    let campoFechaNacimiento = divDatosPersona.querySelector(
      "#txtFechaNacimiento"
    );
    campoFechaNacimiento.value = listaPersonas[posicion].FechaNacimiento;

    let campoColorPelo = divDatosPersona.querySelector("#txtColorPelo");
    campoColorPelo.value = listaPersonas[posicion].ColorPelo;
  }
}

function realizarIntento() {
  let campoNombre = document.querySelector("#txtNombre").value;
  let posicion = listaPersonas.findIndex(
    (persona) => persona.Nombre === campoNombre
  );

  if (posicion != -1) {
    if (listaPersonas[posicion].Codigo == codigoPersonaBuscada) {
      location.href = "preguntasRealizadas.html";
    } else {
      let erroresJSON = localStorage.getItem("errores");
      let errores = JSON.parse(erroresJSON) || [];
      let nuevoError = {
        Codigo: listaPersonas[posicion].Codigo,
        Nombre: listaPersonas[posicion].Nombre,
        Foto: listaPersonas[posicion].Foto,
        FechaNacimiento: listaPersonas[posicion].FechaNacimiento,
        EsHombre: listaPersonas[posicion].EsHombre,
        ColorPelo: listaPersonas[posicion].ColorPelo,
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    }
  }
}

function responderPreguntas(pregunta) {
  let posicion = listaPersonas.findIndex(
    (persona) => persona.Codigo == codigoPersonaBuscada
  );

  let todasLasImagenes = document.querySelectorAll("#divTablero img");

  let listaPersonasOrdenada = listaPersonas.sort((a, b) =>
    a.Nombre.localeCompare(b.Nombre)
  );

  let erroresJSON = localStorage.getItem("errores");
  let errores = JSON.parse(erroresJSON) || [];

  if (posicion != -1) {
    if (pregunta == "Tiene gafas") {
      alert(listaPersonas[posicion].TieneGafas);
      listaPersonasOrdenada.forEach((element, index) => {
        if (element.TieneGafas != listaPersonas[posicion].TieneGafas) {
          todasLasImagenes[index].src = "./imagenes/novale.png";
        }
      });

      let nuevoError = {
        PreguntaRealizada: "Tiene gafas",
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    } else if (pregunta == "Es un hombre") {
      alert(listaPersonas[posicion].EsHombre);
      listaPersonasOrdenada.forEach((element, index) => {
        if (element.EsHombre != listaPersonas[posicion].EsHombre) {
          todasLasImagenes[index].src = "./imagenes/novale.png";
        }
      });

      let nuevoError = {
        PreguntaRealizada: "Es un hombre",
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    } else if (pregunta == "Tiene bigote") {
      alert(listaPersonas[posicion].TieneBigote);
      listaPersonasOrdenada.forEach((element, index) => {
        if (element.TieneBigote != listaPersonas[posicion].TieneBigote) {
          todasLasImagenes[index].src = "./imagenes/novale.png";
        }
      });

      let nuevoError = {
        PreguntaRealizada: "Tiene bigote",
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    } else if (pregunta == "Tiene pelo en la cara") {
      alert(listaPersonas[posicion].TienePeloCara);
      listaPersonasOrdenada.forEach((element, index) => {
        if (element.TienePeloCara != listaPersonas[posicion].TienePeloCara) {
          todasLasImagenes[index].src = "./imagenes/novale.png";
        }
      });

      let nuevoError = {
        PreguntaRealizada: "Tiene pelo en la cara",
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    } else if (pregunta == "Tiene pelo largo") {
      alert(listaPersonas[posicion].TienePeloLargo);
      listaPersonasOrdenada.forEach((element, index) => {
        if (element.TienePeloLargo != listaPersonas[posicion].TienePeloLargo) {
          todasLasImagenes[index].src = "./imagenes/novale.png";
        }
      });

      let nuevoError = {
        PreguntaRealizada: "Tiene pelo largo",
      };
      errores.push(nuevoError);
      localStorage.setItem("errores", JSON.stringify(errores));
    }
  }
}

function aumentarImagenesValidas() {
  let todasLasImagenes = document.querySelectorAll("#divTablero img");
  let contador = 0; // Mover la declaración de contador aquí

  function procesarImagen() {
    let imagen = todasLasImagenes[contador].src;
    let partes = imagen.split("/");

    // Obtener las dos últimas partes de la URL
    let ultimasDosPartes = partes.slice(-2);

    // Unir las dos últimas partes con una barra "/"
    let resultado = ultimasDosPartes.join("/");

    if (resultado !== "imagenes/novale.png") {
      contador++;
      procesarImagen(); // Cambiar a procesarImagen()
    } else {
      todasLasImagenes[contador].height = "100";
      todasLasImagenes[contador].width = "100";
    }

    if (contador === todasLasImagenes.length) {
      clearInterval(intervaloAumentarImagenesValidas);
    }
  }

  procesarImagen(); // Llamar a la función después de asignar el intervalo
}
