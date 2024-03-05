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

const displayValue = document.querySelector(".display-text")

function populateDisplay(val) {
    displayValue.textContent += val;
}

function clearDisplay() {
    displayValue.textContent = "";
}


const numButtons = document.querySelectorAll(".btn.number")
const clearBtn = document.querySelector(".clear");




for (const btn of numButtons) {
    btn.addEventListener('click', () => {
        populateDisplay(btn.textContent)
    })
}

clearBtn.addEventListener('click', () => {
    clearDisplay()
})
