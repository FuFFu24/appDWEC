class MiPrimerDiv extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        this.imagen = this.getAttribute('foto');
        this.anchura = this.getAttribute("anchura");
        shadowRoot.innerHTML = this.template;
    }
    get template() {
        return `<style>
               img{
                width: ${this.anchura}px;
               }
               </style>
               <div>
                 <img src="${this.imagen}">
                 <slot name="mensaje1"></slot>
               </div>`;
    }

    static get observedAttributes() {
        return ["anchura", "foto"];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        console.log(attr);
        console.log(oldVal);
        console.log(newVal);
        if (attr == 'anchura' && oldVal != newVal) {
            this.anchura = newVal;
            this.shadowRoot.innerHTML = this.template;
        }
    }
}
let etiquetaMiPrimerDiv = window.customElements.define("div-uno", MiPrimerDiv);
export { etiquetaMiPrimerDiv }