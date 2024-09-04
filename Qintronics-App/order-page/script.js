document.getElementById('orderForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const name = document.getElementById('name').value;
	const street = document.getElementById('street').value;
	const phone = document.getElementById('phone').value;
	const email = document.getElementById('email').value;
	const deliveryDay = document.getElementById('deliveryDay').value;

	if (name && street && phone && email && deliveryDay) {
		localStorage.setItem('orderInfo', JSON.stringify({ name, street, phone, email, deliveryDay}));

		window.open('summary-html.html', '_blank');
	} else {
		alert('Please fill in all fields.');
	}

	localStorage.removeItem('cartItems');
});
