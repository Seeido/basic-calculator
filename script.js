let currentValue = undefined; //store current value displayed on calculator

//Function: main 'operate' function for calculator
//desc: takes operation and values/arguments and return value returned by performing chosen operation on given arguments
function operate(operation, ...nums) {
  return operation(...nums);
}

//Functions: basic arithmetic functions for calculator
function add(...nums) {
  return nums.reduce((total, i) => {
    return (total += i);
  }, 0);
}

function subtract(...nums) {
  return nums.reduce((total, i) => {
    return (total -= i);
  }, nums[0] * 2);
}

function multiply(...nums) {
  return nums.reduce((total, i) => {
    return (total *= i);
  }, 1);
}

function divide(...nums) {
  return nums.reduce((total, i) => {
    return (total /= i);
  }, nums[0] * nums[0]);
}
