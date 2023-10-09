// a nivel de instancia
function Gas(volumen, moles, temperatura){
this.volumen = volumen;
this.moles = moles;
this.temperatura = temperatura;
this.calcularPresion = function(){
return this.moles * this.temperatura * 8.314 / this.volumen;
}
}
var miGas = new Gas();
Object.defineProperty(miGas,'temperaturaCelsius',{get: function(){return this.temperatura - 273;},
    set: function(valor){this.temperatura = valor +273;}});
miGas.volumen = 1;
miGas.moles = 1;
miGas.temperaturaCelsius = 20;
alert(miGas.temperatura);


// a nivel de toda la clase
function Gas(volumen, moles, temperatura){
this.volumen = volumen;
this.moles = moles;
this.temperatura = temperatura;
this.calcularPresion = function(){
return this.moles * this.temperatura * 8.314 / this.volumen;
}
}
var miGas = new Gas();
Gas.prototype.__defineSetter__("temperaturaCelsius", function(x) { this.temperatura = x + 273;});
miGas.volumen = 1;
miGas.moles = 1;
miGas.temperaturaCelsius = 20;
alert(miGas.temperatura);
