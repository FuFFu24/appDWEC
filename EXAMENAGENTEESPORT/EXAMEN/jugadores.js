var listaJugadores=[
  {
    "nombre":"Pedro",
    "apellidos":"Gomez Borrero",
    "nif":"12345678C",
    "correo":"pedro@gmail.com",
    "comentarios":"Timido"
  },{
    "nombre":"Pablo",
    "apellidos":"Gomez Borrero",
    "nif":"22345678C",
    "correo":"pablo@gmail.com",
    "comentarios":"Muy joven"
  },{
    "nombre":"Pilar",
    "apellidos":"Perez Borrero",
    "nif":"33345678C",
    "correo":"pilar@gmail.com",
    "comentarios":"hay que hablar con ella"
  },{
    "nombre":"Patricia",
    "apellidos":"Lopez Borrero",
    "nif":"44445678C",
    "correo":"patricia@gmail.com",
    "comentarios":""
  },{
    "nombre":"Paloma",
    "apellidos":"Lopez Borrero",
    "nif":"4444555C",
    "correo":"paloma@gmail.com",
    "comentarios":""
  },{
    "nombre":"Antonio",
    "apellidos":"Lopez Borrero",
    "nif":"45555678C",
    "correo":"antonio@gmail.com",
    "comentarios":""
  },{
    "nombre":"Jesus",
    "apellidos":"Perez Borrero",
    "nif":"94445678D",
    "correo":"jesus@gmail.com",
    "comentarios":""
  }
]

onload = () => {
  pintarLista();
}

function pintarLista() {
  const divCentral = document.getElementById("central");
  divCentral.innerHTML = "";
  listaJugadores.forEach(element => {
    const parrafo = document.createElement("p");
    const boton = document.createElement("button");
    parrafo.textContent = `${element.nombre} `;
    boton.textContent = "Borrar";
    boton.addEventListener("click", () => borrar(element.nif))
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