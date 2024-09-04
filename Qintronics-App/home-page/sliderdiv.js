document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const dotsContainer = document.querySelector(".dots-container");
  const productCount = 8; // Number of products to display
  let currentIndex = 0;
  let slideInterval;

  function fetchProducts() {
    fetch("data/products.json")
      .then((response) => response.json())
      .then((products) => {
        console.log("Products fetched:", products); // Log the fetched products
        const randomProducts = getRandomProducts(products, productCount);
        displayProducts(randomProducts);
        createDots(randomProducts.length);
        startSlider();
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function displayProducts(products) {
    products.forEach((product) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.style.backgroundImage = `url('${product.img}')`;

      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      const productName = document.createElement("div");
      productName.classList.add("product-name");
      productName.textContent = product.name;

      const productPrice = document.createElement("div");
      productPrice.classList.add("product-price");
      productPrice.textContent = `$${product.price}`;

      productInfo.appendChild(productName);
      productInfo.appendChild(productPrice);

      slide.appendChild(productInfo);

      console.log("Appending slide:", slide);
      sliderContainer.appendChild(slide);
    });
  }

  function createDots(count) {
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetInterval();
  }

  function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("active"));
    document.querySelectorAll(".dot")[currentIndex].classList.add("active");
  }

  function nextSlide() {
    currentIndex =
      (currentIndex + 1) % document.querySelectorAll(".slide").length;
    updateSlider();
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 3500);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3500);
  }

  fetchProducts();
});
