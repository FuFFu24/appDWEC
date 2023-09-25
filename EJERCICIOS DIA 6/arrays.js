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

function anadir() {
    let nombreGrupo = document.getElementById('grupo').ariaValueMax.trim();
    listaGrupos.push(nombreGrupo)
    pintarSelect();
}

function pintarSelect() {
    let selectPlaylist = document.getElementById('playlist')
    listaGrupos.forEach((grupo)=>{
        selectPlaylist.innerHTML += `<option>${grupo}</option>`
    })
}