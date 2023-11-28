document.addEventListener("DOMContentLoaded", function () {
  const divCentral = document.getElementById("central");

  function mostrarListaContratados() {
    divCentral.innerHTML = "";
    let contratosLS = localStorage.getItem("contratos");
    let contratos = JSON.parse(contratosLS) || [];

    contratos.forEach((element) => {
      divCentral.innerHTML += `${element.equipo} - Importe: ${element.importeAnual} - Porcentaje: ${element.porcentajeAgente}<br>`;
    });
  }

  mostrarListaContratados();
});
