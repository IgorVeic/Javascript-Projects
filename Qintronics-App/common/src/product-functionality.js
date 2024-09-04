export class ProductFunctionality {    
    static loadFavourites(productsArray) {
        const favesLocalStorage = localStorage.getItem("favItems");

        // The first time we open the page, there will be no "favItems" in local storage
        if(!favesLocalStorage) return;

        const favItems = JSON.parse(localStorage.getItem("favItems"));

        for(let favItem of favItems) {
            const productIndex = productsArray.findIndex(product => product.id === favItem.id);

            // Maybe the favourited product won't be from this category, i.e. in this product array
            if(productIndex === -1) continue;

            // Replace the "ordinary" product with the same product, but liked -> needed for the check in category cards
            productsArray.splice(productIndex, 1, favItem);
        }
    }

    static toggleFavourites(productObject, favBtn) {
        const favesLocalStorage = localStorage.getItem("favItems");

        // The first time we open the page, there will be no "favItems" in local storage
        if(!favesLocalStorage) {
            favBtn.classList.add("fav-icon-fill");
            productObject.favourited = true;
            localStorage.setItem("favItems", JSON.stringify([productObject]));
            return;
        }

        const favItems = JSON.parse(localStorage.getItem("favItems"));
        const itemIndex = favItems.findIndex(item => item.id === productObject.id);
        favBtn.classList.toggle("fav-icon-fill");

        if(itemIndex === -1) {
            productObject.favourited = true;
            favItems.push(productObject);
        }
        else {
            productObject.favourited = false;
            favItems.splice(itemIndex, 1);
        }     
    
        localStorage.setItem("favItems", JSON.stringify(favItems));
    }

    static syncFavsOnTwoPages(oldFavesArray, newFavesArray, productsArray) {
        let productIndex;

        if(!oldFavesArray) {
            const likedProduct = newFavesArray[0];

            productIndex = productsArray.findIndex(product => product.id === likedProduct.id);

            productsArray[productIndex].favourited = true;
        }            
        else if(newFavesArray.length > oldFavesArray.length) {
            const likedProduct = newFavesArray.find(product => !oldFavesArray.find(item => item.id === product.id));

            productIndex = productsArray.findIndex(product => product.id === likedProduct.id);

            productsArray[productIndex].favourited = true;
        }
        else {
            const unlikedProduct = oldFavesArray.find(product => !newFavesArray.find(item => item.id === product.id));

            productIndex = productsArray.findIndex(product => product.id === unlikedProduct.id);

            productsArray[productIndex].favourited = false;
        }

        const favBtn = document.getElementById(`fav-icon-path-${productIndex}`);

        favBtn.classList.toggle("fav-icon-fill");
    }
    
    static addToCart(productObject) {
        const cartLocalStorage = localStorage.getItem("cartItems");

        // The first time the page is opened in the browser, there will be no "cartItems" in local storage
        // "cartItems" can't be set/initialized as "" in any document, because every time we load the page, all the previous information will be lost  
        if(!cartLocalStorage) {
            productObject.quantity = productObject.quantity;
            localStorage.setItem("cartItems", JSON.stringify([productObject]));
            return;
        }

        const cartItems = JSON.parse(cartLocalStorage);
        const itemIndex = cartItems.findIndex(item => item.id === productObject.id);

        if(itemIndex === -1) {
            productObject.quantity = productObject.quantity;
            cartItems.push(productObject);
        }
        // If we already have the item, just add to its quantity -> useful for cart page
        else {
            cartItems[itemIndex].quantity += productObject.quantity;
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
}