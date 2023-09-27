/* var listaUsuarios = ["Juan","Jaime","Jorge","Jose","Jacinto"]

// LENGTH
console.log(listaUsuarios.length)
//PUSH - añade al final
listaUsuarios.push("Javier")
console.log(listaUsuarios)
//POP - elimina el ultimo
listaUsuarios.pop
console.log(listaUsuarios)
//SHIFT - elimina el primero
//UNSHIFT - añade al principio
//SPLICE - si pones 0 añade en la posicion indicada, si pones 1 quita 1 en la posicion indicada
// si pones 2 quita 2 en la posicion indicada
listaUsuarios.splice(2,1)
listaUsuarios.splice(2,0,"Juanito") */

var listaGrupos = [];

listaGrupos.push(["Quevedo","Español","Regueton"]);
listaGrupos.push(["Melendri","Canario","Pop"]);
listaGrupos.push(["Don Omar","Latino","Bals"]);
listaGrupos.push(["Plex","Guiri","Rock"]);
listaGrupos.push(["Conejo Malo","Filipino","Romantico"]);
listaGrupos.push(["Maluma","Mejicano","Regueton"]);

onload = function () {
    pintarSelect();
}

function anadir() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    let paisGrupo = document.getElementById("pais").value.trim();
    let tipoGrupo = document.getElementById("tipo").value.trim();
    listaGrupos.push([nombreGrupo,paisGrupo,tipoGrupo])
    pintarSelect()
}

function eliminarUlt() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    listaGrupos.pop();
    pintarSelect()
}

function eliminarPri() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    listaGrupos.shift();
    pintarSelect()
}

function eliminar() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    // let posicion = listaGrupos.indexOf(nombreGrupo)
    let posicion = listaGrupos.findIndex((grupo)=> // Si pones la 'e' te borra el primer 
        grupo.toLowerCase().includes(nombreGrupo) // nombre que tenga 'e'
    );
    if (posicion != -1) {
        listaGrupos.splice(posicion,1)
    }
    pintarSelect()
}

function ordenarPorNombreDes() {
    listaGrupos.sort((a,b)=>{
        if (a[0]>b[0]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect()
}

function ordenarPorNombreAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[0]>b[0]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect()
}

function ordenarPorPaisDes() {
    listaGrupos.sort((a,b)=>{
        if (a[1]>b[1]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect()
}

function ordenarPorPaisAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[1]>b[1]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect()
}

function ordenarPorTipoDes() {
    listaGrupos.sort((a,b)=>{
        if (a[2]>b[2]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect()
}

function ordenarPorTipoAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[2]>b[2]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect()
}

function pintarSelect() {
    let selectPlaylist = document.getElementById("playlist")
    selectPlaylist.innerHTML = "";
    listaGrupos.forEach((grupo)=>{
        selectPlaylist.innerHTML += `<option>${grupo.join("-")}</option>`
    })
}