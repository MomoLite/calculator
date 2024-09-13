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

    store = parseFloat(Math.round(store + 'e' + 9) + 'e-' + 9);

    if (store.toString().includes(".")) {
        if (store.toString().length <= 10) {
            let splitCommas = store.toString().split(".");
            document.querySelector("#display").value = `${Number(splitCommas[0]).toLocaleString()}.${splitCommas[1]}`;
        }
        else {
            store = store.toExponential();
            document.querySelector("#display").value = store.split("+").join("");
        }
    }
    else {
        if (store.toString().length <= 9) {
            document.querySelector("#display").value = (store).toLocaleString();
        }
        else {
            store = store.toExponential();
            document.querySelector("#display").value = store.split("+").join("");
        }
    }
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
        let removeCommas;
        if (document.querySelector("#display").value === "0" || (firstNum !== null && operator !== null && secondNum === null)) {
            removeCommas = event.target.textContent;
            document.querySelector("#display").value = removeCommas;
        }
        else {
            removeCommas = document.querySelector("#display").value.split(",").join("");
            if (removeCommas.includes(".")) {
                if (removeCommas.length <= 9) {
                    removeCommas += event.target.textContent;
                    let splitCommas = removeCommas.split(".");
                    document.querySelector("#display").value = `${Number(splitCommas[0]).toLocaleString()}.${splitCommas[1]}`;
                }
            }
            else {
                if (removeCommas.length <= 8) {
                    removeCommas += event.target.textContent;
                    document.querySelector("#display").value = (Number(removeCommas)).toLocaleString();
                }
            }
        }

        if (secondNum === operator)
            firstNum = removeCommas;
        else
            secondNum = removeCommas;

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
        let temp;
        if (operator === null) {
            temp = firstNum.split(",").join("");
            if (!temp.includes(".") && temp.length <= 8) {
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
                temp = secondNum.split(",").join("");
                if (!temp.includes(".") && temp.length <= 8) {
                    document.querySelector("#display").value += ".";
                    secondNum += ".";
                }
            }
        }
        console.log(`Num1: ${firstNum}\nNum2: ${secondNum}\nOperator: ${operator}\n`);
    }
});

document.querySelector("#clear").addEventListener("click", clear);

// issues with rounding the e notation big issues

// might add the +/-() sign

// might add the % sign

// add css to make it look nice(guaranteed)

// might add keyboard support