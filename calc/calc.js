"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CalculatorButtonType;
(function (CalculatorButtonType) {
    CalculatorButtonType["NUMBER"] = "[data-number]";
    CalculatorButtonType["CONSTANT"] = "[data-constant]";
    CalculatorButtonType["ACTION"] = "[data-action]";
    CalculatorButtonType["SIMPLE_OPERATOR"] = "[data-simpleoperator]";
    CalculatorButtonType["ADVANCED_OPERATOR"] = "[data-advancedoperator]";
    CalculatorButtonType["COMPLEX_OPERATOR"] = "[data-complexoperator]";
})(CalculatorButtonType || (CalculatorButtonType = {}));
class CalculatorButton {
    constructor(name, xdata, value, display, shortcut, keytype, inputSwitchFunc) {
        this.name = name;
        this.xdata = xdata;
        this.value = value;
        this.display = display;
        this.shortcut = shortcut;
        this.keytype = keytype;
        this.inputSwitch = inputSwitchFunc;
    }
}
const inputController = new InputController();
inputController.populateHelpTableWithDOMElements();
for (let el = 0; el < InputController.HANDLES.length; el++) {
    const handle = InputController.HANDLES[el];
    try {
        if (handle !== undefined && handle !== null) {
            const el = document.querySelector(handle.xdata);
            el.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            el.addEventListener('click', () => {
                console.info(`Clicked: ${handle.value}`);
                inputSwitch(handle.value);
            }, false);
        }
    }
    catch (error) {
        throw Error(`A query for an element with attribute "${handle.xdata}" returned 'null' or 'undefined'.\nError: ${error}`);
    }
}
document.body.addEventListener('keydown', (e) => {
    console.info(`Pressed: ${e.key}`);
    inputSwitch(e.key);
}, false);
function inputSwitch(key) {
    const dataAttribute = inputController.getDataAttributeByCalcKeyLookup(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }
    if (inputController.getHandleByCalcKeyLookup(key)) {
        console.log(key, inputController.getHandleByCalcKeyLookup(key));
    }
    else {
        console.warn('Calculator key not recognized');
    }
    switch (key) {
        case '=':
        case 'Enter':
            evaluateExpression();
            break;
        case '.':
        case ',':
            if (getExpressionText().includes('.') || checkCharacterIsNotARepeat(getExpressionText(), '.')) {
                null;
            }
            else {
                getExpression().append('.');
            }
            break;
        case 'Backspace':
        case 'C':
            setExpression(getExpressionText().slice(0, -1));
            break;
        case 'ac':
        case 'Delete':
        case 'Escape':
            setExpression('0');
            setResult('0');
            break;
        case '+':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '+')) {
                getExpression().append('+');
            }
            break;
        case '-':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '-')) {
                if (checkForNullExpression()) {
                    setExpression('-');
                }
                else {
                    getExpression().append('-');
                }
            }
            break;
        case '*':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '*')) {
                getExpression().append('*');
            }
            break;
        case '/':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '/')) {
                getExpression().append('/');
            }
            break;
        case '%':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '%')) {
                getExpression().append('%');
            }
            break;
        case '(':
            if (checkForNullExpression()) {
                setExpression('(');
            }
            else {
                getExpression().append('(');
            }
            break;
        case ')':
            if (checkClosingParenthesesIsAllowed(getExpressionText())) {
                getExpression().append(')');
            }
            break;
        case 'Dead':
        case '^':
            if (!checkCharacterIsNotARepeat(getExpressionText(), '^')) {
                getExpression().append('^');
            }
            break;
        case 'sqrt':
        case 'r':
            if (!checkForNullExpression()) {
                setExpression(`sqrt(${getExpressionText()})`);
            }
            else {
                setExpression('sqrt(');
            }
            break;
        case 'log':
        case 'l':
            if (!checkForNullExpression()) {
                setExpression(`log(${getExpressionText()})`);
            }
            else {
                setExpression('log(');
            }
            break;
        case 'ln':
        case 'L':
            if (!checkForNullExpression()) {
                setExpression(`ln(${getExpressionText()})`);
            }
            else {
                setExpression('ln(');
            }
            break;
        case '!':
            getExpression().append('!');
            break;
        case 'e':
            getExpression().append('e');
            break;
        case 'pi':
            getExpression().append('pi');
            break;
        case 'sin':
            if (!checkForNullExpression()) {
                setExpression(`sin(${getExpressionText()})`);
            }
            else {
                setExpression('sin(');
            }
            break;
        case 'cos':
            if (!checkForNullExpression()) {
                setExpression(`cos(${getExpressionText()})`);
            }
            else {
                setExpression('cos(');
            }
            break;
        case 'tan':
            if (!checkForNullExpression()) {
                setExpression(`tan(${getExpressionText()})`);
            }
            else {
                setExpression('tan(');
            }
            break;
        case '>':
            getExpression().append('>');
            break;
        case '<':
            getExpression().append('<');
            break;
        case '>=':
            getExpression().append('>=');
            break;
        case '<=':
            getExpression().append('<=');
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (!checkForNullExpression()) {
                getExpression().append(key);
            }
            else {
                setExpression(key);
            }
            break;
        default:
            console.warn('Calculator key not recognized');
    }
}
function wobble(selector) {
    const el = document.querySelector(selector);
    if (el !== null && el !== undefined) {
        console.log('log', el);
        el.animate([
            { transform: 'translate(0px, 0px)', backgroundColor: 'white' },
            { transform: 'translate(0px, 2px)' },
            { transform: 'translate(0px, 0px)' },
        ], {
            duration: 180,
        });
    }
}
function idElFontSizeScaler(expression, text) {
    if (text.length === 18) {
        if (expression.style.fontSize === '3rem') {
            expression.animate([
                { fontSize: '3rem' },
                { fontSize: '2rem' },
            ], {
                duration: 100,
            });
            expression.style.fontSize = '2rem';
        }
        else if (expression.style.fontSize === '2rem') {
            expression.animate([
                { fontSize: '2rem' },
                { fontSize: '3rem' },
            ], {
                duration: 100,
            });
            expression.style.fontSize = '3rem';
        }
    }
    else if (text.length === 28) {
        if (expression.style.fontSize === '2rem') {
            expression.animate([
                { fontSize: '2rem' },
                { fontSize: '1rem' },
            ], {
                duration: 100,
            });
            expression.style.fontSize = '1rem';
        }
        else if (expression.style.fontSize === '1rem') {
            expression.animate([
                { fontSize: '1rem' },
                { fontSize: '2rem' },
            ], {
                duration: 100,
            });
            expression.style.fontSize = '2rem';
        }
    }
}
