let num1;
let num2;
let operator = "";
const numButtons = document.querySelectorAll(".btn.number")
const opButtons = document.querySelectorAll(".btn.operator")
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const displayValue = document.querySelector(".display-text");
let newNum = true;
const MAX_LENGTH = 12;

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
        console.log("Invalid operator")
    }
}


function populateDisplay(val) {
    let displayText = val.toString();
    if (displayText.length > MAX_LENGTH) {
        // Check if it's a float and needs rounding
        if (displayText.includes('.')) {
            const parts = displayText.split('.');
            const integerPart = parts[0];
            let decimalPart = parts[1];
            // Dynamically adjust decimal places based on the integer part's length
            const maxDecimalPlaces = MAX_LENGTH - integerPart.length - 1; // -1 for the dot
            if (maxDecimalPlaces > 0) {
                // Round the number to fit within the max length
                displayText = parseFloat(val.toFixed(maxDecimalPlaces)).toString();
            } else {
                // No room for decimal part, round to integer
                displayText = Math.round(val).toString();
            }
        } else {
            // If it's an integer just truncate (or consider rounding logic if needed)
            displayText = displayText.substring(0, MAX_LENGTH);
        }
    }
    displayValue.textContent = displayText;
}


function clearDisplay() {
    displayValue.textContent = "";
}

for (const btn of numButtons) { // Number buttons
    btn.addEventListener('click', () => {

        if (newNum) {
            clearDisplay()
        }

        populateDisplay(displayValue.textContent += btn.textContent);
        ; // Update display
        newNum = false; // Next number will not be a new number
    })
}

clearBtn.addEventListener('click', () => { // Clears display and resets num1
    clearDisplay()
    num1 = undefined;
    num2 = undefined;
    operator = undefined
    newNum = true;
})

equalsBtn.addEventListener('click', () => { // Performs calculation
    calculate();
    newNum = true;
})

for (const btn of opButtons) {      //Operator buttons
    btn.addEventListener('click', () => {

        if (num1 === undefined) {
            num1 = parseFloat(displayValue.textContent);
        } else {
            calculate();
        }





        operator = btn.textContent;     // Set the operator to the operator button the user clicked.
        newNum = true;                  // tells program that the next number will be a number, different number than
                                        //  previously inputted.
          // This allows for sums of any length like 3 + 2 * 4 / 9
                                                    // without having to press "-" every time
    })
}

function calculate() {
    num2 = parseFloat(displayValue.textContent)

    if (num2 === 0 && operator === "/") {
        alert("You cannot divide by zero!");
        clearDisplay();
    } else {// Store the display content as the second number, clear the display and then perform the
        clearDisplay();         // calculation, population display with the result.
        let result = operate(num1, operator, num2);
        num1 = result;
        populateDisplay(result, 10);
    }

}







