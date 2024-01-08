class MiLateral extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode : 'open'});
        shadowRoot.innerHTML = this.template;
    }
    get template() {
        return `
            <style>
                img {
                    border : 2px solid red;
                    max-width: 200px;
                }
            </style>
            <img src="coche5.png" alt="COCHE">
        `;
    }
}

let etiquetaMiLateral = window.customElements.define("mi-lateral", MiLateral);
export { etiquetaMiLateral }