/* for (i = 0; i < 20; i++) {
    document.body.innerHTML+=`<img src="gato.png" alt="gato" width="200px" height="200px">`
} */

var listaFotos=["gato1.png",
                "gato2.png",
                "gato3.png",
                "gato4.png",
                "gato5.png",
                "gato6.png",
                ]
for (i = 0; i < listaFotos.length; i++) {
    document.body.innerHTML+=`<img src="${listaFotos[i]}" alt="gato" width="200px" height="200px">`
}