const sidebar = document.querySelector(".nav-sidebar");
const sideBtn = document.querySelector(".sidebar-link");
const searchbar = document.querySelector(".searchbar");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const dropdowns = document.querySelectorAll(".nav-sb-drdown");
const badges = document.querySelectorAll(".badges");
const loginLink = document.querySelector(".login-link");
const login = document.querySelector(".nav-login");
const loginArea = document.querySelector(".login-content");
const registerButton = document.querySelector(".register");
const loginHeaderText = document.querySelector(".login-header-text");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#signup-form");

let searchValue;

// Update the badges with the current count of favorites and cart items
const getFavItemsCount = () => {
  const favItems = JSON.parse(localStorage.getItem("favItems")) || [];
  return favItems.length;
};

// Get cart items count from local storage and count individual quantities into a total count variable
const getCartItemsCount = () => {
  let totalCartItems;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length > 0) {
    totalCartItems = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  return totalCartItems || 0;
};

// Show the badges with the current count of favorites and cart items
const updateBadgesCount = () => {
  const favoritesCount = getFavItemsCount();
  const cartCount = getCartItemsCount();

  badges.forEach((badge) => {
    badge.style.opacity = "0";
    if (badge.classList.contains("fav") && favoritesCount > 0) {
      badge.style.opacity = "1";
      badge.innerText = favoritesCount;
    } else if (badge.classList.contains("cart") && cartCount > 0) {
      badge.style.opacity = "1";
      badge.innerText = cartCount;
    }
  });
};

document.addEventListener("click", (e) => {
    setTimeout(() => updateBadgesCount(), 100);
    // updateBadgesCount();

});

updateBadgesCount();

// Sidebar toggle functionality
sideBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("active");
});

// Function for performing search - used in searchbar event listeners (click on search button and press Enter key)
const performSearch = () => {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    localStorage.setItem("searchValue", searchValue);
    searchInput.value = "";
    searchbar.classList.remove("active-search");
    window.location.href = "/search-page/search.html";
  }
};

// Listeners for the searchbar
searchButton.addEventListener("click", () => {
  searchbar.classList.contains("active-search")
    ? performSearch()
    : searchbar.classList.add("active-search");
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    performSearch();
  }
});

// Dropdowns toggle functionality alongside with the selection of an option and updating the local storage
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");
  const arrow = dropdown.querySelector(".arrow");

  select.addEventListener("click", () => {
    menu.classList.toggle("open");
    arrow.classList.toggle("open");
    selected.classList.toggle("clicked");
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      selected.innerText = opt.innerText;
      menu.classList.remove("open");
      arrow.classList.remove("open");
      selected.classList.remove("clicked");
      options.forEach((opt) => {
        opt.classList.remove("active");
      });
      opt.classList.add("active");
      if (selected.closest(".nav-sb-drdown.currency")) {
        localStorage.setItem("Currency", selected.innerText);
      } else if (selected.closest(".nav-sb-drdown.language")) {
        localStorage.setItem("Language", selected.innerText);
      }
    });
  });
});

// Close sidebar, searchbar and dropdowns if clicked outside of them
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !sideBtn.contains(e.target)) {
    sidebar.classList.remove("active");
  }
  if (!searchbar.contains(e.target) && !searchButton.contains(e.target)) {
    searchbar.classList.remove("active-search");
  }
  if (!loginArea.contains(e.target) && !loginLink.contains(e.target)) {
    login.classList.remove("active");
    showAuthForm();
  }

  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.querySelector(".selected").classList.remove("clicked");
      dropdown.querySelector(".menu").classList.remove("open");
      dropdown.querySelector(".arrow").classList.remove("open");
    }
  });
});

// Login form toggle functionality
loginLink.addEventListener("click", () => {
  login.classList.toggle("active");
});

// Functions for switching between login and register forms
const registerClickHandler = () => {
  loginHeaderText.innerText = "Create an account";
  loginForm.style.display = "none";
  registerButton.style.display = "none";
  registerForm.style.display = "flex";
};

const showAuthForm = () => {
  loginHeaderText.innerText = "Have an account?";
  registerForm.style.display = "none";
  registerButton.style.display = "flex";
  loginForm.style.display = "flex";
};

registerButton.addEventListener("click", registerClickHandler);
