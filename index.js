var firstNum = "0";
var secondNum = null;
var operator = null;

console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);

function operate(op, num1, num2) {
    let store;

    switch (op) {
        case "+":
            store = add(num1, num2); 
            break;
        case "-":
            store = subtract(num1, num2);
            break;
        case "*":
            store = multiply(num1, num2);
            break;
        case "/":
            store = divide(num1, num2);
            break;
    }

    document.querySelector("#display").value = store;
    firstNum = `${store}`;
    secondNum = null;
    operator = null;

    if (op === "/" && num2 === 0)
        if (num1 !== 0)
            console.log(`${num1} ${op} ${num2} = undefined\n`);
        else
            console.log(`${num1} ${op} ${num2} = indeterminate\n`);
    else
        console.log(`${num1} ${op} ${num2} = ${store}\n`);
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 !== 0)
        return num1 / num2;
    else
        alert("ERROR: Please don't divide a number with zero!");
    return num1;
}

function clear() {
    document.querySelector("#display").value = "0";
    firstNum = "0";
    secondNum = null;
    operator = null;

    console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);
}

document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.className === "number") {

        if (document.querySelector("#display").value === "0" || (firstNum !== null && operator !== null && secondNum === null))
            document.querySelector("#display").value = event.target.textContent;
        else
            document.querySelector("#display").value += event.target.textContent;


        if (secondNum === operator) // Null === Null, Null === "+",  122 === "+"
            firstNum = document.querySelector("#display").value;
        else
            secondNum = document.querySelector("#display").value;

        console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);
    }
    else if (event.target.className === "operator") {

        if (firstNum !== null && secondNum === null) {

            switch (event.target.textContent) {
                case "➕":
                    operator = "+";
                    break;
                case "➖":
                    operator = "-";
                    break;
                case "✖️":
                    operator = "*";
                    break;
                case "➗":
                    operator = "/";
                    break;
                case "🟰":
                    if (operator !== null)
                        operate(operator, Number(firstNum), Number(firstNum));
                    break;
            }
        }
        else if (operator !== null) {

            operate(operator, Number(firstNum), Number(secondNum));

            if (event.target.textContent !== "🟰") {
                switch (event.target.textContent) {
                    case "➕":
                        operator = "+";
                        break;
                    case "➖":
                        operator = "-";
                        break;
                    case "✖️":
                        operator = "*";
                        break;
                    case "➗":
                        operator = "/";
                        break;
                }
            }
        }
        console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);
    }
    else if (event.target.className === "decimal") {
        if (operator === null) {
            if (!firstNum.includes(".")) {
                document.querySelector("#display").value += ".";
                firstNum += ".";
            }
        }
        else {
            if (secondNum === null) {
                document.querySelector("#display").value = "0.";
                secondNum = "0.";
            }
            else {
                if (!secondNum.includes(".")) {
                    document.querySelector("#display").value += ".";
                    secondNum += ".";
                }
            }
        }
        console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);
    }
});

document.querySelector("#clear").addEventListener("click", clear);

// toLocaleString() to format the number with commas

// toLocaleString().split(",").join("") to remove the commas

// parseFloat(Math.round(Number + 'e' + 2) + 'e-' + 2)) for the rounding

// 9 digits, just the numbers not including the commas and .