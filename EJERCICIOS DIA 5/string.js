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