import { etiquetaMiPrimerDiv } from "./miPrimerDiv.js";

onload = () => {
    setInterval(() => {
        document.getElementsByTagName("div-uno")[0].anchura = "500";
    }, 3000);
}