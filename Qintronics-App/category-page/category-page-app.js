import { CategoryProdService } from "./src/category-products-service.js";

// localStorage.setItem(
//   "categoryInfo",
//   JSON.stringify({ subcategory: "Microphones" })
// );

const categoryInfoObject = JSON.parse(localStorage.getItem("categoryInfo"));
// Here will be the logic for receiving data from the sidebar
const categoryPage = new CategoryProdService(categoryInfoObject);
await categoryPage.createFirstCategoryPage();

categoryPage.categoryEvents();
