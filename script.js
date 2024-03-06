let num1;
let num2;
let operator = "";
const numButtons = document.querySelectorAll(".btn.number")
const opButtons = document.querySelectorAll(".btn.operator")
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const displayValue = document.querySelector(".display-text")


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

function storeFirstNum() {
    num1 = parseInt(displayValue.textContent)
}

function storeSecondNum() {
    num2 = parseInt(displayValue.textContent)
}
function populateDisplay(val) {
    displayValue.textContent += val;
}

function clearDisplay() {
    displayValue.textContent = "";
}

for (const btn of numButtons) {
    btn.addEventListener('click', () => {

        if (num1 !== undefined) {
            clearDisplay()
        }

        displayValue.textContent += btn.textContent; // Update display

    })
}

clearBtn.addEventListener('click', () => {
    clearDisplay()
    num1 = undefined;
})

equalsBtn.addEventListener('click', () => {
    calculate();

})


for (const btn of opButtons) {
    btn.addEventListener('click', () => {
        if (num1 === undefined) {
            storeFirstNum();
        } else {
            calculate()
        }

        operator = btn.textContent;

        num1 = parseInt(displayValue.textContent);

    })
}

function calculate() {
    storeSecondNum()
    clearDisplay();
    let result = operate(num1, operator, num2);
    populateDisplay(result);

}