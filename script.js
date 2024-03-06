let num1;
let num2;
let operator = "";
const numButtons = document.querySelectorAll(".btn.number")
const opButtons = document.querySelectorAll(".btn.operator")
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const displayValue = document.querySelector(".display-text");
let newNum = true;

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

function operate(a, op, b) {  // Selects the required operation.
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

function storeFirstNum() { // Stores whatever is in the display in num1
    num1 = parseInt(displayValue.textContent)
}

function storeSecondNum() { // Stores whatever is in the display in num2
    num2 = parseInt(displayValue.textContent)
}
function populateDisplay(val) {  // Adds a value to the display
    displayValue.textContent += val;
}

function clearDisplay() {
    displayValue.textContent = "";
}

for (const btn of numButtons) { // Number buttons
    btn.addEventListener('click', () => {

        if (newNum) {
            clearDisplay()
        }

        displayValue.textContent += btn.textContent; // Update display
        newNum = false; // Next number will not be a new number
    })
}

clearBtn.addEventListener('click', () => { // Clears display and resets num1
    clearDisplay()
    num1 = undefined;
})

equalsBtn.addEventListener('click', () => { // Performs calculation
    calculate();
})

for (const btn of opButtons) {      //Operator buttons
    btn.addEventListener('click', () => {
        if (num1 === undefined) {       // Store display value in num1 if empty, if full, calculate.
            storeFirstNum();
        } else {
            calculate()
        }

        operator = btn.textContent;     // Set the operator to the operator button the user clicked.
        newNum = true;                  // tells program that the next number will be a number, different number than
                                        //  previously inputted.
        num1 = parseInt(displayValue.textContent);  // This allows for sums of any length like 3 + 2 * 4 / 9
                                                    // without having to press "-" every time
    })
}

function calculate() {
    storeSecondNum()        // Store the display content as the second number, clear the display and then perform the
    clearDisplay();         // calculation, population display with the result.
    let result = operate(num1, operator, num2);

    removeZeros(result)
}


function removeZeros(result) { // Changes 1.5340000 into 1.534
    let decimalsCount;

    if (result === Math.round(result)) { // If integer
        populateDisplay(result); // Show number in display
    } else {    // If floating point
        let decimals = (Math.round(result) - result);

        if (decimals < 0) {
            decimalsCount = (decimals.toString().length) - 3;// -3 to account for the "-0." in "-0.535"
        } else {
            decimalsCount = (decimals.toString().length) - 2 ; // -2 to account for the "0." in "0.535"
        }

        if (decimalsCount >= 8) {
            populateDisplay(result.toFixed(8))
        } else {
            populateDisplay(result.toFixed(decimalsCount))
        }
    }
}

