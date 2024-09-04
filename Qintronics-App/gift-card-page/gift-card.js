document.addEventListener("DOMContentLoaded", function () {
  setupRadioGroupListeners();
  setupCustomAmountListener();
  setupDeliveryOptionListeners();
  setupCardSelection();
  setupInputFieldFocus();
  setupFormValidation();
  setupEmailValidation();
  setupAmountValidation();
  initializeEmailInputs();
  setupCartFunctionality();
});

// Gift card template
const giftCardTemplate = {
  id: "GIFT", // This will be replaced with a unique ID for each card
  category: "eGift Cards",
  brand: "Qintronics",
  name: "Qintronics eGift Card",
  description:
    "Qintronics eGift Card that can be used to purchase millions of items.",
  message: "",
  img: "/gift-card-image-for-cart/istockphoto-1179439557-612x612.jpg",
  specifications: {
    amount: "",
    currency: "Euro",
    expiryDate: "2026-01-01",
    redeemableAt: "Qintronics.com",
  },
  price: "",
  warranty: "N/A",
  availability: 100,
};

// Function to generate a unique ID
function generateUniqueId() {
  return "xxxx-xxxx-xxxx-xxxx".replace(/[x]/g, function () {
    return ((Math.random() * 9) | 0).toString();
  });
}

// Setup listeners for the radio group
function setupRadioGroupListeners() {
  const radioGroup = document.querySelector(".radio-group");
  if (radioGroup) {
    radioGroup.addEventListener("change", function (e) {
      document.querySelector("#customAmount").value = e.target.value;
    });
  }
}

// Setup listener for the custom amount input
function setupCustomAmountListener() {
  const customAmountInput = document.querySelector("#customAmount");
  if (customAmountInput) {
    customAmountInput.addEventListener("input", function () {
      let radios = document.querySelectorAll(
        '.radio-group input[type="radio"]'
      );
      radios.forEach((radio) => (radio.checked = false));
    });
  }
}

// Setup listeners for delivery options
function setupDeliveryOptionListeners() {
  const sendToRecipient = document.getElementById("sendToRecipient");
  const sendToMe = document.getElementById("sendToMe");

  if (sendToRecipient && sendToMe) {
    sendToRecipient.addEventListener("change", toggleEmailInputs);
    sendToMe.addEventListener("change", toggleEmailInputs);
  }
}

// Toggle email inputs based on delivery option
function toggleEmailInputs() {
  const emailInputs = document.querySelector(".email-inputs");

  if (!emailInputs) return;

  const inputs = emailInputs.querySelectorAll("input");
  if (document.getElementById("sendToRecipient").checked) {
    emailInputs.style.visibility = "visible";
    emailInputs.style.height = "auto";
    inputs.forEach((input) => (input.disabled = false));
  } else {
    emailInputs.style.visibility = "hidden";
    emailInputs.style.height = "0";
    inputs.forEach((input) => (input.disabled = true));
  }
}

// Initialize email inputs state
function initializeEmailInputs() {
  toggleEmailInputs();
}

// Setup card selection functionality
function setupCardSelection() {
  const buttons = document.querySelectorAll(".select-btn");
  const selectedCardInput = document.querySelector("#selectedCard");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const parentCard = this.parentElement;
      const isSelected = parentCard.classList.contains("selected");

      // Reset all buttons to "Select" and remove selected class from cards
      buttons.forEach((btn) => {
        btn.textContent = "Select";
        btn.parentElement.classList.remove("selected");
      });

      if (!isSelected) {
        // Set the clicked button to "Selected" and add selected class to card
        this.textContent = "Selected";
        parentCard.classList.add("selected");
        // Set the value of the hidden input field to the src of the selected card's image
        selectedCardInput.value = this.previousElementSibling.src;
      } else {
        // Deselect the card if it was already selected
        selectedCardInput.value = "";
      }
    });
  });
}

// Setup focus and blur effects for input fields
function setupInputFieldFocus() {
  const inputs = document.querySelectorAll(".form-group input");

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.dataset.placeholder = this.placeholder;
      if (this.id === "from") {
        this.placeholder = "Please enter your name";
      } else if (this.id === "to") {
        this.placeholder = "Please enter the recipient's name";
      }
      this.nextElementSibling.textContent = this.dataset.placeholder;
      this.placeholder = "";
    });

    input.addEventListener("blur", function () {
      if (this.value === "") {
        this.placeholder = this.nextElementSibling.textContent;
        this.nextElementSibling.textContent = "";
      } else {
        this.placeholder = this.dataset.placeholder;
      }
    });
  });
}

// Setup form validation for card selection
function setupFormValidation() {
  const form = document.querySelector("#giftCardForm");
  console.log("form", form);

  if (!form) return;

  form.addEventListener("submit", function (e) {
    const selectedCard = document.querySelector(".selected");

    if (!selectedCard) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        text: "Please select a card design before adding it to the cart.",
      });
    } else {
      // Check if "Send to Recipient" is selected
      const sendToRecipient =
        document.getElementById("sendToRecipient").checked;
      const emailInput = document.getElementById("email").value;
      const confirmEmailInput = document.getElementById("confirmEmail").value;

      // If "Send to Recipient" is selected, validate emails
      if (
        sendToRecipient &&
        (!emailInput || !confirmEmailInput || emailInput !== confirmEmailInput)
      ) {
        e.preventDefault();
        const confirmEmailError = document.getElementById("confirmEmailError");
        confirmEmailError.textContent = "Emails do not match or are empty.";
        return;
      }

      // Prevent default form submission to handle custom cart functionality
      e.preventDefault();
      addToCart();
    }
  });
}

