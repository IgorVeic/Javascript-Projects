document.addEventListener("DOMContentLoaded", () => {
  // Select elements from the DOM
  const logoImage = document.querySelector(".medium");
  const personBtn = document.getElementById("peopleBtn");
  const shipBtn = document.getElementById("shipsBtn");
  const loader = document.getElementById("loader");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const resultDiv = document.getElementById("result");

  let currentPage = 1;
  let currentType = "people";

  // Function to fetch data from a given URL
  function fetchData(url) {
    loader.style.display = "block";
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }

        return response.json();
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }

  // Function to update the table with fetched data
  function updateTable(data, type) {
    const table = document.createElement("table");

    if (type === "people") {
      // Create table headers for people data
      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Gender</th>
          <th>Birth Year</th>
          <th>Appearances</th>
        </tr>
      `;
      // Populate the table with rows of people data
      data.results.forEach((person) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${person.name}</td>
          <td>${person.height}</td>
          <td>${person.mass}</td>
          <td>${person.gender || "N/A"}</td>
          <td>${person.birth_year}</td>
          <td>${person.films.length}</td>
        `;
        table.appendChild(row);
      });
    } else if (type === "starships") {
      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Cost</th>
          <th>People Capacity</th>
          <th>Class</th>
        </tr>
      `;

      data.results.forEach((starship) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${starship.name}</td>
          <td>${starship.model}</td>
          <td>${starship.manufacturer}</td>
          <td>${starship.cost_in_credits}</td>
          <td>${starship.passengers}</td>
          <td>${starship.starship_class}</td>
        `;
        table.appendChild(row);
      });
    }

    resultDiv.innerHTML = "";
    resultDiv.appendChild(table);
  }

  // Function to handle pagination
  function handlePagination(type, page) {
    let apiUrl;

    if (type === "people") {
      apiUrl = `https://swapi.dev/api/${type}/?page=${page}`;
    } else if (type === "starships") {
      apiUrl = `https://swapi.dev/api/${type}/?page=${page}`;
    }

    // Fetch data from the API URL and update the table
    fetchData(apiUrl).then((data) => {
      // debugger;
      updateTable(data, type);

      if (data.previous) {
        prevBtn.style.display = "block";
      } else {
        prevBtn.style.display = "none";
      }
      if (data.next) {
        nextBtn.style.display = "block";
      } else {
        nextBtn.style.display = "none";
      }
    });
  }

  // Event listener
  logoImage.addEventListener("click", () => {
    currentType = "people";
    currentPage = 1;
    handlePagination(currentType, currentPage);
  });

  personBtn.addEventListener("click", () => {
    currentType = "people";
    currentPage = 1;
    handlePagination(currentType, currentPage);
  });

  shipBtn.addEventListener("click", () => {
    currentType = "starships";
    currentPage = 1;
    handlePagination(currentType, currentPage);
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    handlePagination(currentType, currentPage);
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    handlePagination(currentType, currentPage);
  });

  // Initial data load on page load
  handlePagination(currentType, currentPage);
});
