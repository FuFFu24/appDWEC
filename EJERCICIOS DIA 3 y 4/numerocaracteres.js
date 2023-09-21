var texto=prompt("Introduce un texto");

if (texto.length<10) {
    document.body.innerHTML+=`<strong>${texto}</strong>`
} else if (texto.length>=10 && texto.length<=20) {
    document.body.innerHTML+=`<h1>${texto}</h1>`
} else if (texto.length>20) {
    document.body.innerHTML+=`<h1>${texto}</h1>`
}