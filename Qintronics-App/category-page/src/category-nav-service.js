export class CategoryNavService {
    sortProducts(criterion, productsArray) {
        switch(criterion) {
            case "alphabet-asc":
                productsArray.sort((a,b) => a.name.localeCompare(b.name));
                break;
            case "alphabet-desc":
                productsArray.sort((a,b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                productsArray.sort((a,b) => {
                    const firstProductPrice = Math.round((1 - a.discount / 100) * a.price);
                    const secondProductPrice = Math.round((1 - b.discount / 100) * b.price);
                    return firstProductPrice - secondProductPrice;
                });
                break;
            case "price-desc":
                productsArray.sort((a,b) => {
                    const firstProductPrice = Math.round((1 - b.discount / 100) * b.price);
                    const secondProductPrice = Math.round((1 - a.discount / 100) * a.price);
                    return firstProductPrice - secondProductPrice;
                });
                break;
        }
    }
    
    enableButton(arrow, element) {
        arrow.style.borderColor = "var(--web-blue-color)";
        element.style.pointerEvents = "all";
    }

    disableButton(arrow, element) {
        arrow.style.borderColor = "#cbcdcd";
        element.style.pointerEvents = "none";
    }
}