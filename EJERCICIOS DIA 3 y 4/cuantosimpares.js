// Mostrar solo impares.
var lista=[9,54,98,2,7,3,11];
var cont=0;
var suma=0;
var listaImpares=[];

for (let i = 0; i < lista.length; i++) {
    if (lista[i]%2!=0) {
        document.body.innerHTML+=`<p>${lista[i]}</p>`
        cont++;
        listaImpares.push(lista[i]);
    }
    suma+=lista[i];
}

// Ordenar lista
listaImpares.sort((a,b)=>{if (a>b) {
    return -1
} else {
    return 1
}});

document.body.innerHTML+=`<p>Numero de impares: ${cont}</p>`
document.body.innerHTML+=`<p>Suma de todos: ${suma}</p>`
document.body.innerHTML+=`<p>Segundo numero impar por orden descendiente: ${listaImpares[1]}</p>`