// Standard Calculator
// Now it’s time for some more challenges! Create a web calculator with all the standard features.
// The calculator should have buttons for the numbers to click (just like calculators in real life, no inputs!).
// It should have buttons for the operations: Sum, Subtract, Multiply and Divide.
// It should also have the standard buttons equals, decimal dot and reset ( C ).
// There should be a display where we can see the numbers that we are entering and results (like calculators in real life).
// The calculator should show error message if number is too large or if we are dividing by zero.
// NOTE: The eval() function is not allowed!

// Selecting elements from the DOM
let numberButtons = document.querySelectorAll("[data-number]");
let operationButtons = document.querySelectorAll("[data-operation]");
let equalsButton = document.querySelector("[data-equals]");
let deleteButton = document.querySelector("[data-delete]");
let allClearButton = document.querySelector("[data-all-clear]");
let previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
let currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
let errorMessage = document.getElementById("error-message");

// Function to create a new calculator
function createCalculator() {
  let currentOperand = "";
  let previousOperand = "";
  let operation;

  // Function to clear the calculator
  function clear() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
    errorMessage.textContent = ""; // Clear any error message
    // Enable all operation buttons and equals button
    operationButtons.forEach(function (button) {
      button.disabled = false;
    });
    equalsButton.disabled = false;
    updateDisplay();
  }

  // Function to delete the last character from the current operand
  function deleteLastCharacterFromOperand() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
  }

  // Function to append a number or decimal point to the current operand
  function appendNumberOrDecimal(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
    updateDisplay();
  }

  // Function to set the operation when an operation button is clicked
  function chooseOperation(selectedOperation) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
  }

  // Function to perform the computation based on the chosen operation
  function compute() {
    let computation;
    let prev = parseFloat(previousOperand);
    let current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        if (current === 0) {
          errorMessage.textContent = "Error: Cannot divide by zero!";
          // Disable all operation buttons and equals button when dividing by zero
          operationButtons.forEach(function (button) {
            button.disabled = true;
          });
          equalsButton.disabled = true;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = "";
    updateDisplay();
  }

  // Function to format numbers
  function getDisplayNumber(number) {
    let stringNumber = number.toString();
    let integerDigits = parseFloat(stringNumber.split(".")[0]);
    let decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // Function to update the display with the current operand and operation
  function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
      previousOperandTextElement.innerText = `${getDisplayNumber(
        previousOperand
      )} ${operation}`;
    } else {
      previousOperandTextElement.innerText = "";
    }
  }

  // Return the public interface for the calculator
  return {
    clear,
    deleteLastCharacterFromOperand,
    appendNumberOrDecimal,
    chooseOperation,
    compute,
  };
}

// Create a new instance of the calculator
let calculator = createCalculator();

// Function to handle keydown events
function handleKeyDown(event) {
  let key = event.key;
  if (key >= "0" && key <= "9") {
    calculator.appendNumberOrDecimal(key);
  } else if (key === ".") {
    calculator.appendNumberOrDecimal(".");
  } else if (key === "+") {
    calculator.chooseOperation("+");
  } else if (key === "-") {
    calculator.chooseOperation("-");
  } else if (key === "*") {
    calculator.chooseOperation("×"); // Press a key "×" for multiplication
  } else if (key === "/") {
    calculator.chooseOperation("÷"); // Press a key "÷" for division
  } else if (key === "Enter" || key === "=") {
    // Press a key "Enter" or "=" for equal
    calculator.compute();
  } else if (key === "Backspace") {
    // Press a key "Backspace" to delete last character from the current operand
    calculator.deleteLastCharacterFromOperand();
  } else if (key === "Escape") {
    // Use "Escape" to restart the calculator
    calculator.clear();
  }
  calculator.updateDisplay();
}

// Add event listener for keydown events
document.addEventListener("keydown", handleKeyDown);

// Event Listeners for the buttons
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumberOrDecimal(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", function (button) {
  calculator.compute();
});

allClearButton.addEventListener("click", function (button) {
  calculator.clear();
});

deleteButton.addEventListener("click", function (button) {
  calculator.deleteLastCharacterFromOperand();
  calculator.updateDisplay();
});
