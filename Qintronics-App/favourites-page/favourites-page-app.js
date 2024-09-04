import { CategoryCards } from "../common/src/cards.js";
import { EventFunctions } from "../common/src/event-functions.js";

export class FavouritesPageService {
    constructor() {
        this.favouritesPageContainer = document.getElementById("favourites-page-container");
        this.emptyFavourites = document.getElementById("empty-favourites");
    }

    createFirstFavPage() {
        const favouriteItems = JSON.parse(localStorage.getItem("favItems"));

        if(!favouriteItems || favouriteItems.length === 0) {
            this.emptyFavourites.style.display = "flex";
            return;
        }

        CategoryCards.createCards(favouriteItems, this.favouritesPageContainer);
    }

    favouritesEvents() {
        document.addEventListener("click", (e) => {
            const oldFavItems = JSON.parse(localStorage.getItem("favItems"));
            EventFunctions.cardBtnsClick(oldFavItems, e.target);
        
            const newFavItems = JSON.parse(localStorage.getItem("favItems"));
        
            if(newFavItems.length === 0) {
                this.favouritesPageContainer.innerHTML = "";
                this.emptyFavourites.style.display = "flex";
                return;
            }
        
            this.emptyFavourites.style.display = "none";
            CategoryCards.createCards(newFavItems, this.favouritesPageContainer);    
        });
    }
}

const favPage = new FavouritesPageService();
favPage.createFirstFavPage();
favPage.favouritesEvents();