// Setup email validation
function setupEmailValidation() {
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const emailError = document.getElementById("emailError");
  const confirmEmailError = document.getElementById("confirmEmailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput && confirmEmailInput && emailError && confirmEmailError) {
    emailInput.addEventListener("input", function () {
      validateEmail(emailInput, emailError, emailRegex);
    });

    confirmEmailInput.addEventListener("input", function () {
      validateEmail(confirmEmailInput, confirmEmailError, emailRegex);
      validateMatchingEmails(emailInput, confirmEmailInput, confirmEmailError);
    });

    document.querySelector("form").addEventListener("submit", function (event) {
      const sendToRecipient =
        document.getElementById("sendToRecipient").checked;

      if (sendToRecipient && emailInput.value !== confirmEmailInput.value) {
        event.preventDefault();
        confirmEmailError.textContent = "Emails do not match.";
      }
    });
  }
}

// Validate email format
function validateEmail(input, errorElement, regex) {
  if (!regex.test(input.value)) {
    errorElement.textContent = "Please enter a valid email.";
  } else {
    errorElement.textContent = "";
  }
}

// Validate matching emails
function validateMatchingEmails(emailInput, confirmEmailInput, errorElement) {
  if (confirmEmailInput.value !== emailInput.value) {
    errorElement.textContent = "Emails do not match.";
  } else {
    errorElement.textContent = "";
  }
}

// Setup amount validation
function setupAmountValidation() {
  const amountRadios = document.querySelectorAll('input[name="amount"]');
  const customAmountInput = document.getElementById("customAmount");
  const addToCartButton = document.querySelector('button[type="submit"]');
  const amountError = document.createElement("p");
  amountError.id = "amountError";
  amountError.style.color = "red";
  customAmountInput.parentElement.appendChild(amountError);

  function checkAmount() {
    let amountSelected = [...amountRadios].some((radio) => radio.checked);
    let customAmountEntered = customAmountInput.value !== "";

    if (amountSelected || customAmountEntered) {
      amountError.textContent = "";
      return true;
    } else {
      return false;
    }
  }

  amountRadios.forEach((radio) => {
    radio.addEventListener("input", checkAmount);
  });

  customAmountInput.addEventListener("input", checkAmount);

  addToCartButton.addEventListener("click", function (event) {
    if (!checkAmount()) {
      event.preventDefault();
      amountError.textContent = "Please select or choose an amount.";
    }
  });
}

// Setup cart functionality
function setupCartFunctionality() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartDisplay(cartItems);

  // Add to cart function
  window.addToCart = function () {
    const amount =
      document.querySelector('input[name="amount"]:checked')?.value ||
      document.querySelector("#customAmount").value;
    const from = document.querySelector("#from").value;
    const to = document.querySelector("#to").value;
    const message = document.querySelector("#message").value;
    const selectedCard = document.querySelector("#selectedCard").value;
    const emailInput = document.getElementById("email").value;
    const confirmEmailInput = document.getElementById("confirmEmail").value;
    const sendToRecipient = document.getElementById("sendToRecipient").checked;

    if (
      !amount ||
      !from ||
      !to ||
      !selectedCard ||
      (sendToRecipient &&
        (!emailInput || !confirmEmailInput || emailInput !== confirmEmailInput))
    ) {
      //   alert("Please fill in all required fields and select a card.");
      Swal.fire({
        icon: "warning",
        text: "Please fill in all required fields and select a card.",
      });
      return;
    }

    const giftCard = {
      ...giftCardTemplate,
      id: generateUniqueId(), // Assign a unique ID to each gift card
      message,
      img: selectedCard,
      specifications: {
        ...giftCardTemplate.specifications,
        amount: `${amount} Euro`,
      },
      price: amount,
      quantity: 1, // Add default quantity
    };

    console.log("Gift card to add:", giftCard);

    cartItems.push(giftCard);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(
      "Cart items after addition:",
      JSON.parse(localStorage.getItem("cartItems"))
    );
    updateCartDisplay(cartItems);

    // Display SweetAlert2 notification
    Swal.fire({
      title: "Thank you!",
      text: "The gift card is added successfully in the cart!",
      icon: "success",
    });
  };
}

// Update cart display
function updateCartDisplay(cartItems) {
  const cartContainer = document.querySelector("#cart");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.img}" alt="Card Image">
      <p>Id: ${item.id}</p>
      <p>Name: ${item.name}</p>
      <p>Description: ${item.description}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: ${item.price} Euro</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Add event listeners to remove buttons
  const removeButtons = cartContainer.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay(cartItems);
    });
  });
}

// Setup preview functionality
function openPreview(previewDiv) {
  let imageSrc = previewDiv.getAttribute("data-preview-src");

  let previewPopup = document.createElement("div");
  previewPopup.className = "preview-popup";

  let previewImg = document.createElement("img");
  previewImg.src = imageSrc;
  previewPopup.appendChild(previewImg);

  document.body.appendChild(previewPopup);

  previewPopup.addEventListener("click", function () {
    document.body.removeChild(previewPopup);
  });
}
