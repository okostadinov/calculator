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
    btnClear.addEventListener('click', clearfldDisplay)
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

/*  Extracts the clicked number
 *  and adds it to the display div.
 */
const enterNumber = (e) => {
    fldDisplay.textContent += e.target.textContent;
}

/*  Removes any input/output
 *  displayed on the text div.
 */
const clearfldDisplay = () => fldDisplay.textContent = '';

/*  Extract the clicked symbol
 *  and adds it to the display div.
 */
const enterSymbol = (e) => {
    if (!fldDisplay.textContent) return;
    if (checkInput()) return;
    fldDisplay.textContent += ' ' + e.target.textContent + ' ';
}

const calculateInput = function() {
    if (checkInput()) return;
    let stringInput = fldDisplay.textContent.split(" ");
    let x = stringInput[0];
    let y, operator;
    let counter = 0;
    while (counter < stringInput.length - 2) {
        operator = stringInput[counter+1];
        y = stringInput[counter+2];
        if (checkZeroDivision()) {
            x = 'Illegal operation';
            break;
        }
        x = operate(x, operator, y);
        counter += 2;
    }
    fldDisplay.textContent = x;
}

const checkInput = function() {
    let stringInput = fldDisplay.textContent.split(" ");
    return (stringInput[stringInput.length - 1] === '');
    //console.log(+stringInput[stringInput.length - 1]);
    //console.log((Number.isNaN(stringInput[stringInput.length - 1])));
}

const checkZeroDivision = (operator, y) => operator === '/' && y === 0; 

const container = document.querySelector('#container');

const fldDisplay = document.createElement('div');
fldDisplay.setAttribute('id', 'fldDisplay');
container.appendChild(fldDisplay);

addNumberBtns();
addClearBtn();
addSymbolBtns();
addEqualBtn();