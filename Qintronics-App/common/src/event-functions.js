import { ProductFunctionality } from "./product-functionality.js";

export class EventFunctions {
    static cardBtnsClick (productsArray, btn) {
        if(btn.closest(".fav-icons")) {
            const productIndex = btn.closest(".fav-icons").id.split("-").pop();

            ProductFunctionality.toggleFavourites(productsArray[productIndex], btn);
        }

        if(btn.closest(".cart-btns")) {
            const productIndex = btn.id.split("-").pop();

            const chosenProduct = productsArray[productIndex];

            chosenProduct.quantity = 1;

            ProductFunctionality.addToCart(chosenProduct);
        }

        if(btn.closest(".go-to-details")) {
            const productObjectIndex = btn.id.split("-").pop();
            const productObject = productsArray[productObjectIndex];

            localStorage.setItem("openedProduct", JSON.stringify(productObject));
        }
    }

    static syncFavsClick(productsArray, eventObject) {
        // If something else is added to local storage, do nothing
        if(eventObject.key !== "favItems") return;
            
        const oldFaves = JSON.parse(eventObject.oldValue);
        const newFaves = JSON.parse(eventObject.newValue);

        ProductFunctionality.syncFavsOnTwoPages(oldFaves, newFaves, productsArray);
    }
}