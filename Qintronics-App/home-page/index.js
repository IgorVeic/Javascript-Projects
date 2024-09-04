document.addEventListener('DOMContentLoaded', function () {
	fetch('./Data/products.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network error');
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			// Update the .product-image elements
			const images = document.querySelectorAll('.product-image');
			data.slice(0, 4).forEach((product, index) => {
				if (images[index]) {
					images[index].src = product.img;
				}
			});

			// Filter the data to include only items on discount
			const discountedProducts = data.filter((product) => product.discount > 0);

			// Update the .featured-product elements with discounted products
			const featuredProductsContainer = document.querySelector('.featured-products');
			featuredProductsContainer.innerHTML = '';
			const randomDiscountedProducts = getRandomProducts(discountedProducts, 10); // Get 10 random discounted products
			randomDiscountedProducts.forEach((product) => {
				const productElement = createProductElement(product);
				featuredProductsContainer.appendChild(productElement);
			});
		})
		.catch((error) => console.error('Error fetching the products:', error));
});

function getRandomProducts(data, count) {
	const randomProducts = [];
	const totalProducts = data.length;
	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * totalProducts);
		randomProducts.push(data[randomIndex]);
	}
	return randomProducts;
}

function createProductElement(product) {
	const productElement = document.createElement('div');
	productElement.classList.add('featured-product');

	const imgWrapper = document.createElement('div');
	imgWrapper.classList.add('img-wrapper');

	const imgElement = document.createElement('img');
	imgElement.src = product.img;
	imgElement.alt = 'product-image';
	imgElement.classList.add('product-image');

	imgWrapper.appendChild(imgElement);

	const productTextElement = document.createElement('div');
	productTextElement.classList.add('product-text');

	const nameElement = document.createElement('p');
	nameElement.classList.add('product-name');
	nameElement.textContent = product.name;

	const priceDiscountWrapper = document.createElement('div');
	priceDiscountWrapper.classList.add('price-discount-wrapper');

	const priceElement = document.createElement('p');
	priceElement.classList.add('product-price');
	priceElement.textContent = `$${product.price}`;

	const discountElement = document.createElement('p');
	discountElement.classList.add('product-discount');
	discountElement.textContent = `${product.discount}% off`;

	priceDiscountWrapper.appendChild(priceElement);
	priceDiscountWrapper.appendChild(discountElement);

	productTextElement.appendChild(nameElement);
	productTextElement.appendChild(priceDiscountWrapper);

	productElement.appendChild(imgWrapper);
	productElement.appendChild(productTextElement);

	return productElement;
}
