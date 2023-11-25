document.addEventListener("DOMContentLoaded", function () {
  var equipos = [
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
  var imagenesEquipos = [
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

  var anuncioDiv = document.getElementById("anuncio");
  var index = 0;
  var jugadoresModificados = []; // Almacenar los jugadores modificados

  function cambiarImagen() {
    // Cambiar la imagen cada 3 segundos
    anuncioDiv.innerHTML =
      "<p><img src='imagenes/" + imagenesEquipos[index] + "'></p>";
    index = (index + 1) % imagenesEquipos.length;
  }

  // Cargar la primera imagen al cargar la página
  cambiarImagen();

  // Cambiar la imagen cada 3 segundos
  setInterval(cambiarImagen, 3000);

  // Obtener el enlace "Jugadores" del menú
  var jugadoresLink = document.querySelector("nav ul li:nth-child(2) a"); // Asumiendo que "Jugadores" es el segundo enlace

  // Agregar un evento al hacer clic en el enlace "Jugadores"
  jugadoresLink.addEventListener("click", function () {
    // Limpiar el contenido del div "central"
    document.getElementById("central").innerHTML = "";

    // Crear el desplegable de jugadores
    var jugadoresSelect = document.createElement("select");
    jugadoresSelect.innerHTML = "<option>Escoge un jugador</option>";

    // Agregar opciones al desplegable con los apellidos y nombre de todos los jugadores
    listaJugadores.forEach(function (jugador) {
      var option = document.createElement("option");
      option.value = jugador.nif;
      option.textContent = jugador.apellidos + " " + jugador.nombre;
      jugadoresSelect.appendChild(option);
    });

    // Agregar el desplegable al div "central"
    document.getElementById("central").appendChild(jugadoresSelect);

    // Agregar evento al cambio de selección en el desplegable
    jugadoresSelect.addEventListener("change", function () {
      // Obtener el jugador seleccionado
      var jugadorSeleccionado = listaJugadores.find(function (jugador) {
        return jugador.nif === jugadoresSelect.value;
      });

      // Limpiar el contenido del div "central"
      document.getElementById("central").innerHTML = "";

      // Crear cajas de texto con los datos del jugador seleccionado
      var nombreInput = document.createElement("input");
      nombreInput.type = "text";
      nombreInput.value = jugadorSeleccionado.nombre;
      nombreInput.name = "nombre";
      document.getElementById("central").appendChild(nombreInput);

      var apellidosInput = document.createElement("input");
      apellidosInput.type = "text";
      apellidosInput.value = jugadorSeleccionado.apellidos;
      apellidosInput.name = "apellidos";
      document.getElementById("central").appendChild(apellidosInput);

      var correoInput = document.createElement("input");
      correoInput.type = "text";
      correoInput.value = jugadorSeleccionado.correo;
      correoInput.name = "correo";
      document.getElementById("central").appendChild(correoInput);

      var comentariosInput = document.createElement("input");
      comentariosInput.type = "text";
      comentariosInput.value = jugadorSeleccionado.comentarios;
      comentariosInput.name = "comentarios";
      document.getElementById("central").appendChild(comentariosInput);

      // Crear botones Guardar y Borrar
      var guardarButton = document.createElement("button");
      guardarButton.textContent = "Guardar";
      guardarButton.addEventListener("click", function () {
        // Actualizar los datos del jugador en la lista de jugadores modificados
        var jugadorModificado = {
          nif: jugadorSeleccionado.nif,
          nombre: document.getElementsByName("nombre")[0].value,
          apellidos: document.getElementsByName("apellidos")[0].value,
          correo: document.getElementsByName("correo")[0].value,
          comentarios: document.getElementsByName("comentarios")[0].value,
        };

        // Agregar el jugador modificado a la lista
        var index = jugadoresModificados.findIndex(function (j) {
          return j.nif === jugadorModificado.nif;
        });

        if (index !== -1) {
          // Si ya estaba en la lista, actualizarlo
          jugadoresModificados[index] = jugadorModificado;
        } else {
          // Si no estaba en la lista, agregarlo
          jugadoresModificados.push(jugadorModificado);
        }

        // Actualizar la lista de jugadores original
        listaJugadores = listaJugadores.map(function (j) {
          return j.nif === jugadorModificado.nif ? jugadorModificado : j;
        });

        // Limpiar el contenido del div "central"
        document.getElementById("central").innerHTML = "";
      });

      var borrarButton = document.createElement("button");
      borrarButton.textContent = "Borrar";
      borrarButton.addEventListener("click", function () {
        // Eliminar el jugador de la lista de jugadores modificados
        jugadoresModificados = jugadoresModificados.filter(function (j) {
          return j.nif !== jugadorSeleccionado.nif;
        });

        // Actualizar la lista de jugadores original
        listaJugadores = listaJugadores.filter(function (j) {
          return j.nif !== jugadorSeleccionado.nif;
        });

        // Limpiar el contenido del div "central"
        document.getElementById("central").innerHTML = "";
      });

      // Agregar botones al div "central"
      document.getElementById("central").appendChild(guardarButton);
      document.getElementById("central").appendChild(borrarButton);
    });
  });
});
