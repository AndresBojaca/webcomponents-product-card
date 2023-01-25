class settingsComponent extends HTMLElement {

    constructor(){ 
        super();
        this.attachShadow({ mode: "open" });
    }
    getStyle(){
        return `
        <style>
            :host{
                display: block
            }
            .settings span{
                cursor: pointer;
                font-size: 1.2rem;

            }
            .settings span:nth-child(1){
                color: #5A6CB2;
            }
            .settings span:nth-child(2){
                color: #00bd75;
            }
            .settings{
                display: flex;
                gap: 3px;
                background-color: white;
                width: max-content;
                justify-content: center;
                align-items: center;
            }
            .change-color-text{
                margin-top: 13px;
                margin-left: .5rem;
                font-size: .5rem;
                text-transform: uppercase;
                color: var(--bg-secondary-color)
            }
        </style>
        `; 
    }
    changeColor(element) {
        const color = element.target.getAttribute("data-color");
        const root = document.querySelector(':root');

        switch (color) {
            case 'blue':
                root.style.setProperty('--bg-primary-color', '#5A6CB2');
                root.style.setProperty('--filter-product-image', 'unset');
                break;
            case 'green':
                root.style.setProperty('--bg-primary-color', '#00bd75');
                root.style.setProperty('--filter-product-image', 'hue-rotate(262deg)');
                break;
            case 'black':
                root.style.setProperty('--bg-primary-color', 'black');
                root.style.setProperty('--filter-product-image', 'grayscale(1)');
                break;
        }
    }
  
    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = `      
        <div class="settings">
            <span data-color="blue">⦿</span>
            <span data-color="green">⦿</span>
            <span data-color="black"style="color: black;">⦿</span>
            <p class="change-color-text">Change Color</p>
        </div>
        ${this.getStyle()}`;
        return template;
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content);

        //Cambia el Color de la Variable de CSS
        this.optionColor = this.shadowRoot.querySelectorAll("span");
        this.optionColor.forEach((option) => {
            option.addEventListener("click", this.changeColor.bind());
        });
    }
    connectedCallback(){
        this.render();
    }
    disconnectedCallback() {
        this.optionColor = this.shadowRoot.querySelectorAll("span");
        this.optionColor.forEach((option) => {
            option.removeEventListener("click", this.changeColor.bind());
        });
    }

}
customElements.define('settings-component', settingsComponent);
