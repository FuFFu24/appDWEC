class MiMenu extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode : 'open'});
        this.colorFondo = this.getAttribute('colorFondo')
        shadowRoot.innerHTML = this.template;
    }
    get template() {
        return `
            <slot></slot>
            <slot name='texto'></slot>
            <h1 style='background-color:${this.colorFondo}'>
                QUE QUIERES QUE HAGA PEREIRA!!
            </h1>
        `;
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

let etiquetaMiMenu = window.customElements.define("mi-menu", MiMenu);
export { etiquetaMiMenu }