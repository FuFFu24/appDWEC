var persona = {
nombre: "Juan",
apellido: "Gomez",
dni: "12345678A",
coche: {
        marca: "Seat",
        modelo: "Ibiza"
    },
presentar: function() {
        document.write("Me llamo " + this["nombre"] + " y tengo un " + this.coche.marca + " " + this.coche.modelo );
    }
};

alert(persona.nombre);
alert(persona["apellido"]);

persona.presentar();
