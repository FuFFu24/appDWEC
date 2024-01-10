class MiInsertar extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode : 'open'});
        shadowRoot.innerHTML = this.template;
    }
    get template() {
        return `
        <style>
            #nuevoCoche {
                border: 1px solid red;
                background-color: aliceblue;
                padding: 10px;
            }
        </style>
            <div id="nuevoCoche">
                <p>Modelo <input type="text" name="modelo" id="modelo"></p>
                <p>Color <input type="text" name="color" id="color"></p>
                <button type="button">AÑADIR COCHE</button>
            </div>
        `;
    }
}

let etiquetaMiInsertar = window.customElements.define("mi-insertar", MiInsertar);
export { etiquetaMiInsertar }