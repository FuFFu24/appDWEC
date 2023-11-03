// Definición del constructor Coche
function Coche(
  identificador,
  marca,
  combustible,
  caballos,
  precio,
  color,
  extras,
  numpuertas
) {
  this.identificador = identificador;
  this.marca = marca;
  this.combustible = combustible;
  this.caballos = caballos;
  this.precio = precio;
  this.color = color;
  this.extras = extras;
  this.numpuertas = numpuertas;
}

// Definición del constructor Empleado
function Empleado(nombre, apellidos, fechaNacimiento, nif) {
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.fechaNacimiento = fechaNacimiento;
  this.nif = nif;
}

// Definición del constructor Concesionario
function Concesionario(nombre, direccion, nif, telefono) {
  this.nombre = nombre;
  this.direccion = direccion;
  this.nif = nif;
  this.telefono = telefono;
  this.empleados = [];
  this.coches = [];

  // Método para agregar un nuevo empleado al concesionario
  this.nuevoEmpleado = function () {
    const nombre = prompt("Nombre del nuevo empleado:");
    const apellidos = prompt("Apellidos del nuevo empleado:");
    const fechaNacimiento = prompt(
      "Fecha de nacimiento del nuevo empleado (YYYY-MM-DD):"
    );
    const nif = prompt("NIF del nuevo empleado:");

    const nuevoEmpleado = new Empleado(nombre, apellidos, fechaNacimiento, nif);
    this.empleados.push(nuevoEmpleado);
    console.log(
      `Nuevo empleado "${nombre} ${apellidos}" ha sido añadido al concesionario.`
    );
  };

  // Método para agregar un nuevo coche al concesionario
  this.nuevoCoche = function () {
    const identificador = prompt("Identificador del nuevo coche:");
    const marca = prompt("Marca del nuevo coche:");
    const combustible = prompt("Combustible del nuevo coche:");
    const caballos = prompt("Caballos del nuevo coche:");
    const precio = prompt("Precio del nuevo coche:");
    const color = prompt("Color del nuevo coche:");
    const extras = prompt("Extras del nuevo coche:");
    const numpuertas = prompt("Número de puertas del nuevo coche:");

    const nuevoCoche = new Coche(
      identificador,
      marca,
      combustible,
      caballos,
      precio,
      color,
      extras,
      numpuertas
    );
    this.coches.push(nuevoCoche);
    console.log(`Nuevo coche "${marca}" ha sido añadido al concesionario.`);
  };

  // Método para eliminar un coche del concesionario por identificador
  this.eliminarCoche = function (identificador) {
    const index = this.coches.findIndex(
      (coche) => coche.identificador === identificador
    );
    if (index !== -1) {
      const cocheEliminado = this.coches.splice(index, 1)[0];
      console.log(
        `Coche "${cocheEliminado.marca}" ha sido eliminado del concesionario.`
      );
    } else {
      console.log("Coche no encontrado en el concesionario.");
    }
  };

  // Método para mostrar la flota de coches en una nueva ventana
  this.muestraCoches = function () {
    const flotaCochesDiv = document.getElementById("flotaCoches");
    if (!flotaCochesDiv) {
      console.log("Elemento HTML 'flotaCoches' no encontrado.");
      return;
    }

    flotaCochesDiv.innerHTML = "<h1>Flota de Coches</h1>";

    if (this.coches.length === 0) {
      flotaCochesDiv.innerHTML += "<p>No hay coches en el concesionario.</p>";
    } else {
      flotaCochesDiv.innerHTML += "<table border='1'>";
      flotaCochesDiv.innerHTML +=
        "<tr><th>Identificador</th><th>Marca</th><th>Precio</th></tr>";

      this.coches.forEach((coche) => {
        flotaCochesDiv.innerHTML += `<tr><td>${coche.identificador}</td><td>${coche.marca}</td><td>${coche.precio}</td></tr>`;
      });

      flotaCochesDiv.innerHTML += "</table>";
    }
  };
}

// Ejemplo de uso:
const miConcesionario = new Concesionario(
  "Mi Concesionario",
  "Calle Principal 123",
  "12345678A",
  "123-456-789"
);

// Agregar un empleado al concesionario
miConcesionario.nuevoEmpleado();

// Agregar un coche al concesionario
miConcesionario.nuevoCoche();

// Eliminar un coche del concesionario por identificador
miConcesionario.eliminarCoche("ABC123");

// Mostrar la flota de coches en una nueva ventana
miConcesionario.muestraCoches();
