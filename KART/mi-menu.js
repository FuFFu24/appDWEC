class MiMenu extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML=this.template;
    }
    get template() {
        return `
        <style>       
            nav {
                margin: 30px auto;
                background-color: #4fb7f9;
                box-shadow: 0px 3px 20px 3px #162433;
            }
            nav ul {
                padding: 0;
                margin: 0 auto;
                list-style: none;
                position: relative;
                text-align: center;
            }
            nav ul li {
                display: inline-block;
                background-color: #4fb7f9;
            }
            nav a {
                display: block;
                padding: 0 20px;
                color: #FFF;
                font-size: 16px;
                line-height: 60px;
                text-decoration: none;
            }
            nav a:hover {
                background-color: #000000;
            }
            nav ul ul {
                display: none;
                position: absolute;
                top: 60px;
            }
            nav ul li:hover>ul {
                display: inherit;
            }
            nav ul ul li {
                width: 170px;
                float: none;
                display: list-item;
                position: relative;
            }
            nav ul ul ul li {
                position: relative;
                top: -60px;
                left: 170px;
            }
            .right {
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
            }
            .left {
                transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
            }
            .up {
                transform: rotate(-135deg);
                -webkit-transform: rotate(-135deg);
            }
            .down {
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
            }
        </style>
        <nav>
        <ul>
            <li><a href="#">General</a></li>
            <li><a href="#">Coches <i class="down"></i></a>
                <!-- Primer Menu Desplegable -->
                <ul>
                    <li><a href="coches.html?alta">Alta</a></li>
                    <li><a href="coches.html?baja">Baja</a></li>
                    <li><a href="coches.html?consulta">Consulta</a></li>
                    <li><a href="coches.html?modificacion">Modificación</a></li>
                </ul>
            </li>
            <li><a href="#">Pilotos <i class="down"></i></a>
                <ul>
                    <li><a href="pilotos.html?alta">Alta</a></li>
                    <li><a href="pilotos.html?baja">Baja</a></li>
                    <li><a href="pilotos.html?consulta">Consulta</a></li>
                    <li><a href="pilotos.html?modifica">Modificación</a></li>
                    <li><a href="pilotos.html?factura">Facturación</a></li>
                </ul>
            </li>
            <li><a href="#">Empleados <i class="down"></i></a>
                <ul>
                    <li><a href="empleados.html?alta">Alta</a></li>
                    <li><a href="empleados.html?baja">Baja</a></li>
                    <li><a href="empleados.html?consulta">Consulta</a></li>
                    <li><a href="empleados.html?modifica">Modificación</a></li>
                </ul>
            </li>
            <li><a href="#">Carreras <i class="down"></i></a>
                <ul>
                    <li><a href="carreras.html?alta">Alta</a></li>
                    <li><a href="carreras.html?baja">Baja</a></li>
                    <li><a href="carreras.html?consulta">Consulta</a></li>
                    <li><a href="carreras.html?modifica">Modificación</a></li>
                    <li><a href="carreras.html?actual">Carrera Actual</a></li>
                </ul>
            </li>
            <li><a href="#">Pilotos Carreras <i class="down"></i></a>
                <ul>
                    <li><a href="pilotosCarreras.html?alta">Alta</a></li>
                    <li><a href="pilotosCarreras.html?baja">Baja</a></li>
                    <li><a href="pilotosCarreras.html?consulta">Consulta</a></li>
                    <li><a href="pilotosCarreras.html?modifica">Modificación</a></li>
                </ul>
            </li>
        </ul>
    </nav>`;
    }
    static get observedAttributes() {
        return [""];
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr == '' && oldVal != newVal) {
            this.colorFondo = newVal;
            this.shadowRoot.innerHTML = this.template;
        }
    }

}
let etiquetaMiMenu = window.customElements.define("mi-menu", MiMenu);
export { etiquetaMiMenu }