const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const phone = contactForm.querySelector('input[name="phone"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (name.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your name!",
      });
      return;
    }

    if (email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      return;
    }

    if (phone.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a phone number!",
      });
      return;
    }

    if (message.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a message!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Message sent successfully! Thank you!",
    });
    contactForm.reset();
  });
});
