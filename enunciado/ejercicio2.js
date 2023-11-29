document.addEventListener("DOMContentLoaded", function () {
  const listaVinilos = [
    "25996_1.jpg",
    "25996_2.jpg",
    "25997_1.jpg",
    "25997_3.jpg",
    "26650_3.jpg",
    "26704_3.jpg",
    "26868_1.jpg",
    "26868_2.jpg",
    "26869_1.jpg",
    "26869_2.jpg",
    "26873_1.jpg",
  ];
  const listaLaminas = [
    "26873_2.jpg",
    "27095_3.jpg",
    "27356_3.jpg",
    "27429_1.jpg",
    "27429_2.jpg",
    "27773_3.jpg",
    "28155_1.jpg",
    "28155_2.jpg",
    "28192_3.jpg",
    "28192_4.jpg",
    "29776_3.jpg",
  ];
  const listaOtros = [
    "30390_3.jpg",
    "30473_1.jpg",
    "31386_1.jpg",
    "31386_2.jpg",
    "31469_3.jpg",
  ];
  const listaTodos = [...listaVinilos, ...listaLaminas, ...listaOtros];

  const divExposicion = document.getElementById("exposicion");

  function mostrarTodosCuadros(lista) {
    divExposicion.innerHTML = "";
    const tabla = document.createElement("table");
    let tr;

    lista.forEach((element, index) => {
      if (index % 4 === 0) {
        tr = document.createElement("tr");
        tabla.appendChild(tr);
      }

      const td = document.createElement("td");
      td.innerHTML = `
          <img src="pagina2_files/${element}" alt="...">
        <br>
          <button type="button" class="contratar">CONTRATAR</button>
          <button type="button" class="alquilar">ALQUILAR</button>
        <br>
          <label for="cantidad">CANTIDAD:</label>
          <input type="number" name="cantidad" id="cantidad">
        <br>
          <label for="duracion">DURACION:</label>
          <select name="duracion" id="duracion">
            <option value="Escoge">Escoge</option>
            ${valoresSelect()}
          </select>
      `;
      tr.appendChild(td);

      const btnContratar = td.querySelector(".contratar");
      const btnAlquilar = td.querySelector(".alquilar");

      btnContratar.addEventListener("click", function (event) {
        const imagen = element;
        const cantidad =
          event.target.nextSibling.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.nextSibling.nextSibling.value;
        const operacion = event.target.innerText;

        if (imagen && cantidad) {
          if (!isNaN(cantidad) && cantidad > 0) {
            let comprasJSON = localStorage.getItem("compras");
            let compras = JSON.parse(comprasJSON) || [];

            let nuevaCompra = {
              foto: imagen,
              cantidad: cantidad,
              operacion: operacion,
            };

            compras.push(nuevaCompra);

            localStorage.setItem("compras", JSON.stringify(compras));

            const cantidadCaja =
              event.target.nextSibling.nextSibling.nextSibling.nextSibling
                .nextSibling.nextSibling.nextSibling.nextSibling;

            cantidadCaja.style.display = "none";

            btnContratar.disabled = "true";
          }
        }
      });

      btnAlquilar.addEventListener("click", function (event) {
        const imagen = event.target.parentNode.children[0].src.split("/")[5];
        console.log(imagen);
        const cantidad =
          event.target.nextSibling.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.value;
        const duracion =
          event.target.nextSibling.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.nextSibling.value;
            console.log(duracion);
        const operacion = event.target.innerText;

        if (imagen && cantidad && duracion) {
          if (!isNaN(cantidad) && cantidad > 0 && duracion !== "Escoge") {
            let comprasJSON = localStorage.getItem("compras");
            let compras = JSON.parse(comprasJSON) || [];

            let nuevaCompra = {
              foto: imagen,
              cantidad: cantidad,
              duracion: duracion,
              operacion: operacion,
            };

            compras.push(nuevaCompra);

            localStorage.setItem("compras", JSON.stringify(compras));

            const td = event.target.parentNode;

            while (td.firstChild) {
              td.removeChild(td.firstChild);
            }
          }
        }
      });
    });

    divExposicion.appendChild(tabla);
  }

  function valoresSelect() {
    let options = "";
    for (let i = 1; i <= 20; i++) {
      options += `<option value="${i}">${i}</option>`;
    }
    return options;
  }

  mostrarTodosCuadros(listaTodos);

  const selectFiltrarCuadros = document.querySelector("#central select");

  selectFiltrarCuadros.addEventListener("change", () => {
    if (selectFiltrarCuadros.value === "Vinilos") {
      mostrarTodosCuadros(listaVinilos);
    } else if (selectFiltrarCuadros.value === "Laminas") {
      mostrarTodosCuadros(listaLaminas);
    } else if (selectFiltrarCuadros.value === "Otros") {
      mostrarTodosCuadros(listaOtros);
    } else {
      mostrarTodosCuadros(listaTodos);
    }
  });

  const verCompras = document.querySelectorAll("#derecha a")[0];
  const verTodas = document.querySelectorAll("#derecha a")[2];

  verCompras.addEventListener("click", function () {
    const ventana = window.open(
      "compras",
      "compras",
      "width= 600px, height= 600px"
    );
    let comprasJSON = localStorage.getItem("compras");
    let compras = JSON.parse(comprasJSON) || [];
    ventana.document.write(`
      <h1>COMPRAS</h1>
      <table>
      <tr><th>IMAGEN<th><th>OPERACION<th><th>CANTIDAD<th></tr>
    `);
    compras.forEach((element) => {
      if (element.operacion == "CONTRATAR") {
        ventana.document.write(`
      <tr><td>${element.foto}<td><td>${element.cantidad}<td><td>${element.operacion}<td></tr>
    `);
      }
    });
    ventana.document.write(`
    </table>
    <button onclick="window.close()">CERRAR</button>
  `);
  });

  verTodas.addEventListener("click", function () {
    const ventana = window.open(
      "todas",
      "todas",
      "width= 600px, height= 600px"
    );
    let comprasJSON = localStorage.getItem("compras");
    let compras = JSON.parse(comprasJSON) || [];
    ventana.document.write(`
      <h1>COMPRAS</h1>
      <table>
      <tr><th>IMAGEN<th><th>OPERACION<th><th>DURACION<th><th>CANTIDAD<th></tr>
    `);
    compras.forEach((element) => {
      if (element.duracion) {
        ventana.document.write(`
      <tr><td>${element.foto}<td><td>${element.cantidad}<td><td>${element.duracion}<td><td>${element.operacion}<td></tr>
    `);
      } else {
        ventana.document.write(`
      <tr><td>${element.foto}<td><td>${element.cantidad}<td><td><td><td>${element.operacion}<td></tr>
    `);
      }
    });
    ventana.document.write(`
    </table>
    <button onclick="window.close()">CERRAR</button>
  `);
  });

  /* En la capa “publicidad” se  mostrará lentamente durante 3 segundos una de las imágenes de cuadro. Después,  la imagen se animará haciéndose 
  100 pixeles más grande y se moverá 100pixeles a la derecha durante 5 segundos. Finalmente la imagen se ocultará lentamente durante 4 segundos */

  const publicidad = $("#publicidad");

// Clonar la primera imagen y agregarla a la capa de publicidad
const imagen = $("img:first").clone().appendTo(publicidad);

// Mostrar lentamente durante 3 segundos
imagen.fadeIn(3000, function() {
  // Animar el tamaño y la posición durante 5 segundos
  imagen.animate({
    position: "relative",
    left: "+=100px",
  }, 5000, function() {
    // Ocultar lentamente durante 4 segundos al finalizar la animación
    imagen.fadeOut(4000);
  });
});

});
