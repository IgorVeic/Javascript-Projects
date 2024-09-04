import { EventFunctions } from "../common/src/event-functions.js";
import { CategoryCards } from "../common/src/cards.js";
import { ProductFunctionality } from "../common/src/product-functionality.js";

let currentProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  // Get the search query from local storage
  const searchQuery = localStorage.getItem("searchValue");

  //   If there is a query in local storage, call the fetch function or show error message
  if (searchQuery) {
    document.getElementById("searched-keyword").innerText = searchQuery;
    fetchResults(searchQuery);
  } else {
    document.getElementById("category-page-container").innerText =
      "No search query provided.";
  }
});

// Fetch all the products and filter them by the search query and when all done, call the function to display the results
const fetchResults = async (query) => {
  try {
    const response = await fetch("/data/products.json");
    const data = await response.json();
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    currentProducts = filteredResults;
    ProductFunctionality.loadFavourites(currentProducts);

    displayResults(filteredResults);
  } catch (error) {
    console.error("Fetch error: ", error);
    document.getElementById("category-page-container").innerText =
      "Error fetching search results.";
  }
};

// Display the results on the page, it takes the functionality from the common folder for the common functions of the cards functionality
const displayResults = (results) => {
  const container = document.getElementById("category-page-container");
  CategoryCards.createCards(results, container);

  document.addEventListener("click", (e) => {
    EventFunctions.cardBtnsClick(currentProducts, e.target);
  });

  window.addEventListener("storage", (e) => {
    EventFunctions.syncFavsClick(currentProducts, e);
  });
};
