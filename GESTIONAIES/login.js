var listaUsuarios=[];

function cargarUsuarios(){
	listaUsuarios.push(["Jaime","6j6W4bW0$g"],["Javier","4M8n0lGHZp"],["Jorge","Zf9s6W7E$U"],["Juan","G0z94bGgj@"],["Jacinto","o64W3V!T*K"]);
}

cargarUsuarios();

function comprobarUsuario(){
	var nombreUsuario = document.getElementById("usuario").value.trim();
	var claveUsuario = document.getElementById("clave").value;

	let posicion = listaUsuarios.findIndex((usuario) => usuario[0] == nombreUsuario);

	if (posicion != -1) {
		if (claveUsuario == listaUsuarios[posicion][1]) {
			location.href="aterrizaje.html";
		} else {
			alert("Usuario/clave incorrecto");
		}
	} else {
		alert("Usuario/clave incorrecto");
	}
	
}
