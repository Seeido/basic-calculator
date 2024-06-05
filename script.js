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
    return operators[operator](a, b);
  } else {
    return "Error: Invalid operator";
  }
}
