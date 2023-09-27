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

listaGrupos.push(["Quevedo","Español","Regueton",1264]);
listaGrupos.push(["Melendri","Canario","Pop",2246]);
listaGrupos.push(["Don Omar","Español","Bals",2344]);
listaGrupos.push(["Plex","Guiri","Rock",1285]);
listaGrupos.push(["Conejo Malo","Español","Romantico",1234]);
listaGrupos.push(["Maluma","Mejicano","Regueton",2346]);

onload = function () {
    pintarSelect(listaGrupos);
}

function anadir() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    let paisGrupo = document.getElementById("pais").value.trim();
    let tipoGrupo = document.getElementById("tipo").value.trim();
    listaGrupos.push([nombreGrupo,paisGrupo,tipoGrupo])
    pintarSelect(listaGrupos)
}

function eliminarUlt() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    listaGrupos.pop();
    pintarSelect(listaGrupos)
}

function eliminarPri() {
    let nombreGrupo = document.getElementById("grupo").value.trim();
    listaGrupos.shift();
    pintarSelect(listaGrupos)
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
    pintarSelect(listaGrupos)
}

function ordenarPorNombreDes() {
    listaGrupos.sort((a,b)=>{
        if (a[0]>b[0]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect(listaGrupos)
}

function ordenarPorNombreAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[0]>b[0]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect(listaGrupos)
}

function ordenarPorPaisDes() {
    listaGrupos.sort((a,b)=>{
        if (a[1]>b[1]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect(listaGrupos)
}

function ordenarPorPaisAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[1]>b[1]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect(listaGrupos)
}

function ordenarPorTipoDes() {
    listaGrupos.sort((a,b)=>{
        if (a[2]>b[2]) {
            return -1
        } else {
            return 1
        }
    })
    pintarSelect(listaGrupos)
}

function ordenarPorTipoAsc() {
    listaGrupos.sort((a,b)=>{
        if (a[2]>b[2]) {
            return 1
        } else {
            return -1
        }
    })
    pintarSelect(listaGrupos)
}

function mostrarEspanoles() {
    let listaFiltrada = listaGrupos.filter((grupo)=>grupo[1].toLowerCase()=='español')
    pintarSelect(listaFiltrada);
}

function pintarSelect(lista) {
    let selectPlaylist = document.getElementById("playlist")
    selectPlaylist.innerHTML = "";
    lista.forEach((grupo)=>{
        selectPlaylist.innerHTML += `<option>${grupo.join("-")}</option>`
    })
}

function mostrarTresPrimeros() {
    let listaTroceada = listaGrupos.slice(0,3);
    pintarSelect(listaTroceada);
}

function mostrarDosPrimerosEspanoles() {
    let listaTroceada = listaGrupos
        .filter((grupo)=>grupo[1]
        .toLowerCase()=='español')
        .slice(0,2);
    pintarSelect(listaTroceada);
}

function mostrarPrimerEspanolAlf() {
    let listaTroceada = listaGrupos
        .filter((grupo)=>grupo[1]
        .toLowerCase()=='español')
        .sort((a,b)=>{
            if (a[0]>b[0]) {
                return 1
            } else {
                return -1
            }
        })
        .slice(0,1);
    pintarSelect(listaTroceada);
}

function emitirFactura() {
    contenido="<table bgcolor='#FFCC66' style='border:1px solid #FF9933' width=200>";

    listaGrupos.forEach((grupo)=>{
        contenido+="<tr>";
        contenido+=`<td style='border:1px solid #FF9933'> ${grupo[0]} </td>`;
        contenido+=`<td style='border:1px solid #FF9933' align="center"> ${grupo[3]} </td>`;
        contenido+="</tr>";
    })

    contenido+="</table>";

    document.body.innerHTML+=contenido;
}

function incrementarVentas() {
    listaGrupos.map(element => {
        element[3]+=1000;
    });
    emitirFactura();
}