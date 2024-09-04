export class ProductDetailsCreator {
    constructor() {
        this.documentTitle = document.getElementById("document-title");
        this.chosenCategory = document.getElementById("chosen-category");
        this.chosenSubcategory = document.getElementById("chosen-subcategory");
        this.chosenProduct = document.getElementById("chosen-product");
        this.imgContainer = document.getElementById("img-container");
        this.productTitle = document.getElementById("product-title");
        this.favIconPath = document.getElementById("fav-icon-path");
        this.productPrice = document.getElementById("product-price");
        this.discountedPrice = document.getElementById("discounted-price");
        this.productDescription = document.getElementById("product-description");
        this.productWarranty = document.getElementById("warranty-text");
        this.productDetails = document.getElementById("accordion-body-container");
    }

    fillPageDetails (productObject) {
        const objectPairs = Object.entries(productObject.specifications);

        this.documentTitle.innerHTML = productObject.name;

        this.chosenCategory.innerHTML = `${productObject.category} / `;

        if(productObject.subcategory) {
            this.chosenSubcategory.innerHTML = `${productObject.subcategory} / `;
        }

        this.chosenProduct.innerHTML = productObject.name;
        this.chosenProduct.classList.add("selectedCategory");

        this.imgContainer.innerHTML += `
            <img src="${productObject.img}" id="detail-img-size" class="img-fluid rounded-start flex-shrink-1" alt="Image of ${productObject.name}" />
        `;

        this.productTitle.innerHTML = productObject.name;

        if(productObject.favourited)
            this.favIconPath.classList.add("fav-icon-fill");

        this.productPrice.innerHTML = `$${productObject.price}`;

        if (productObject.discount) { // productObject.discount !== 0
            const discountedPrice = Math.round((1 - productObject.discount / 100) * productObject.price);

            this.productPrice.classList.add('old-price');
            this.discountedPrice.style.display = "inline";
            this.discountedPrice.innerHTML = `$${discountedPrice}`;

            this.imgContainer.innerHTML += `<div class="discount-banner">- ${productObject.discount}%<div>`
        }

        this.productDescription.innerHTML = productObject.description;
        this.productWarranty.innerHTML = productObject.warranty;
    
        for(let objectPair of objectPairs) {
            let [key, value] = objectPair;
           
            key = key.split(/(?=[A-Z])/).join(" ");

            if(key.length <= 3 ) key = key.toUpperCase();
            else key = key.replace(/\b\w/g, char => char.toUpperCase());

            this.productDetails.innerHTML += `<p class="accordion-properties">${key}: ${value}</p>`;
        } 
    }
}