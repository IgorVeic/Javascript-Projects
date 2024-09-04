export class CategoryCards {
  static createCards(objectArray, element) {
    let btnIdNum = 0;
    console.log(objectArray);

    element.innerHTML = `
          <div class="container text-center">
            <div class="row row-cols-2 grid gap-3 row-gap-4 py-4 justify-content-center" id="row-container"></div>
          </div>`;

    objectArray.forEach((object) => {
      document.getElementById("row-container").innerHTML += ` 
            <div class="card shadow border border-0 gen-card-container position-relative overflow-hidden" style="width: 18rem; height: 25rem" id=card-${btnIdNum}>
              <div style="height: 12rem;">
                <a href="/product-details-page/product-details-page.html" target="_blank">
                  <img src="${object.img}" id="img-${btnIdNum}" class="card-img-top gen-img-size go-to-details" alt="Image of ${object.name}">
                </a>
              </div>

              <div class="card-body d-flex flex-column justify-content-between gen-card-body">
                <div>
                  <div class="d-flex align-items-center justify-content-center" style="height:2rem">
                    <a href="/product-details-page/product-details-page.html" target="_blank"><h6 id="title-${btnIdNum}" class="card-title mb-0 gen-card-title go-to-details">${object.name}</h6></a>
                  </div>
                  <hr class="my-2 border-2">
                  <p class="fs-5 d-flex justify-content-center align-items-center">
                    <span id="old-price-${btnIdNum}">$${object.price}</span>
                    <span id="discount-price-${btnIdNum}" class="discount-price"></span>
                  </p>
                </div>

                <div class="d-flex justify-content-between mb-3">
                  <svg class="fav-icons" id="fav-icon-${btnIdNum}" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" fill="currentColor" stroke="currentColor">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> 
                      <g transform="translate(0 -1028.4)"> 
                          <path id="fav-icon-path-${btnIdNum}" class="fav-icon-empty" d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#ffffff"></path> 
                      </g> 
                  </g>
                  </svg>
                  
                  <a class="btn btn-primary cart-btns float-end" id="add-to-cart-${btnIdNum}">Add to cart</a>
                </div>
              </div>
            </div> `;

      if (object.favourited)
        document
          .getElementById(`fav-icon-path-${btnIdNum}`)
          .classList.add("fav-icon-fill");

      if (object.discount) {
        const discountedPrice = Math.round(
          (1 - object.discount / 100) * object.price
        );

        document
          .getElementById(`old-price-${btnIdNum}`)
          .classList.add("old-price");
        document.getElementById(
          `discount-price-${btnIdNum}`
        ).innerHTML = `$${discountedPrice}`;
        document.getElementById(`discount-price-${btnIdNum}`).style.display =
          "inline";

        document.getElementById(`card-${btnIdNum}`).innerHTML += `
          <div class="discount-banner">- ${object.discount}%<div>
        `;
      }

      btnIdNum++;
    });
  }
}
