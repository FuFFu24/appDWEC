function alertMUYGRANDE() {
    let cajaTexto1=document.getElementById('frase1');
    if (cajaTexto1.value.trim().length>20) {
        // alert("MUY GRANDE");
        cajaTexto1.style.border = "2px solid red";
        document.getElementById('errorFrase1').style.display='block';
    } else {
        cajaTexto1.style.border = "1px solid grey";
        document.getElementById('errorFrase1').style.display='none';
    }
}

function aprobado(/* textoAProbar */) {
    let cajaTexto1=document.getElementById('frase2').value;
    let palabras=cajaTexto1.split(/\s+/);
    let cont=0;
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i]=='aprobado') {
            cont ++;
        }
    }
    if (cont!=0) {
        alert('la caja frase2 contiene el texto "aprobado"');
    } else {
        alert('la caja frase2 no contiene el texto "aprobado"');
    }

    /* if (cajaTexto1.includes(textoAProbar)) {
        alert('la caja frase2 contiene el texto "aprobado"');
    } */
}

function posicionAdo() {
    let cajaTexto1 = document.getElementById('frase1').value;
    if (cajaTexto1.indexOf("ado") != (-1)) {
        alert('Aparece por ultima vez en la posicion '+(cajaTexto1.lastIndexOf("ado")+3))
    } else {
        alert('NO APARECE')
    }
}

function vecesAprobado() {
    let cajaTexto1 = document.getElementById('frase1').value
    let palabras=cajaTexto1.split(/\s+/);
    let cont=0;
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i]=='aprobado') {
            cont ++;
        }
    }
    if (cont!=0) {
        alert('la caja frase1 contiene el texto "aprobado" '+cont+' veces.');
    } else {
        alert('la caja frase1 no contiene el texto "aprobado"');
    }
}

function devolverCaracter() {
    let cajaTexto1 = document.getElementById('frase1').value;
    alert(cajaTexto1.substring(3,6));
    alert(cajaTexto1.substr(3,3));
    alert(cajaTexto1.slice(3,6));
}

function xyz() {
    let cajaTexto1 = document.getElementById('frase2').value;
    if (cajaTexto1.indexOf("xyz") != (-1)) {
        alert(cajaTexto1.substr(cajaTexto1.indexOf("xyz")+3,5));
        // alert(cajaTexto1.substring(cajaTexto1.indexOf("xyz")+3,cajaTexto1.indexOf("xyz")+8));
    } else {
        alert('No hay "xyz"');
    }
}

function dawDAW() {
    let cajaTexto1 = document.getElementById('frase2').value
    let fraseModificada = cajaTexto1.replace(/\bdaw\b/gi, 'DAW');
    document.getElementById('resultado').textContent = fraseModificada;
}

function toUpperCase() {
    let cajaTexto1 = document.getElementById('frase2').value
    alert(cajaTexto1.toUpperCase())
}

function toLowerCase() {
    let cajaTexto1 = document.getElementById('frase2').value
    alert(cajaTexto1.toLowerCase())
}

function caracterLinea() {
    let cajaTexto1 = document.getElementById('frase2').value
    let palabras = cajaTexto1.split('')
    let resultado = palabras.join('<br>')
    document.getElementById('resultado').innerHTML = resultado
}

function nombreLinea() {
    let cajaTexto1 = document.getElementById('frase2').value
    let palabras = cajaTexto1.split(/\s+/)
    let resultado = palabras.join('<br>')
    document.getElementById('resultado').innerHTML = resultado
}

function crearCheckbox() {
    let cajaTexto1 = document.getElementById('frase2').value;
    let palabras = cajaTexto1.split(',');
    let resultado = document.getElementById('resultado');

    // Limpiar el contenido existente en el elemento resultado
    resultado.innerHTML = '';

    for (let i = 0; i < palabras.length; i++) {
        // Crear un elemento de checkbox
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = palabras[i].trim(); // Eliminar espacios en blanco
        checkbox.id = palabras[i].trim(); // Identificador único

        // Crear una etiqueta (label) para el checkbox
        let label = document.createElement('label');
        label.textContent = palabras[i].trim();

        // Agregar el checkbox y la etiqueta al elemento resultado
        resultado.appendChild(checkbox);
        resultado.appendChild(label);
        resultado.appendChild(document.createElement('br'));
    }
}
