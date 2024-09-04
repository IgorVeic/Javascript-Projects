document.addEventListener('DOMContentLoaded', function() {
    const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

    document.getElementById('name').textContent = orderInfo.name;
    document.getElementById('street').textContent = orderInfo.street;
    document.getElementById('phone').textContent = orderInfo.phone;
    document.getElementById('email').textContent = orderInfo.email;
    document.getElementById('deliveryDay').textContent = orderInfo.deliveryDay;   
});