let num1;
let num2;
let operator = "";
let isNewNumber = true;
let isNewCalculation = true;
const MAX_LENGTH = 12;

const numButtons = document.querySelectorAll(".btn.number")
const opButtons = document.querySelectorAll(".btn.operator")

const clearBtn = document.querySelector(".clear");
const percentBtn = document.querySelector(".percentage")
const plusMinusBtn = document.querySelector(".plusMinus");
const backBtn = document.querySelector(".backspace");
const equalsBtn = document.querySelector(".equals");
const displayValue = document.querySelector(".display-text");
const pointBtn = document.querySelector(".point");
const infoBtn = document.querySelector(".info");



const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const clearDisplay = () => displayValue.textContent = "";
function operate(a, op, b) {  // Selects the required operation

    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "×") {
        return multiply(a, b);
    } else if (op === "÷") {
        return divide(a, b);
    } else {
        alert("Invalid operator");
    }
}
function populateDisplay(val) {
    let displayText = val.toString();
    if (displayText.length > MAX_LENGTH) {
        // Check if it's a float and needs rounding
        if (displayText.includes('.')) {
            const parts = displayText.split('.');
            const integerPart = parts[0];

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
function calculate() {
    console.log(isNewCalculation, isNewNumber, num1, operator, num2);

    num2 = parseFloat(displayValue.textContent);

    if (num2 === 0 && operator === "÷") {
        alert("You cannot divide by zero!");
        clearDisplay();
    } else {// Store the display content as the second number, clear the display and then perform the
        clearDisplay();         // calculation, population display with the result.
        let result = operate(num1, operator, num2);
        num1 = result;
        populateDisplay(result, 10);
    }

    num2 = undefined;
    isNewCalculation = false;
}



for (const btn of numButtons) { // Number buttons
    btn.addEventListener('click', () => {
        if (isNewNumber) {
            clearDisplay()
            if (btn.textContent === ".") {
                displayValue.textContent = "0"; // Start with 0 if "." is the first input on new entry
            }
        }

        const currentDisplay = displayValue.textContent;
        if (btn.textContent === "." && currentDisplay.includes(".")) {
            return; // Do nothing if trying to add a second decimal point
        } else {
            displayValue.textContent += btn.textContent; // Update display
        }

        if (currentDisplay.includes(".")) {
            pointBtn.setAttribute("disabled", "");
        } else {
            pointBtn.removeAttribute("disabled");
        }

        isNewNumber = false; // Next number will not be a new number
    })
}

for (const btn of opButtons) {      //Operator buttons
    btn.addEventListener('click', () => {
        console.log(isNewCalculation, isNewNumber, num1, num2)

        if (num1 === undefined) {     // Fill num1 if num1 empty (would be the case in first number in calculation)
            num1 = parseFloat(displayValue.textContent);
        } else if (isNewCalculation === true) {
            num1 = parseFloat(displayValue.textContent);
            num2 = parseFloat(displayValue.textContent);
            // calculate();
        } else if (num1 && !num2) {
            num2 = parseFloat(displayValue.textContent);
            calculate();
        }

        operator = btn.textContent;     // Set the operator to the operator button the user clicked.
        isNewNumber = true;                  // tells program that the next number will be a number, different number than
                                        //  previously inputted.
        // This allows for sums of any length like 3 + 2 * 4 / 9
        // without having to press "-" every time
    })
}
clearBtn.addEventListener('click', () => { // Clears display and resets num1
    clearDisplay()
    num1 = undefined;
    num2 = undefined;
    operator = undefined
    isNewNumber = true;
    isNewCalculation = true;
})
backBtn.addEventListener('click', () => {
    let textArr = displayValue.textContent.split("");
    textArr.pop();
    displayValue.textContent = textArr.join("");
})
percentBtn.addEventListener('click', () => { // Convert to percentage
    if (!isNewNumber) {
        let textNum = parseFloat(displayValue.textContent);
        textNum /= 100;

        displayValue.textContent = textNum.toString();
    }
})
plusMinusBtn.addEventListener('click', () => { // Changes positive to negative and vice versa
    if (!isNewNumber) {
        if (displayValue.textContent.includes("-")) { // If negative then remove minus sign
            let textArr = displayValue.textContent.split("");
            textArr.shift();
            displayValue.textContent = textArr.join("");
        } else {     // If positive then add minus sign at the front
            displayValue.textContent = "-" + displayValue.textContent;
        }
    }
})
equalsBtn.addEventListener('click', () => { // Performs calculation
    calculate();
    isNewNumber = true;
    isNewCalculation = true;
})
infoBtn.addEventListener('click', () => {
    alert(`(BACKSPACE) to delete, (ESC) to clear, ( ^ ) for (+/-), everything else matches the key`)
})
document.addEventListener('keydown', (e) => {
    let button;
    let buttonKeys = {
        "0": ".zero",
        "1": ".one",
        "2": ".two",
        "3": ".three",
        "4": ".four",
        "5": ".five",
        "6": ".six",
        "7": ".seven",
        "8": ".eight",
        "9": ".nine",
        "*": ".multiply",
        "-": ".minus",
        "+": ".plus",
        "/": ".divide",
        ".": ".point",
        "^": ".plusMinus",
        "Enter": ".equals",
        "Escape": ".clear",
        "%": ".percentage",
        "Backspace": ".backspace",
    }

    button = document.querySelector(buttonKeys[e.key]);

    button.click();
})






