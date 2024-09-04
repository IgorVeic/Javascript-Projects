import { ProductDetailsCreator } from "./src/product-details-creator.js";
import { ProductDetailsService } from "./src/product-details-service.js";

window.addEventListener("load", () => {
    const openedProduct = JSON.parse(localStorage.getItem("openedProduct"));

    const detailsPageInfo = new ProductDetailsCreator();

    detailsPageInfo.fillPageDetails(openedProduct);

    const detailsPageEvents = new ProductDetailsService();
    detailsPageEvents.productDetailsEvents(openedProduct);  
});




