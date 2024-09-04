import { ProductFunctionality } from "../../common/src/product-functionality.js";

export class ProductDetailsService {
    constructor() {
        this.goHomeBtn = document.getElementById("home-page");
        this.chosenCategory = document.getElementById("chosen-category");
        this.chosenSubcategory = document.getElementById("chosen-subcategory");
        this.favIcon = document.getElementById("fav-icon");
        this.favIconPath = document.getElementById("fav-icon-path");
        this.minusBtn = document.getElementById("minus-btn");
        this.quantityField = document.getElementById("quantity-num");
        this.plusBtn = document.getElementById("plus-btn");
        this.cartBtn = document.getElementById("add-to-cart-details");
        this.quantityNum = 1;
    }

    productDetailsEvents(openedProduct) {
        this.chosenCategory.addEventListener("click", () => {
            const category = this.chosenCategory.innerHTML.split("/")[0].trim();
            localStorage.setItem("categoryInfo", JSON.stringify({ category }));
        });

        this.chosenSubcategory.addEventListener("click", () => {
            const subcategory = this.chosenSubcategory.innerHTML.split("/")[0].trim();
            localStorage.setItem("categoryInfo", JSON.stringify({ subcategory }));
        });

        this.favIcon.addEventListener("click", () => ProductFunctionality.toggleFavourites(openedProduct, this.favIconPath)
        )

        this.minusBtn.addEventListener("click", () => {
            this.quantityNum--;
            this.quantityField.innerHTML = this.quantityNum;

            if(this.quantityNum === 1) {
                this.minusBtn.style.pointerEvents = "none";
                this.minusBtn.style.color = "#cbcdcd";
                this.minusBtn.style.borderColor = "#cbcdcd";
            }
        });

        this.plusBtn.addEventListener("click", () => {
            this.quantityNum++;
            this.quantityField.innerHTML = this.quantityNum;
            this.minusBtn.style.pointerEvents = "all";
            this.minusBtn.style.color = "var(--web-blue-color)";
            this.minusBtn.style.borderColor = "var(--web-blue-color)";
        });

        this.cartBtn.addEventListener("click", () => {
            openedProduct.quantity = Number(this.quantityField.innerHTML);

            ProductFunctionality.addToCart(openedProduct);
        });
    }
}