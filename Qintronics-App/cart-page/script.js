const html = {
	cartContainer: document.getElementById('cart-container'),
	totalPriceContainer: document.getElementById('total-price'),
	cartListContainer: document.getElementById('cart-list'),
	emptyCartContainer: document.getElementById('empty-cart'),
};

function handleLocalStorage(products) {
	localStorage.removeItem('cartItems');
	localStorage.setItem('cartItems', JSON.stringify(products));
}

function printProducts(products) {
	html.cartContainer.innerHTML = '';

	products.forEach((product) => {
		if (product.img === 'undefined') {
			product.img = './gift-card.jpg';
		}

		html.cartContainer.innerHTML += `
        <div class="cart-card">
			<div class="section-one">
				<div class="product-container">
					<img src="${product.img}" alt="" />
					<div>
						<p class="product-title">${product.name}</p>
						<p class="product-description">${product.description}</p>
					</div>
				</div>
			</div>

			<div class="section-two">

				<div class="quantity-container">
					<p class="quantity-number" id="${product.id}-quantity">${product.quantity}</p>
				
					<div class="flex-col">
						<button class="arrow-up active" id="${product.id}-up">▲</button>
						<button class="arrow-down inactive" id="${product.id}-down">▼</butt>
					</div>
				</div>

                <div class="price-container">
                    <p class="price-number" id="${product.id}-price">$${Number(
			product.price
		).toLocaleString()}</p>
                </div>

                <div class="remove-container">
                    <button class="remove-button" id="${product.id}-remove">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" class="trash-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>                          
                    </button>
                </div>		
			</div>
		</div>
			
            <hr class="separator" />
        `;
	});
}

function handleButtons(products) {
	products.forEach((product) => {
		const buttonIncrease = document.getElementById(`${product.id}-up`);
		const buttonDecrease = document.getElementById(`${product.id}-down`);

		if (product.quantity > 1) {
			buttonDecrease.classList.remove('inactivate');
			buttonDecrease.classList.add('activate');

			const productPrice = document.getElementById(`${product.id}-price`);
			productPrice.innerHTML = `$ ${(product.price * product.quantity).toLocaleString()}`;
		} else {
			buttonDecrease.classList.remove('activate');
			buttonDecrease.classList.add('inactivate');
		}

		const buttonRemove = document.getElementById(`${product.id}-remove`);

		buttonIncrease.addEventListener('click', () => {
			product.quantity += 1;
			const productQuantity = document.getElementById(`${product.id}-quantity`);
			productQuantity.innerHTML = product.quantity;

			const productPrice = document.getElementById(`${product.id}-price`);
			productPrice.innerHTML = `$ ${(product.price * product.quantity).toLocaleString()}`;

			buttonDecrease.classList.remove('inactivate');
			buttonDecrease.classList.add('activate');

			handleLocalStorage(products);
			handleTotalChange();
		});

		buttonDecrease.addEventListener('click', () => {
			if (product.quantity == 1) {
				return;
			}

			product.quantity -= 1;

			if (product.quantity == 1) {
				buttonDecrease.classList.add('inactivate');
				buttonDecrease.classList.remove('activate');
			}

			const productPrice = document.getElementById(`${product.id}-price`);
			productPrice.innerHTML = `$ ${(product.price * product.quantity).toLocaleString()}`;

			const productQuantity = document.getElementById(`${product.id}-quantity`);
			productQuantity.innerHTML = product.quantity;

			handleLocalStorage(products);
			handleTotalChange();
		});

		buttonRemove.addEventListener('click', () => {
			products = products.filter((fp) => fp.id !== product.id);

			handleLocalStorage(products);

			if (products.length === 0) {
				html.cartListContainer.style.display = 'none';
				html.emptyCartContainer.style.display = 'flex';
			} else {
				printProducts(products);
				handleButtons(products);
				handleTotalChange();
			}
		});
	});

	function handleTotalChange() {
		totalPrice = 0;
		products.forEach((product) => {
			productPrice = Number(product.price) * product.quantity;
			totalPrice += productPrice;
		});
		html.totalPriceContainer.innerHTML = totalPrice.toLocaleString();
	}
}

function handleCart() {
	const cartItems = JSON.parse(localStorage.getItem('cartItems'));

	if (!cartItems || cartItems.length === 0) {
		html.cartListContainer.style.display = 'none';
		html.emptyCartContainer.style.display = 'flex';
		return;
	}

	cartItems.map((product) => {
		if (product.discount > 0) {
			product.price = Number((product.price - (product.price * product.discount) / 100).toFixed(0));
		}
	});

	let totalPrice = cartItems.reduce((acc, product) => acc + Number(product.price), 0);
	html.totalPriceContainer.innerHTML = totalPrice.toLocaleString();

	printProducts(cartItems);
	handleButtons(cartItems);
}

handleCart();
