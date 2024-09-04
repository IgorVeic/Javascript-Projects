// Variable to store the fetched car data
let carsData = [];

// Fetch car data from the URL
fetch("./data/cars.json")
  .then((response) => response.json())
  .then((data) => {
    carsData = data;
    populateTable(carsData);
  })
  .catch((error) => console.error("Error:", error))
  .finally(() => {
    console.log("Fetch operation completed.");
  });

// Select filter elements from the HTML
const typeFilter = document.getElementById("type-filter");
const brandFilter = document.getElementById("brand-filter");
const modelFilter = document.getElementById("model-filter");
const doorsFilter = document.getElementById("doors-filter");
const gasTypeFilter = document.getElementById("gas-type-filter");
const colorFilter = document.getElementById("color-filter");
const newFilter = document.getElementById("new-filter");
const oldFilter = document.getElementById("old-filter");
const horsepowerFilter = document.getElementById("horsepower-filter");
const horsepowerValue = document.getElementById("horsepower-value");
const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");
const carsTableBody = document.getElementById("cars-body");
const noDataFound = document.getElementById("no-data-found");

// Event listener for the filter button
filterButton.addEventListener("click", () => {
  const filteredCars = filterCars(
    carsData,
    typeFilter.value,
    brandFilter.value,
    modelFilter.value,
    doorsFilter.value,
    gasTypeFilter.value,
    colorFilter.value,
    newFilter.checked,
    oldFilter.checked,
    parseInt(horsepowerFilter.value, 10) // Parse the horsepower value to an integer
  );
  populateTable(filteredCars);
});

// Event listener for the reset button
resetButton.addEventListener("click", () => {
  typeFilter.value = "";
  brandFilter.value = "";
  modelFilter.value = "";
  doorsFilter.value = "";
  gasTypeFilter.value = "";
  colorFilter.value = "";
  newFilter.checked = false;
  oldFilter.checked = false;
  horsepowerFilter.value = "0";
  horsepowerValue.textContent = "0";

  // Reset the table to its initial state
  populateTable(carsData);
});

// Update displayed horsepower value when the range input changes
horsepowerFilter.addEventListener("input", () => {
  horsepowerValue.textContent = horsepowerFilter.value;
});

// Populate the table with car data
function populateTable(data) {
  carsTableBody.innerHTML = "";

  if (data.length === 0) {
    // If no data is found, display the no data message and hide the table
    carsTableBody.style.display = "none";
    noDataFound.style.display = "block";
  } else {
    // If data is found, populate the table and display it
    carsTableBody.style.display = "table-row-group";
    noDataFound.style.display = "none";
  }

  // Loop through the filtered data and create table rows for each car
  data.forEach((car) => {
    const row = document.createElement("tr"); // Create a new table row for each car
    row.innerHTML = `
      <td>${car.type}</td>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.doors}</td>
      <td>${car.gasType}</td>
      <td>${car.color}</td>
      <td>${car.isNew ? "Yes" : "No"}</td>
      <td>${car.horsepower}</td>
    `;
    carsTableBody.appendChild(row);
  });
}

// Filter the cars based on all filter inputs
function filterCars(
  data,
  type,
  brand,
  model,
  doors,
  gasType,
  color,
  isNew,
  isOld,
  horsepower
) {
  return data.filter((car) => {
    // Check each car against the filter criteria and return true for matches
    const modelMatch = car.model.toLowerCase().includes(model.toLowerCase()); // Partial search for model
    const colorMatch = car.color.toLowerCase().includes(color.toLowerCase()); // Partial search for color
    return (
      (!type || car.type === type) &&
      (!brand || car.brand === brand) &&
      modelMatch &&
      (!doors || car.doors == doors) &&
      (!gasType || car.gasType === gasType) &&
      (!color || colorMatch) &&
      (!isNew || car.isNew) &&
      (!isOld || !car.isNew) &&
      (!horsepower || car.horsepower <= horsepower)
    );
  });
}
