let num1;
let num2;
let operator;

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, op, b) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    } else {
        return "Invalid operator"
    }
}
