    /******************/
    /* Math functions */
    /******************/

const add = (x, y) => +x + +y;

const substract = (x, y) => +x - +y;

const multiply = (x, y) => +x * +y;

const divide = (x, y) => +x / +y;

const power = (x, y) => Math.pow(+x, +y);

const operate = function(x, operator, y) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return substract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
        case '^':
            return power(x, y);
            break;
        default:
            return;
            break;
    }
}


    /*************************/
    /* Initializer functions */
    /*************************/

const addNumberBtns = function() {
    for (let i = 0; i < 10; i++) {
        const btnNumber = document.createElement('button');
        btnNumber.textContent = i;
        btnNumber.classList.add('btn-number');
        if (i === 0) {
            btnNumber.setAttribute('style', 'grid-row: 5 / 6; grid-column: 2 / 3');
        } else  if (i % 3 !== 0) {
            btnNumber.setAttribute('style', `grid-row: auto; grid-column: ${i % 3} / ${i % 3 + 1};`);
        } else {
            btnNumber.setAttribute('style', `grid-row: auto; grid-column: 3 / 4`);
        }
        btnNumber.addEventListener('click', enterNumber);
        container.appendChild(btnNumber);
    }
}

const addClearBtn = function() {
    const btnClear = document.createElement('button');
    btnClear.textContent = 'C';
    btnClear.setAttribute('id', 'btnClear');
    btnClear.setAttribute('style', 'grid-row: 2 / 3; grid-column: 5 / 6');
    btnClear.addEventListener('click', clearFldDisplay)
    container.appendChild(btnClear);
}

const addSymbolBtns = function() {
    const btnPower = document.createElement('button');
    btnPower.textContent = '^';
    btnPower.classList.add('btn-symbol');
    btnPower.setAttribute('style', 'grid-row: 2 / 3; grid-column: 4 / 5');
    container.appendChild(btnPower);

    const btnAdd = document.createElement('button');
    btnAdd.textContent = '+';
    btnAdd.classList.add('btn-symbol');
    btnAdd.setAttribute('style', 'grid-row: 4 / 5; grid-column: 4 / 5');
    container.appendChild(btnAdd);

    const btnSubstract = document.createElement('button');
    btnSubstract.textContent = '-';
    btnSubstract.classList.add('btn-symbol');
    btnSubstract.setAttribute('style', 'grid-row: 4 / 5; grid-column: 5 / 6');
    container.appendChild(btnSubstract);

    const btnMultiply = document.createElement('button');
    btnMultiply.textContent = '*';
    btnMultiply.classList.add('btn-symbol');
    btnMultiply.setAttribute('style', 'grid-row: 3 / 4; grid-column: 4 / 5');
    container.appendChild(btnMultiply);

    const btnDivide = document.createElement('button');
    btnDivide.textContent = '/';
    btnDivide.classList.add('btn-symbol');
    btnDivide.setAttribute('style', 'grid-row: 3 / 4; grid-column: 5 / 6');
    container.appendChild(btnDivide);

    let btnsSymbol = Array.from(document.querySelectorAll('.btn-symbol'));
    console.log(btnsSymbol);
    btnsSymbol.forEach(btn => btn.addEventListener('click', enterSymbol));
}

const addEqualBtn = function() {
    const btnEqual = document.createElement('button');
    btnEqual.textContent = '=';
    btnEqual.setAttribute('id', 'btnEqual');
    btnEqual.setAttribute('style', 'grid-row: 5 / 6; grid-column: 4 / 6');
    btnEqual.addEventListener('click', calculateInput);
    container.appendChild(btnEqual);
}

const addFloatBtn = function() {
    const btnFloat = document.createElement('button');
    btnFloat.textContent = '.';
    btnFloat.classList.add('btn-symbol');
    btnFloat.setAttribute('style', 'grid-row: 5 / 6; grid-column: 3 / 4');
    btnFloat.addEventListener('click', enterFloatPoint);
    container.appendChild(btnFloat);
}

const addDeleteBtn = function() {
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'D';
    btnDelete.setAttribute('id', 'btnDelete');
    btnDelete.setAttribute('style', 'grid-row: 5 / 6; grid-column: 1 / 2');
    btnDelete.addEventListener('click', deleteLatest)
    container.appendChild(btnDelete);
}


    /********************/
    /* Helper functions */
    /********************/

/* Extracts the value of the clicked number button. */
const enterNumber = (e) => {
    deleteIllegalOperationNotification();
    fldDisplay.textContent += e.target.textContent;
}

/* Applied when the user press 'C' button. */
const clearFldDisplay = () => fldDisplay.textContent = '';

/* Does not allow the user to enter a symbol
 * in case the display field is empty or
 * the last item in the string array is not a number.
 */
const enterSymbol = (e) => {
    deleteIllegalOperationNotification();
    if (!fldDisplay.textContent) return;
    if (!isCorrectInput()) return;
    fldDisplay.textContent += ' ' + e.target.textContent + ' ';
}

/* Ensure user has began entering a number
 * and that only one floating point is added.
 */
const enterFloatPoint = () => {
    deleteIllegalOperationNotification();
    if (!fldDisplay.textContent) return;
    if (!isCorrectInput()) return;
    let stringInput = fldDisplay.textContent.split(" ");
    let latestNumber = stringInput[stringInput.length - 1];
    if (latestNumber % 1 !== 0) return;
    fldDisplay.textContent += '.'; 
}

const calculateInput = function() {
    if (!isCorrectInput()) return;
    // Remove whitespace and convert to array
    let stringInput = fldDisplay.textContent.split(" ");
    let x = stringInput[0]; // Take the first value
    let y, operator;
    let counter = 0; // Keep track of the array

    // Since the y-value will be 2 spaces ahead of x,
    // we know that once we have reached the third to last
    // index in the array, we should not continue.
    while (counter < stringInput.length - 2) {
        operator = stringInput[counter+1];
        y = stringInput[counter+2]; // Take the second value
        if (isZeroDivision(operator, y)) {
            x = 'Illegal operation';
            break;
        }
        // Update the x-value with the result
        x = +operate(x, operator, y).toFixed(5);
        counter += 2; // Skip the operator string
    }
    fldDisplay.textContent = x;
}

/* If an operator is to be deleted,
 * ensures that leading and trailing whitespace is removed,
 * otherwise removes only the last char (i.e. a number).
 */
const deleteLatest = () => {
    if (fldDisplay.textContent.charAt(fldDisplay.textContent.length - 1) === ' ') {
    fldDisplay.textContent = fldDisplay.textContent.slice(0, -3);
    } else {
        fldDisplay.textContent = fldDisplay.textContent.slice(0, -1);
    }
}

/* Last item in the string array mustn't be a symbol or a float point. */
const isCorrectInput = function() {
    let stringInput = fldDisplay.textContent.split(" ");
    let lastItem = stringInput[stringInput.length - 1];
    if (lastItem === '' || lastItem[lastItem.length - 1] === '.') return false;
    return true;
}

const deleteIllegalOperationNotification = () => 
    (fldDisplay.textContent === 'Illegal operation') ? clearFldDisplay() : null;

const isZeroDivision = (operator, y) => operator === '/' && y == 0; 
    

    /****************/
    /***** Main *****/
    /****************/

const container = document.querySelector('#container');

const fldDisplay = document.createElement('div');
fldDisplay.setAttribute('id', 'fldDisplay');
container.appendChild(fldDisplay);

addNumberBtns();
addClearBtn();
addSymbolBtns();
addEqualBtn();
addFloatBtn();
addDeleteBtn();