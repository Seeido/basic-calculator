//Object: define arithmetic operations as methods
const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : "Can't divide by zero"), //handle division by zero
};

//Function: perform calculation based on given arithmetic operator
function calculate(a, b, operator) {
  if (operator in operators) {
    return operators[operator](parseFloat(a), parseFloat(b));
  } else {
    return "Error: Invalid operator";
  }
}

//Query selectors
const displayText = document.querySelector(".display-text");
const keys = [...document.querySelectorAll(".key")];

//Necessary variables/values for calculator
let displayValue = "";
let currentOperator;
let firstNum;
let secondNum;

displayText.textContent = displayValue; //set initial 'displayText'

//Loop: add event listeners to all keys to peform applicable actions on click
keys.forEach((i) => {
  if (i.dataset.value === "ac") {
    //AC key (reset everything)
    i.addEventListener("click", () => {
      currentOperator = undefined;
      firstNum = undefined;
      secondNum = undefined;
      displayValue = "";
      displayText.textContent = displayValue;
    });

    return;
  } else if (i.dataset.value === "undo") {
    //Undo key (delete last digit)
    i.addEventListener("click", () => {
      displayValue = displayValue.slice(0, -1); //use 'slice' method to remove last digit
      displayText.textContent = displayValue;
    });

    return;
  } else if (i.dataset.value === "=") {
    //Equals key
    i.addEventListener("click", () => {
      if (
        //make sure necessary value are not empty
        firstNum != undefined &&
        currentOperator != undefined &&
        displayValue != ""
      ) {
        secondNum = displayValue;
        let result = calculate(firstNum, secondNum, currentOperator);

        //handle division by zero
        if (result === "Can't divide by zero") {
          window.alert("You can't divide by zero!");
        } else {
          displayValue = result;
          displayText.textContent = displayValue;

          firstNum = undefined;
          secondNum = undefined;
          currentOperator = undefined;
        }
      }
    });

    return;
  } else if (i.classList.contains("operator-key")) {
    //Operator keys (perform calculation)
    i.addEventListener("click", () => {
      operatorClicked(i.dataset.value); //'operatorClicked' function handles operations
    });

    return;
  } else {
    //Number keys (add number to display)
    i.addEventListener("click", () => {
      if (i.dataset.value === ".") {
        //check if there's already a dot in current number before adding one
        if (displayValue.includes(".")) {
          return;
        } else if (displayValue === "") {
          //make sure a number is placed before adding a dot
          window.alert("Please enter a number/digit first");
          return;
        }
      }
      displayValue += i.dataset.value;
      displayText.textContent = displayValue;
      //check if overflowing, automatically scroll to last added number
      if (displayText.scrollWidth > displayText.clientWidth)
        displayText.scrollTo(displayText.scrollWidth, 0);
    });
  }
});

//Function: check for all possible scenarios and return expected values for operations
function operatorClicked(op) {
  if (
    firstNum === undefined &&
    secondNum === undefined &&
    displayValue === ""
  ) {
    window.alert("Please enter a number first");

    return;
  } else if (
    firstNum === undefined &&
    secondNum === undefined &&
    displayValue != ""
  ) {
    firstNum = displayValue;
    displayValue = "";
    currentOperator = op;

    return;
  } else if (firstNum != undefined && displayValue === "") {
    currentOperator = op;

    return;
  } else if (firstNum != undefined && displayValue != "") {
    secondNum = displayValue;

    let result = calculate(firstNum, secondNum, currentOperator);

    //hande division by zero
    if (result === "Can't divide by zero") {
      window.alert("You can't divide by zero!");
    } else {
      displayValue = result;
      displayText.textContent = displayValue;

      firstNum = result;
      secondNum = undefined;
      currentOperator = op;

      displayValue = "";
    }
  }
}
