"use strict";
var HTMLFetcher = (function () {
    function HTMLFetcher() {
    }
    HTMLFetcher.getExpression = function () {
        return document.getElementById('expression');
    };
    HTMLFetcher.getExpressionText = function () {
        return this.getExpression().textContent;
    };
    HTMLFetcher.setExpression = function (str) {
        this.getExpression().textContent = str;
    };
    HTMLFetcher.getResult = function () {
        return document.getElementById('result');
    };
    HTMLFetcher.getResultText = function () {
        return this.getResult().textContent;
    };
    HTMLFetcher.setResult = function (str) {
        this.getResult().textContent = str;
    };
    return HTMLFetcher;
}());
var FrontendMathParserExtension = (function () {
    function FrontendMathParserExtension() {
    }
    FrontendMathParserExtension.evaluateExpression = function () {
        try {
            var result = String(math.round(math.evaluate(HTMLFetcher.getExpression().textContent), 10));
            if (HTMLFetcher.getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
                HTMLFetcher.getResult().innerHTML = String(Boolean(result));
            }
            else {
                HTMLFetcher.getResult().innerHTML = result;
            }
        }
        catch (_a) {
            HTMLFetcher.getResult().innerHTML = 'Fejl';
        }
    };
    FrontendMathParserExtension.checkForNullExpression = function () {
        return HTMLFetcher.getExpressionText() === '0';
    };
    FrontendMathParserExtension.checkCharacterIsNotARepeat = function (appendableString, char) {
        return appendableString[appendableString.length - 1] === char;
    };
    FrontendMathParserExtension.checkClosingParenthesesIsAllowed = function (expressionString) {
        var opens = expressionString.match(/[(]/g);
        var closes = expressionString.match(/[)]/g);
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && (closes === null || closes === void 0 ? void 0 : closes.length)) {
            return (opens.length > closes.length);
        }
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && opens.length > 0) {
            return true;
        }
        return false;
    };
    return FrontendMathParserExtension;
}());
var CalculatorButtonType;
(function (CalculatorButtonType) {
    CalculatorButtonType["NUMBER"] = "[data-number]";
    CalculatorButtonType["CONSTANT"] = "[data-constant]";
    CalculatorButtonType["ACTION"] = "[data-action]";
    CalculatorButtonType["SIMPLE_OPERATOR"] = "[data-simpleoperator]";
    CalculatorButtonType["ADVANCED_OPERATOR"] = "[data-advancedoperator]";
    CalculatorButtonType["COMPLEX_OPERATOR"] = "[data-complexoperator]";
})(CalculatorButtonType || (CalculatorButtonType = {}));
var CalculatorButton = (function () {
    function CalculatorButton(name, xdata, value, display, shortcut, keytype, inputSwitchFunc) {
        this.name = name;
        this.xdata = xdata;
        this.value = value;
        this.display = display;
        this.shortcut = shortcut;
        this.keytype = keytype;
        this.inputSwitch = inputSwitchFunc;
    }
    return CalculatorButton;
}());
var InputController = (function () {
    function InputController(cusorPosition) {
        if (cusorPosition === void 0) { cusorPosition = 0; }
        this.buttonColors = {
            Action: ['green', 'darkgreen'],
            Special: ['purple', 'darkpurple'],
            Number: ['blue', 'darkblue'],
            BasicOperator: ['yellow', 'darkyellow'],
            AdvancedOperator: ['orange', 'darkorange'],
            ComplexOperator: ['cyan', 'darkcyan'],
        };
        this.cursorPosition = cusorPosition;
    }
    InputController.populateHelpTableWithDOMElements = function () {
        var helpTable = document.getElementById('table');
        var tHeader = document.createElement('thead');
        var tHeaderRow = document.createElement('tr');
        var tHeaderRowName = document.createElement('th');
        var tHeaderRowDisplay = document.createElement('th');
        var tHeaderRowShortcuts = document.createElement('th');
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        var tBody = document.createElement('tbody');
        var tFooter = document.createElement('tfoot');
        for (var _i = 0, _a = InputController.HANDLES; _i < _a.length; _i++) {
            var handle = _a[_i];
            var tRow = document.createElement('tr');
            var tColumnName = document.createElement('th');
            var tColumnDisplay = document.createElement('th');
            var tColumnShortcut = document.createElement('th');
            tColumnName.textContent = handle.name;
            tColumnDisplay.innerHTML = handle.display;
            for (var iter in handle.shortcut) {
                if (handle.shortcut[iter] === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,';
                }
                else {
                    tColumnShortcut.textContent += "".concat(handle.shortcut[iter], ", ");
                }
            }
            tColumnShortcut.textContent = tColumnShortcut.textContent.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        }
        helpTable.append(tHeader);
        helpTable.append(tBody);
        helpTable.append(tFooter);
    };
    InputController.prototype.getHandleByCalcKeyLookup = function (key) {
        for (var _i = 0, _a = InputController.HANDLES; _i < _a.length; _i++) {
            var handle = _a[_i];
            if (handle.shortcut.length > 0 && handle.shortcut.includes(key)) {
                return handle.shortcut;
            }
        }
    };
    InputController.prototype.getDataAttributeByCalcKeyLookup = function (key) {
        for (var _i = 0, _a = InputController.HANDLES; _i < _a.length; _i++) {
            var handle = _a[_i];
            if (handle.value === key || handle.display === key) {
                return handle.xdata;
            }
            if (handle.shortcut !== null) {
                for (var _b = 0, _c = handle.shortcut; _b < _c.length; _b++) {
                    var keyboardShortcut = _c[_b];
                    if (keyboardShortcut === key) {
                        return handle.xdata;
                    }
                }
            }
        }
    };
    InputController.ButtonAC = new CalculatorButton('All Clear', '[data-action-allclear]', 'ac', 'AC', ['Escape', 'Delete'], CalculatorButtonType.ACTION, function () {
        HTMLFetcher.setExpression('0');
        HTMLFetcher.setResult('0');
    });
    InputController.handles = new Array(InputController.ButtonAC);
    InputController.HANDLES = [
        {
            name: 'All Clear', xdata: '[data-action-allclear]', value: 'ac', display: 'AC', shortcut: ['Escape', 'Delete'],
        },
        {
            name: 'Equals', xdata: '[data-action-equals]', value: '=', display: '=', shortcut: ['=', 'Enter'],
        },
        {
            name: 'Decimal', xdata: '[data-special-decimal]', value: '.', display: '.', shortcut: ['.', ','],
        },
        {
            name: 'Open Parentheses', xdata: '[data-operator-openparentheses]', value: '(', display: '(', shortcut: ['('],
        },
        {
            name: 'Close Parentheses', xdata: '[data-operator-closeparentheses]', value: ')', display: ')', shortcut: [')'],
        },
        {
            name: 'Zero', xdata: '[data-number-zero]', value: '0', display: '0', shortcut: ['0'],
        },
        {
            name: 'One', xdata: '[data-number-one]', value: '1', display: '1', shortcut: ['1'],
        },
        {
            name: 'Two', xdata: '[data-number-two]', value: '2', display: '2', shortcut: ['2'],
        },
        {
            name: 'Three', xdata: '[data-number-three]', value: '3', display: '3', shortcut: ['3'],
        },
        {
            name: 'Four', xdata: '[data-number-four]', value: '4', display: '4', shortcut: ['4'],
        },
        {
            name: 'Five', xdata: '[data-number-five]', value: '5', display: '5', shortcut: ['5'],
        },
        {
            name: 'Six', xdata: '[data-number-six]', value: '6', display: '6', shortcut: ['6'],
        },
        {
            name: 'Seven', xdata: '[data-number-seven]', value: '7', display: '7', shortcut: ['7'],
        },
        {
            name: 'Eight', xdata: '[data-number-eight]', value: '8', display: '8', shortcut: ['8'],
        },
        {
            name: 'Nine', xdata: '[data-number-nine]', value: '9', display: '9', shortcut: ['9'],
        },
        {
            name: 'Plus', xdata: '[data-operator-plus]', value: '+', display: '+', shortcut: ['+'],
        },
        {
            name: 'Minus', xdata: '[data-operator-minus]', value: '-', display: '-', shortcut: ['-'],
        },
        {
            name: 'Divide', xdata: '[data-operator-divide]', value: '/', display: '/', shortcut: ['/'],
        },
        {
            name: 'Multiply', xdata: '[data-operator-multiply]', value: '*', display: '*', shortcut: ['*'],
        },
        {
            name: 'Percentage', xdata: '[data-operator-percentage]', value: '%', display: '&percnt;', shortcut: ['p'],
        },
        {
            name: 'Backspace', xdata: '[data-action-backspace]', value: 'Backspace', display: 'C', shortcut: ['Backspace', 'c'],
        },
        {
            name: 'Less Than', xdata: '[data-operator-lt]', value: '<', display: '&lt;', shortcut: ['<'],
        },
        {
            name: 'Greater Than', xdata: '[data-operator-gt]', value: '>', display: '&gt;', shortcut: ['>'],
        },
        {
            name: 'Less Than or Equal', xdata: '[data-operator-lteq]', value: '<=', display: '&le;', shortcut: [],
        },
        {
            name: 'Greater Than or Equal', xdata: '[data-operator-gteq]', value: '>=', display: '&ge;', shortcut: [],
        },
        {
            name: 'Power', xdata: '[data-operator-power]', value: '^', display: 'x<sup>y</sup>', shortcut: ['Dead', '^'],
        },
        {
            name: 'Natural Logarithm', xdata: '[data-operator-naturallog]', value: 'ln', display: 'Ln', shortcut: ['L'],
        },
        {
            name: 'Logarithm', xdata: '[data-operator-log]', value: 'log', display: 'log', shortcut: ['l'],
        },
        {
            name: 'Factorial', xdata: '[data-operator-factorial]', value: '!', display: 'x!', shortcut: ['!'],
        },
        {
            name: 'Square Root', xdata: '[data-operator-squareroot]', value: 'sqrt', display: '&radic;', shortcut: ['r'],
        },
        {
            name: 'Cosine', xdata: '[data-operator-cosine]', value: 'cos', display: 'cos', shortcut: ['c'],
        },
        {
            name: 'Sinus', xdata: '[data-operator-sine]', value: 'sin', display: 'sin', shortcut: ['s'],
        },
        {
            name: 'Tangent', xdata: '[data-operator-tangent]', value: 'tan', display: 'tan', shortcut: ['t'],
        },
        {
            name: 'e', xdata: '[data-operator-e]', value: 'e', display: 'e', shortcut: ['E'],
        },
        {
            name: 'Pi', xdata: '[data-operator-pi]', value: 'pi', display: '&pi;', shortcut: ['P'],
        },
    ];
    return InputController;
}());
var inputController = new InputController();
InputController.populateHelpTableWithDOMElements();
var _loop_1 = function (el) {
    var handle = InputController.HANDLES[el];
    try {
        if (handle !== undefined && handle !== null) {
            var el_1 = document.querySelector(handle.xdata);
            el_1.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            el_1.addEventListener('click', function () {
                console.info("Clicked: ".concat(handle.value));
                inputSwitch(handle.value);
            }, false);
        }
    }
    catch (error) {
        throw Error("A query for an element with attribute \"".concat(handle.xdata, "\" returned 'null' or 'undefined'.\nError: ").concat(error));
    }
};
for (var el = 0; el < InputController.HANDLES.length; el++) {
    _loop_1(el);
}
document.body.addEventListener('keydown', function (e) {
    console.info("Pressed: ".concat(e.key));
    inputSwitch(e.key);
}, false);
function wobble(selector) {
    var el = document.querySelector(selector);
    if (el === null && el === undefined) {
        throw Error('Document query returned null or undefined when it should have returned a HTMLElement');
    }
    el.animate([
        { transform: 'translate(0px, 0px)', backgroundColor: 'white' },
        { transform: 'translate(0px, 2px)' },
        { transform: 'translate(0px, 0px)' },
    ], {
        duration: 180,
    });
}
function inputSwitch(key) {
    var dataAttribute = inputController.getDataAttributeByCalcKeyLookup(key);
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
            FrontendMathParserExtension.evaluateExpression();
            break;
        case '.':
        case ',':
            if (HTMLFetcher.getExpressionText().includes('.') || FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '.')) {
                null;
            }
            else {
                HTMLFetcher.getExpression().append('.');
            }
            break;
        case 'Backspace':
        case 'C':
            HTMLFetcher.setExpression(HTMLFetcher.getExpressionText().slice(0, -1));
            break;
        case 'ac':
        case 'Delete':
        case 'Escape':
            HTMLFetcher.setExpression('0');
            HTMLFetcher.setResult('0');
            break;
        case '+':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '+')) {
                HTMLFetcher.getExpression().append('+');
            }
            break;
        case '-':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '-')) {
                if (FrontendMathParserExtension.checkForNullExpression()) {
                    HTMLFetcher.setExpression('-');
                }
                else {
                    HTMLFetcher.getExpression().append('-');
                }
            }
            break;
        case '*':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '*')) {
                HTMLFetcher.getExpression().append('*');
            }
            break;
        case '/':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '/')) {
                HTMLFetcher.getExpression().append('/');
            }
            break;
        case '%':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '%')) {
                HTMLFetcher.getExpression().append('%');
            }
            break;
        case '(':
            if (FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression('(');
            }
            else {
                HTMLFetcher.getExpression().append('(');
            }
            break;
        case ')':
            if (FrontendMathParserExtension.checkClosingParenthesesIsAllowed(HTMLFetcher.getExpressionText())) {
                HTMLFetcher.getExpression().append(')');
            }
            break;
        case 'Dead':
        case '^':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '^')) {
                HTMLFetcher.getExpression().append('^');
            }
            break;
        case 'sqrt':
        case 'r':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("sqrt(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('sqrt(');
            }
            break;
        case 'log':
        case 'l':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("log(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('log(');
            }
            break;
        case 'ln':
        case 'L':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("ln(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('ln(');
            }
            break;
        case '!':
            HTMLFetcher.getExpression().append('!');
            break;
        case 'e':
            HTMLFetcher.getExpression().append('e');
            break;
        case 'pi':
            HTMLFetcher.getExpression().append('pi');
            break;
        case 'sin':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("sin(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('sin(');
            }
            break;
        case 'cos':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("cos(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('cos(');
            }
            break;
        case 'tan':
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("tan(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('tan(');
            }
            break;
        case '>':
            HTMLFetcher.getExpression().append('>');
            break;
        case '<':
            HTMLFetcher.getExpression().append('<');
            break;
        case '>=':
            HTMLFetcher.getExpression().append('>=');
            break;
        case '<=':
            HTMLFetcher.getExpression().append('<=');
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
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.getExpression().append(key);
            }
            else {
                HTMLFetcher.setExpression(key);
            }
            break;
        default:
            console.warn('Calculator key not recognized');
    }
}
