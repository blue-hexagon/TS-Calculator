import DOMAccessor from './dom-accessor.js';
var ButtonColor = (function () {
    function ButtonColor() {
    }
    ButtonColor.NUMBER = ['blue', 'darkblue'];
    ButtonColor.CONSTANT = ['purple', 'darkpurple'];
    ButtonColor.ACTION = ['green', 'darkgreen'];
    ButtonColor.SIMPLE_OPERATOR = ['yellow', 'darkyellow'];
    ButtonColor.ADVANCED_OPERATOR = ['orange', 'darkorange'];
    ButtonColor.COMPLEX_OPERATOR = ['cyan', 'darkcyan'];
    return ButtonColor;
}());
var Button = (function () {
    function Button(_a) {
        var name = _a.name, xdata = _a.xdata, value = _a.value, display = _a.display, shortcut = _a.shortcut, keytype = _a.keytype, btnColors = _a.btnColors, funcHandler = _a.funcHandler;
        this.name = name;
        this.xdata = xdata;
        this.value = value;
        this.display = display;
        this.shortcut = shortcut;
        this.keytype = keytype;
        this.btnColors = btnColors;
        this.funcHandler = funcHandler;
    }
    return Button;
}());
export { Button };
var ButtonCollection = (function () {
    function ButtonCollection() {
    }
    ButtonCollection.numberInput = function (key) {
        if (!ButtonCollection.resultIsZero()) {
            DOMAccessor.getExpression().append(key);
        }
        else {
            DOMAccessor.setExpression(key);
        }
    };
    ButtonCollection.resultIsZero = function () {
        return DOMAccessor.getExpressionText() === '0';
    };
    ButtonCollection.checkCharacterIsNotARepeat = function (appendableString, char) {
        return appendableString[appendableString.length - 1] === char;
    };
    ButtonCollection.checkClosingParenthesesIsAllowed = function (expressionString) {
        var opens = expressionString.match(/[(]/g);
        var closes = expressionString.match(/[)]/g);
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && (closes === null || closes === void 0 ? void 0 : closes.length)) {
            return opens.length > closes.length;
        }
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && opens.length > 0) {
            return true;
        }
        return false;
    };
    ButtonCollection.evaluateExpression = function () {
        try {
            var result = String(math.round(math.evaluate(DOMAccessor.getExpression().textContent), 10));
            if (DOMAccessor.getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
                DOMAccessor.setResult(String(Boolean(result)));
            }
            else {
                DOMAccessor.setResult(result);
            }
        }
        catch (_a) {
            DOMAccessor.setResult('Error');
        }
    };
    ButtonCollection.ButtonAC = new Button({
        name: 'All Clear',
        xdata: '[data-key-allclear]',
        value: 'ac',
        display: 'AC',
        shortcut: ['Escape', 'Delete'],
        btnColors: ButtonColor.ACTION,
        keytype: "[data-action]",
        funcHandler: function () {
            DOMAccessor.setExpression('0');
            DOMAccessor.setResult('0');
        },
    });
    ButtonCollection.ButtonEquals = new Button({
        name: 'Equals',
        xdata: '[data-key-equals]',
        value: '=',
        display: '=',
        shortcut: ['=', 'Enter'],
        btnColors: ButtonColor.ACTION,
        keytype: "[data-action]",
        funcHandler: function () {
            ButtonCollection.evaluateExpression();
        },
    });
    ButtonCollection.ButtonOpenParentheses = new Button({
        name: 'Open Parentheses',
        xdata: '[data-key-openparentheses]',
        value: '(',
        display: '(',
        shortcut: ['('],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression('(');
            }
            else {
                DOMAccessor.getExpression().append('(');
            }
        },
    });
    ButtonCollection.ButtonDecimal = new Button({
        name: 'Decimal',
        xdata: '[data-key-decimal]',
        value: '.',
        display: '.',
        shortcut: ['.', ','],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (DOMAccessor.getExpressionText().includes('.') || ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '.')) {
            }
            else {
                DOMAccessor.getExpression().append('.');
            }
        },
    });
    ButtonCollection.ButtonCloseParentheses = new Button({
        name: 'Close Parentheses',
        xdata: '[data-key-closeparentheses]',
        value: ')',
        display: ')',
        shortcut: [')'],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (ButtonCollection.checkClosingParenthesesIsAllowed(DOMAccessor.getExpressionText())) {
                DOMAccessor.getExpression().append(')');
            }
        },
    });
    ButtonCollection.ButtonNumberZero = new Button({
        name: 'Zero',
        xdata: '[data-key-zero]',
        value: '0',
        display: '0',
        shortcut: ['0'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('0');
        },
    });
    ButtonCollection.ButtonNumberOne = new Button({
        name: 'One',
        xdata: '[data-key-one]',
        value: '1',
        display: '1',
        shortcut: ['1'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('1');
        },
    });
    ButtonCollection.ButtonNumberTwo = new Button({
        name: 'Two',
        xdata: '[data-key-two]',
        value: '2',
        display: '2',
        shortcut: ['2'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('2');
        },
    });
    ButtonCollection.ButtonNumberThree = new Button({
        name: 'Three',
        xdata: '[data-key-three]',
        value: '3',
        display: '3',
        shortcut: ['3'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('3');
        },
    });
    ButtonCollection.ButtonNumberFour = new Button({
        name: 'Four',
        xdata: '[data-key-four]',
        value: '4',
        display: '4',
        shortcut: ['4'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('4');
        },
    });
    ButtonCollection.ButtonNumberFive = new Button({
        name: 'Five',
        xdata: '[data-key-five]',
        value: '5',
        display: '5',
        shortcut: ['5'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('5');
        },
    });
    ButtonCollection.ButtonNumberSix = new Button({
        name: 'Six',
        xdata: '[data-key-six]',
        value: '6',
        display: '6',
        shortcut: ['6'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('6');
        },
    });
    ButtonCollection.ButtonNumberSeven = new Button({
        name: 'Seven',
        xdata: '[data-key-seven]',
        value: '7',
        display: '7',
        shortcut: ['7'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('7');
        },
    });
    ButtonCollection.ButtonNumberEight = new Button({
        name: 'Eight',
        xdata: '[data-key-eight]',
        value: '8',
        display: '8',
        shortcut: ['8'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('8');
        },
    });
    ButtonCollection.ButtonNumberNine = new Button({
        name: 'Nine',
        xdata: '[data-key-nine]',
        value: '9',
        display: '9',
        shortcut: ['9'],
        btnColors: ButtonColor.NUMBER,
        keytype: "[data-number]",
        funcHandler: function () {
            ButtonCollection.numberInput('9');
        },
    });
    ButtonCollection.ButtonAddition = new Button({
        name: 'Plus',
        xdata: '[data-key-plus]',
        value: '+',
        display: '+',
        shortcut: ['+'],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '+')) {
                DOMAccessor.getExpression().append('+');
            }
        },
    });
    ButtonCollection.ButtonSubtraction = new Button({
        name: 'Minus',
        xdata: '[data-key-minus]',
        value: '-',
        display: '-',
        shortcut: ['-'],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '-')) {
                if (ButtonCollection.resultIsZero()) {
                    DOMAccessor.setExpression('-');
                }
                else {
                    DOMAccessor.getExpression().append('-');
                }
            }
        },
    });
    ButtonCollection.ButtonDivision = new Button({
        name: 'Divide',
        xdata: '[data-key-divide]',
        value: '/',
        display: '/',
        shortcut: ['/'],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '/')) {
                DOMAccessor.getExpression().append('/');
            }
        },
    });
    ButtonCollection.ButtonMultiplication = new Button({
        name: 'Multiply',
        xdata: '[data-key-multiply]',
        value: '*',
        display: '*',
        shortcut: ['*'],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '*')) {
                DOMAccessor.getExpression().append('*');
            }
        },
    });
    ButtonCollection.ButtonPercentage = new Button({
        name: 'Percentage',
        xdata: '[data-key-percentage]',
        value: '%',
        display: '&percnt;',
        shortcut: ['p'],
        btnColors: ButtonColor.SIMPLE_OPERATOR,
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '%')) {
                DOMAccessor.getExpression().append('%');
            }
        },
    });
    ButtonCollection.ButtonBackspace = new Button({
        name: 'Backspace',
        xdata: '[data-key-backspace]',
        value: 'Backspace',
        display: 'C',
        shortcut: ['Backspace', 'c'],
        btnColors: ButtonColor.ACTION,
        keytype: "[data-action]",
        funcHandler: function () {
            DOMAccessor.setExpression(DOMAccessor.getExpressionText().slice(0, -1));
        },
    });
    ButtonCollection.ButtonLessThan = new Button({
        name: 'Less Than',
        xdata: '[data-key-lt]',
        value: '<',
        display: '&lt;',
        shortcut: ['<'],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('<');
        },
    });
    ButtonCollection.ButtonGreaterThan = new Button({
        name: 'Greater Than',
        xdata: '[data-key-gt]',
        value: '>',
        display: '&gt;',
        shortcut: ['>'],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('>');
        },
    });
    ButtonCollection.ButtonLessThanOrEqual = new Button({
        name: 'Less Than or Equal',
        xdata: '[data-key-lteq]',
        value: '<=',
        display: '&le;',
        shortcut: [],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('<=');
        },
    });
    ButtonCollection.ButtonGreaterThanOrEqual = new Button({
        name: 'Greater Than or Equal',
        xdata: '[data-key-gteq]',
        value: '>=',
        display: '&ge;',
        shortcut: [],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('>=');
        },
    });
    ButtonCollection.ButtonPower = new Button({
        name: 'Power',
        xdata: '[data-key-power]',
        value: '^',
        display: 'x<sup>y</sup>',
        shortcut: ['Dead', '^'],
        btnColors: ButtonColor.ADVANCED_OPERATOR,
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (!ButtonCollection.checkCharacterIsNotARepeat(DOMAccessor.getExpressionText(), '^')) {
                DOMAccessor.getExpression().append('^');
            }
        },
    });
    ButtonCollection.ButtonNaturalLogarithm = new Button({
        name: 'Natural Logarithm',
        xdata: '[data-key-naturallog]',
        value: 'ln',
        display: 'Ln',
        shortcut: ['L'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("ln(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('ln(');
            }
        },
    });
    ButtonCollection.ButtonLogarithm = new Button({
        name: 'Logarithm',
        xdata: '[data-key-log]',
        value: 'log',
        display: 'log',
        shortcut: ['l'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("log(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('log(');
            }
        },
    });
    ButtonCollection.ButtonFactorial = new Button({
        name: 'Factorial',
        xdata: '[data-key-factorial]',
        value: '!',
        display: 'x!',
        shortcut: ['!'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('!');
        },
    });
    ButtonCollection.ButtonSquareRoot = new Button({
        name: 'Square Root',
        xdata: '[data-key-squareroot]',
        value: 'sqrt',
        display: '&radic;',
        shortcut: ['r'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("sqrt(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('sqrt(');
            }
        },
    });
    ButtonCollection.ButtonCubicRoot = new Button({
        name: 'Cubic Root',
        xdata: '[data-key-cuberoot]',
        value: '',
        display: 'Cbrt',
        shortcut: [],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
        },
    });
    ButtonCollection.ButtonNthRoot = new Button({
        name: 'Nth Root',
        xdata: '[data-key-nthroot]',
        value: '',
        display: 'NthRt',
        shortcut: [],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
        },
    });
    ButtonCollection.ButtonCosine = new Button({
        name: 'Cosine',
        xdata: '[data-key-cosine]',
        value: 'cos',
        display: 'cos',
        shortcut: ['c'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("cos(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('cos(');
            }
        },
    });
    ButtonCollection.ButtonSine = new Button({
        name: 'Sinus',
        xdata: '[data-key-sine]',
        value: 'sin',
        display: 'sin',
        shortcut: ['s'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("sin(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('sin(');
            }
        },
    });
    ButtonCollection.ButtonTangent = new Button({
        name: 'Tangent',
        xdata: '[data-key-tangent]',
        value: 'tan',
        display: 'tan',
        shortcut: ['t'],
        btnColors: ButtonColor.COMPLEX_OPERATOR,
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!ButtonCollection.resultIsZero()) {
                DOMAccessor.setExpression("tan(".concat(DOMAccessor.getExpressionText(), ")"));
            }
            else {
                DOMAccessor.setExpression('tan(');
            }
        },
    });
    ButtonCollection.ButtonConstantE = new Button({
        name: 'e',
        xdata: '[data-key-e]',
        value: 'e',
        display: 'e',
        shortcut: ['E'],
        btnColors: ButtonColor.CONSTANT,
        keytype: "[data-constant]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('e');
        },
    });
    ButtonCollection.ButtonConstantPi = new Button({
        name: 'Pi',
        xdata: '[data-key-pi]',
        value: 'pi',
        display: '&pi;',
        shortcut: ['P'],
        btnColors: ButtonColor.CONSTANT,
        keytype: "[data-constant]",
        funcHandler: function () {
            DOMAccessor.getExpression().append('pi');
        },
    });
    return ButtonCollection;
}());
export { ButtonCollection };
