import { CategoryApi } from "./category-api.js";
import { CategoryCards } from "../../common/src/cards.js";
import { CategoryNavService } from "./category-nav-service.js";
import { ProductFunctionality } from "../../common/src/product-functionality.js";
import { EventFunctions } from "../../common/src/event-functions.js";

export class CategoryProdService {
  constructor(categoryInfoObject) {
    this.categoryInfoObject = categoryInfoObject;
    this.documentTitle = document.getElementById("document-title");
    this.navManipulation = new CategoryNavService();
    this.navBtns = document.getElementById("nav-btns-container");
    this.goHomeBtn = document.getElementById("home-page");
    this.chosenCategory = document.getElementById("chosen-category");
    this.chosenSubcategory = document.getElementById("chosen-subcategory");
    this.selectedNum = document.getElementById("selected-num");
    this.showItems = [...document.getElementsByClassName("show-tems")];
    this.selectedSort = document.getElementById("selected-sort");
    this.sortItems = [...document.getElementsByClassName("sort-items")];
    this.categoryPageContainer = document.getElementById(
      "category-page-container"
    );
    this.pageNum = document.getElementById("page-num");
    this.prevBtn = document.getElementById("previous-btn");
    this.nextBtn = document.getElementById("next-btn");
    this.leftArrow = document.getElementById("left-arrow");
    this.rightArrow = document.getElementById("right-arrow");
    this.pageNavigation = document.getElementById("page-navigation");
    this.page = 1;
    this.firstProductIndex = 0;
    this.lastProductIndex = "";
    this.productsPerPage = 12;
    this.totalPages = "";
    this.allProducts = [];
    this.currentProducts = [];
  }

  async createFirstCategoryPage() {
    // The products are not sorted in any way the first time the category is opened, they are taken as they are in the database
    this.lastProductIndex = 12;
    this.allProducts = await CategoryApi.getProducts(this.categoryInfoObject);
    console.log(this.allProducts);
    this.totalPages = Math.ceil(this.allProducts.length / this.productsPerPage);
    this.createAnyCategoryPage();
  }

  createAnyCategoryPage() {
    ProductFunctionality.loadFavourites(this.allProducts);
    this.currentProducts = this.allProducts.slice(
      this.firstProductIndex,
      this.lastProductIndex
    );
    CategoryCards.createCards(this.currentProducts, this.categoryPageContainer);

    if (this.categoryInfoObject.category) {
      this.documentTitle.innerHTML = this.categoryInfoObject.category;
      this.chosenCategory.innerHTML = this.categoryInfoObject.category;
      this.chosenCategory.classList.add("selected-category");
    }

    if (this.categoryInfoObject.subcategory) {
      this.documentTitle.innerHTML = this.categoryInfoObject.subcategory;
      this.chosenCategory.innerHTML = `${this.currentProducts[0].category} / `;
      this.chosenCategory.style.cursor = "pointer";
      this.chosenSubcategory.innerHTML = this.categoryInfoObject.subcategory;
      this.chosenSubcategory.classList.add("selected-category");
    }

    this.pageNum.innerHTML = this.page;
  }

  resetInitialParams() {
    this.page = 1;
    this.firstProductIndex = 0;
    this.lastProductIndex = this.productsPerPage;
    this.navManipulation.disableButton(this.leftArrow, this.prevBtn);
  }

  categoryEvents() {
    this.chosenCategory.addEventListener("click", () => {
      const category = this.chosenCategory.innerHTML.split("/")[0].trim();

      localStorage.setItem("categoryInfo", JSON.stringify({ category }));
      window.location.href = "category-page.html";
    });

    // We always go back to the first page - keep the changes in Sort by
    this.showItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.selectedNum.innerHTML = item.innerHTML;

        if (Number(this.selectedNum.innerHTML)) {
          this.productsPerPage = Number(this.selectedNum.innerHTML);
          this.navManipulation.enableButton(this.rightArrow, this.nextBtn);
        } else {
          this.productsPerPage = this.allProducts.length;
          this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
        }

        this.totalPages = Math.ceil(
          this.allProducts.length / this.productsPerPage
        );

        if (this.totalPages === 1)
          this.navManipulation.disableButton(this.rightArrow, this.nextBtn);

        this.resetInitialParams();
        this.createAnyCategoryPage();
      });
    });

    // We always go back to the first page - keep the changes in Show
    this.sortItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.selectedSort.innerHTML = item.innerHTML;

        this.navManipulation.sortProducts(e.target.id, this.allProducts);

        this.resetInitialParams();
        this.createAnyCategoryPage();
        this.navManipulation.enableButton(this.rightArrow, this.nextBtn);

        if (this.totalPages === 1)
          this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
      });
    });

    this.prevBtn.addEventListener("click", async () => {
      this.page--;
      this.firstProductIndex -= this.productsPerPage;
      this.lastProductIndex -= this.productsPerPage;

      this.createAnyCategoryPage();

      this.navManipulation.enableButton(this.rightArrow, this.nextBtn);

      if (this.page === 1)
        this.navManipulation.disableButton(this.leftArrow, this.prevBtn);
    });

    this.nextBtn.addEventListener("click", async () => {
      this.page++;
      this.firstProductIndex += this.productsPerPage;

      const remainingProducts = this.allProducts.slice(this.firstProductIndex);

      if (remainingProducts.length < this.productsPerPage)
        this.lastProductIndex += remainingProducts.length;
      else this.lastProductIndex += this.productsPerPage;

      this.createAnyCategoryPage();

      this.navManipulation.enableButton(this.leftArrow, this.prevBtn);

      if (this.page === this.totalPages)
        this.navManipulation.disableButton(this.rightArrow, this.nextBtn);
    });

    document.addEventListener("click", (e) =>
      EventFunctions.cardBtnsClick(this.currentProducts, e.target)
    );

    window.addEventListener("storage", (e) =>
      EventFunctions.syncFavsClick(this.currentProducts, e)
    );
  }
}
