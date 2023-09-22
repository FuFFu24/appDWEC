// hola

var sum=0,cont=0,num;

num=prompt("Escribe un valor (666 para salir)")

while (num!=666) {
    
    sum+=parseInt(num)
    cont++
    num=prompt("Escribe otro valor (666 para salir)")

}

document.body.innerHTML+=`<p>Suma total: ${sum}</p>`
document.body.innerHTML+=`<p>Valores introducidos: ${cont}</p>`