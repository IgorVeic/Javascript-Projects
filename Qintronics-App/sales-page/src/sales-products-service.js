import { SalesApi } from "./sales-api.js";
import { CategoryCards } from "../../common/src/cards.js";
import { SalesNavService } from "./sales-nav-service.js";
import { ProductFunctionality } from "../../common/src/product-functionality.js";
import { EventFunctions } from "../../common/src/event-functions.js";

export class SalesProdService {
    constructor() {
        this.documentTitle = document.getElementById("document-title");
        this.navManipulation = new SalesNavService();
        this.navBtns = document.getElementById("nav-btns-container");
        this.goHomeBtn = document.getElementById("home-page");
        this.selectedNum = document.getElementById("selected-num");
        this.showItems = [...document.getElementsByClassName("show-tems")]
        this.selectedSort = document.getElementById("selected-sort");
        this.sortItems = [...document.getElementsByClassName("sort-items")];
        this.categoryPageContainer = document.getElementById("sales-page-container");
        this.pageNum = document.getElementById("page-num");
        this.prevBtn = document.getElementById("previous-btn");
        this.nextBtn = document.getElementById("next-btn");
        this.leftArrow = document.getElementById("left-arrow");
        this.rightArrow = document.getElementById("right-arrow");
        this.pageNavigation = document.getElementById("page-navigation");
        this.page = 1;
        this.firstProductIndex = 0;
        this.lastProductIndex = "";
        this.productsPerPage = 10;
        this.totalPages = "";
        this.allProducts = [];
        this.currentProducts = [];
    }

    async createFirstCategoryPage() {
        // The products are not sorted in any way the first time the category is opened, they are taken as they are in the database
        this.lastProductIndex = 10;
        this.allProducts = await SalesApi.getProducts();
        this.totalPages = Math.ceil(this.allProducts.length / this.productsPerPage);
        this.createAnyCategoryPage();
    }

    createAnyCategoryPage() {
        ProductFunctionality.loadFavourites(this.allProducts);
        this.currentProducts = this.allProducts.slice(this.firstProductIndex, this.lastProductIndex);
        CategoryCards.createCards(this.currentProducts, this.categoryPageContainer);      
        this.pageNum.innerHTML = this.page;
    }
    
    resetInitialParams() {
        this.page = 1;
        this.firstProductIndex = 0;
        this.lastProductIndex = this.productsPerPage;
        this.navManipulation.disableButton(this.leftArrow, this.prevBtn);
    }

    categoryEvents() {
        // We always go back to the first page - keep the changes in Sort by
        this.showItems.forEach(item => {
            item.addEventListener("click", (e) => {
                this.selectedNum.innerHTML = item.innerHTML;

                if(this.selectedNum.innerHTML === "All") {
                    this.productsPerPage = this.allProducts.length;
                    this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
                }
                else {
                    this.productsPerPage = Number(this.selectedNum.innerHTML);
                    this.navManipulation.enableButton(this.rightArrow, this.nextBtn)
                }                  
              
                this.totalPages = Math.ceil(this.allProducts.length / this.productsPerPage);

                if(this.totalPages === 1) this.navManipulation.disableButton(this.rightArrow, this.nextBtn);

                this.resetInitialParams();                
                this.createAnyCategoryPage();
            })
        });

        // We always go back to the first page - keep the changes in Show
        this.sortItems.forEach(item => {
            item.addEventListener("click", (e) => {
                this.selectedSort.innerHTML = item.innerHTML;

                this.navManipulation.sortProducts(e.target.id, this.allProducts);
                
                this.resetInitialParams();
                this.createAnyCategoryPage();
                this.navManipulation.enableButton(this.rightArrow, this.nextBtn);

                if(this.totalPages === 1) this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
            })
        })

        this.prevBtn.addEventListener("click", async () => {
            this.page--;
            this.firstProductIndex -= this.productsPerPage;
            this.lastProductIndex -= this.productsPerPage;

            this.createAnyCategoryPage();

            this.navManipulation.enableButton(this.rightArrow, this.nextBtn);

            if(this.page === 1) this.navManipulation.disableButton(this.leftArrow, this.prevBtn);
        });

        this.nextBtn.addEventListener("click", async () => {
            this.page++;
            this.firstProductIndex += this.productsPerPage;

            const remainingProducts = this.allProducts.slice(this.firstProductIndex);

            if(remainingProducts.length < this.productsPerPage) this.lastProductIndex += remainingProducts.length;
            else this.lastProductIndex += this.productsPerPage;

            this.createAnyCategoryPage();

            this.navManipulation.enableButton(this.leftArrow, this.prevBtn);

            if(this.page === this.totalPages) this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
        });

        document.addEventListener("click", (e) => EventFunctions.cardBtnsClick(this.currentProducts, e.target));

        window.addEventListener("storage", (e) => EventFunctions.syncFavsClick(this.currentProducts, e));
    }
}

