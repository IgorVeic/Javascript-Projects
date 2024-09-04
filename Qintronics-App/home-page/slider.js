document.addEventListener("DOMContentLoaded", function () {
  const companies = [
    { name: "Razer", img: "./imgs/razer.svg" },
    {
      name: "Lenovo",
      img: "./imgs/lenovo-1.svg",
    },
    {
      name: "Samsung",
      img: "./imgs/samsung-seeklogo.svg",
    },
    {
      name: "Apple",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Cooler Master",
      img: "./imgs/cooler-master-logo.svg",
    },
    {
      name: "Dell",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/800px-Dell_Logo.svg.png",
    },
    {
      name: "Logitech",
      img: "./imgs/logitech-gaming-2.svg",
    },
    {
      name: "Asus",
      img: "./imgs/asus-rog-1-1.svg",
    },
  ];

  const slider = document.getElementById("slider");

  companies.forEach((company, index) => {
    const item = document.createElement("div");
    item.className = `item item${index + 1}`;
    item.innerHTML = `
          <div class="item-content">
              <img src="${company.img}" alt="${company.name}">
              <span>${company.name}</span>
          </div>
      `;
    slider.appendChild(item);
  });
});
