function Gas(volumen, moles, temperatura){
this.volumen = volumen;
this.moles = moles;
this.temperatura = temperatura;
this.calcularPresion = function(){
return this.moles * this.temperatura * 8.314 / this.volumen;
}
}
var miGas = new Gas(1,1,80);

for (var propiedad in miGas) {
document.write(" Propiedad " + propiedad + " es igual a " + miGas[propiedad] + "<br>");
}
