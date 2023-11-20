class Proyecto {
    constructor(idProyecto,
        idCliente,
        nombre,
        descripcion,
        imagen,
        fechaInicio,
        fechaFin) {
        this.idProyecto = idProyecto || "SIN_ID";
        this.idCliente = idCliente || "SIN_CLIENTE";
        this.nombre = nombre || "SIN NOMBRE";
        this.descripcion = descripcion || "";
        this.fechaInicio = fechaInicio || new Date();
        if (fechaFin) {
            this.fechaFin = fechaFin;
        } else {
            this.fechaFin = new Date();
            this.fechaFin.setDate(5 + this.fechaFin.getDate());
        }
        this.estado = "Previo";
        this.imagen = imagen;
    }
    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
    mostrarFechaInicio() {
        return this.fechaInicio.getDate() + "/" +
            (this.fechaInicio.getMonth() + 1) + "/" +
            this.fechaInicio.getFullYear();
    }
}