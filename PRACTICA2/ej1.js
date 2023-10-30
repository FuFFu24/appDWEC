var listaCiudades = [];
var ciudad0 = new Array(
  "MADRID",
  "34ESPA&Ntilde;A",
  756,
  890,
  "CAPITAL DEL PAIS CON UNA GRAN CANTIDAD DE MUSEOS",
  "madrid.gif"
);
var ciudad1 = new Array(
  "BARCELONA",
  "34ESPA&Ntilde;A",
  236,
  1190,
  "CIUDAD COSTERA DEL MEDITERRANEO.",
  "barcelona.gif"
);
var ciudad2 = new Array(
  "VALENCIA",
  "34ESPA&Ntilde;A",
  324,
  650,
  "CAPITAL COSTERA. CIUDAD DE LAS ARTES Y LAS CIENCIAS",
  "valencia.gif"
);
var ciudad3 = new Array(
  "LISBOA",
  "33PORTUGAL",
  756,
  890,
  "CAPITAL DEL PAIS. CIUDAD COSTERA ATLANTICO",
  "lisboa.gif"
);
var ciudad4 = new Array(
  "PARIS",
  "31FRANCIA",
  1556,
  2890,
  "CAPITAL DEL PAIS CON UNA GRAN CANTIDAD DE MUSEOS",
  "paris.gif"
);
var ciudad5 = new Array(
  "LONDRES",
  "3OREINO UNIDO",
  2256,
  3890,
  "CAPITAL DEL PAIS. MUSEOS. BIG BEN",
  "londres.gif"
);
var ciudad6 = new Array(
  "BERLIN",
  "35ALEMANIA",
  1234,
  4890,
  "CAPITAL DEL PAIS. ZOO.AVENIDAS",
  "berlin.gif"
);
var ciudad7 = new Array(
  "BERNA",
  "36SUIZA",
  6345,
  990,
  "CAPITAL DEL PAIS.MUSEOS, RESTAURANTES, PARQUES",
  "berna.gif"
);
var ciudad8 = new Array(
  "ROMA",
  "37ITALIA",
  956,
  1190,
  "CAPITAL DEL PAIS. HISTORIA. MUSEOS. IGLESIAS",
  "roma.gif"
);
var ciudad9 = new Array(
  "AMSTERDAM",
  "38HOLANDA",
  2756,
  1190,
  "CAPITAL DEL PAIS. ",
  "amsterdam.gif"
);
var ciudad10 = new Array(
  "VIENA",
  "39AUSTRIA",
  1756,
  1290,
  "CAPITAL DEL PAIS. OPERA. MUSEOS.",
  "viena.gif"
);
var ciudad11 = new Array(
  "BRUSELAS",
  "40BELGICA",
  1056,
  5890,
  "CAPITAL DEL PAIS. PUERTO.",
  "bruselas.gif"
);
var ciudad12 = new Array(
  "COPENAGUE",
  "41DINAMARCA",
  1556,
  6890,
  "CAPITAL DEL PAIS CON UNA GRAN CANTIDAD DE MUSEOS",
  "copenague.gif"
);
var ciudad13 = new Array(
  "OSLO",
  "42NORUEGA",
  856,
  880,
  "CAPITAL DEL PAIS. PAISAJES.",
  "oslo.gif"
);
listaCiudades[0] = ciudad0;
listaCiudades.push(ciudad1);
listaCiudades.push(ciudad2);
listaCiudades.push(ciudad3);
listaCiudades.push(ciudad4);
listaCiudades.push(ciudad5);
listaCiudades.push(ciudad6);
listaCiudades.push(ciudad7);
listaCiudades.push(ciudad8);
listaCiudades.push(ciudad9);
listaCiudades.push(ciudad10);
listaCiudades.push(ciudad11);
listaCiudades.push(ciudad12);
listaCiudades.push(ciudad13);

function cargarTabla(lista) {
  const tablaCiudades = document.querySelector("#tablaCiudades");
  tablaCiudades.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.style.border = "2px solid black";
  tabla.innerHTML = `
    <tr>
        <th></th>
        <th>CIUDAD</th>
        <th>PAIS</th>
        <th>DISTANCIA</th>
        <th>PRECIO</th>
        <th>DESCRIPCION</th>
    </tr>
`;

  lista.forEach((element) => {
    tabla.innerHTML += `
        <tr>
            <td><input type="text" name="cajaTexto" id="cajaTexto" style="width: 10px"></td>
            <td>${element[0]}</td>
            <td>${element[1].slice(2)}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4].substr(0, 20)}</td>
        </tr>
    `;
  });

  tablaCiudades.appendChild(tabla);
}

function ordenarPorNombre() {
  listaCiudades.sort((a, b) => a[0].localeCompare(b[0]));
  cargarTabla(listaCiudades);
}

function ordenarPorPrecioAsc() {
  listaCiudades.sort((a, b) => a[3] - b[3]);
  cargarTabla(listaCiudades);
}

function ordenarPorPrecioDesc() {
  listaCiudades.sort((a, b) => b[3] - a[3]);
  cargarTabla(listaCiudades);
}

function filtrar(params) {
  if (params == "precio") {
    let seleccion = document.querySelector("#precio").value;
    if (seleccion == 1) {
      let listaCiudadesMenos1000 = listaCiudades.filter((a) => a[3] < 1000);
      cargarTabla(listaCiudadesMenos1000);
    } else if (seleccion == 2) {
      let listaCiudades1000y2000 = listaCiudades.filter(
        (a) => a[3] >= 1000 && a[3] <= 2000
      );
      cargarTabla(listaCiudades1000y2000);
    } else if (seleccion == 3) {
      let listaCiudadesMas2000 = listaCiudades.filter((a) => a[3] > 2000);
      cargarTabla(listaCiudadesMas2000);
    }
  } else if (params == "distancia") {
  } else if (params == "pais") {
  }
}

window.onload = function () {
  cargarTabla(listaCiudades);
};
