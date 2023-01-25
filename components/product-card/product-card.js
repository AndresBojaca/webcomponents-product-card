class productCard extends HTMLElement {

    static get observedAttributes() {
        return ["product_price"];
    }
    
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
        this.imgURL = this.getAttribute("imgURL") || 'https://store-images.s-microsoft.com/image/apps.38282.13733306562729316.049f2fd1-b066-4cb5-b5ef-317d282a0b02.ca5b4cd1-6cda-4b13-80af-d7d8e5ba2256'; 
        this.imgBrandURL = this.getAttribute("imgBrandURL") || 'https://store-images.s-microsoft.com/image/apps.38282.13733306562729316.049f2fd1-b066-4cb5-b5ef-317d282a0b02.ca5b4cd1-6cda-4b13-80af-d7d8e5ba2256'; 
        this.product_name = this.getAttribute("product-name") || 'No Data'; 
        this.product_collection = this.getAttribute("product-collection") || 'No Data'; 
        this.product_description = this.getAttribute("product-description") || 'No Data'; 
        this.product_price = `$ ${this.getAttribute("product-price") || '0'}`; 
    }
    attributeChangedCallback(attr, oldVal, newVal){
        // No Funciona :´c
        if(attr === 'product_price'){
            this.product_price = newVal;
            console.log(oldVal, newVal)
        }
    }
    getStyle(){
        const style = `
        <style>
            ::slotted(.developed) {
                color: rgba(0,0,0,.3);
                position: absolute;
                bottom: -30px;
                right: 0px;
                font-size: .7rem;
            }
            .card{
                box-shadow: 0 0 2rem rgba(0,0,0,0.1);
                border-radius: 1rem;
                display: flex;
                column-gap: 1rem;
                width: 100%;
                max-width: 800px;
                height: 400px;
                position: relative;
                background-color: var(--bg-card-color);
            }

            .card span{
                margin-top: 1rem;
                display: inline-block;
            }
            .card p{
                color: var(--bg-secondary-color);
                font-size: 1rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
            }
            .card span,
            .card h1,
            .product-actions span,
            .product-price{
                margin: 0;
            }
            .card > div{
                padding: 2rem;
            }
            .card > div:nth-child(1){
                width: 40%;
                background-color: var(--bg-primary-color);
                display: block;
                border-radius:  1rem 0 0 1rem;
                transition: all .3s;
                position: relative;
            }
            .card > div:nth-child(2){
                width: 60%;
                position: relative;
            }
            .card button{
                background-color: var(--bg-primary-color);
                padding: .5rem 1rem;
                border: none;
                color: white;
                font-family: 'Poppins', sans-serif;
                border-radius: .2rem;
                transition: all .3s;
            }
            .card button:hover{
                transform: scale(1.03);
                cursor: pointer;
            }
            .product-image {
                width: 530px;
                height: auto;
                position: absolute;
                top: 30px;
                left: -160px;
                rotate: -30deg;
                transition: all .3s;
                z-index: 9;
                filter: var(--filter-product-image)
            }
            .product-brand-image{
                width: 80px;
                height: auto;
                position: absolute;
                bottom: 20px;
                right: 20px;
                filter: invert(1)
            }
            .product-image:hover {
                transform: scale(1.04);
                cursor: pointer;
            }
            .product-price{
                font-weight: bold;
                font-size: 1.3rem;
            }
            .product-actions{
                border-top: 1px solid rgba(0,0,0,0.1);
                margin-top: 1rem;
                position: absolute;
                bottom: 2rem;
                padding-top: 1rem;
                width: 85%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            @media (max-width: 1250px) {
                .card {
                    flex-direction: column;
                    height: auto;
                    width: 90%;
                    margin: 3rem auto;
                }
                .product-image{
                    position: relative;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -40%);
                    width: 75%;
                }
                .card > div:nth-child(1){
                    border-radius: 1rem 1rem 0 0;
                }
                .card > div:nth-child(1),
                .card > div:nth-child(2){
                    width: auto;
                }
                .card span{
                    font-size: 90%;
                }
                .product-actions{
                    position: relative;
                    bottom: 0;
                    width: 100%;
                }
                .product-price{
                    font-size: 1.6rem !important;
                }
                .product-image:hover {
                    transform: translate(-50%, -40%);
                    cursor: pointer;
                }
        
            }

        </style>`;
        return style;
    }
    getTemplate(){
        const template = document.createElement("template");
        template.innerHTML = `
        <div class='card'>
            <div>
                <img class="product-image" src="${this.imgURL}" alt="Product Image">
                <img class="product-brand-image" src="${this.imgBrandURL}" alt="Product Image">
            </div>
            <div>
                <slot name="settings"></slot>
                <h1>${this.product_name}</h1>
                <p>${this.product_collection}</p>  
                <span>${this.product_description}</span>
                <div class="product-actions">
                    <span class="product-price">${this.product_price}</span>
                    <button>Comprar</button>
                </div>
            </div>
            <slot name="developed"></slot>
        </div>
        ${this.getStyle()}
        `
        return template;
    }

    render(){
        this.shadowRoot.appendChild(this.getTemplate().content);
    }
    connectedCallback(){
        this.render();
    }
}
customElements.define("product-card", productCard)
