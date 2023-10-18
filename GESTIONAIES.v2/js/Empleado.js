class Empleado {
    constructor(dni, nombre, apellidos, edad, antiguedad, puesto, foto) {
        this.DNI = dni;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad || 18;
        this.antiguedad = antiguedad || "0";
        this.puesto = puesto || "becario";
        this.foto = foto || "img/icons8-editar-48.png";
    }
    cambiarFoto(foto) {
        this.foto = foto;
    }
}