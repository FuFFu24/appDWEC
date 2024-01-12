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

  if (posicion != -1) {
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
