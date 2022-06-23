import HTMLFetcher from './html-fetcher.js';
import FrontendMathParserExtension from './frontend-mathparser-extension.js';
var ButtonColor = (function () {
    function ButtonColor() {
        this.buttonColors = {
            NUMBER: ['blue', 'darkblue'],
            CONSTANT: ['purple', 'darkpurple'],
            ACTION: ['green', 'darkgreen'],
            SIMPLE_OPERATOR: ['yellow', 'darkyellow'],
            ADVANCED_OPERATOR: ['orange', 'darkorange'],
            COMPLEX_OPERATOR: ['cyan', 'darkcyan'],
        };
    }
    return ButtonColor;
}());
var Button = (function () {
    function Button(_a) {
        var name = _a.name, xdata = _a.xdata, value = _a.value, display = _a.display, shortcut = _a.shortcut, keytype = _a.keytype, funcHandler = _a.funcHandler;
        this.name = name;
        this.xdata = xdata;
        this.value = value;
        this.display = display;
        this.shortcut = shortcut;
        this.keytype = keytype;
        this.funcHandler = funcHandler;
    }
    return Button;
}());
function numberInput() {
    if (!FrontendMathParserExtension.checkForNullExpression()) {
        HTMLFetcher.getExpression().append(key);
    }
    else {
        HTMLFetcher.setExpression(key);
    }
}
var ButtonCollection = (function () {
    function ButtonCollection() {
    }
    ButtonCollection.ButtonAC = new Button({
        name: 'All Clear',
        xdata: '[data-key-allclear]',
        value: 'ac',
        display: 'AC',
        shortcut: ['Escape', 'Delete'],
        keytype: "[data-action]",
        funcHandler: function () {
            HTMLFetcher.setExpression('0');
            HTMLFetcher.setResult('0');
        },
    });
    ButtonCollection.ButtonEquals = new Button({
        name: 'Equals',
        xdata: '[data-key-equals]',
        value: '=',
        display: '=',
        shortcut: ['=', 'Enter'],
        keytype: "[data-action]",
        funcHandler: function () {
            FrontendMathParserExtension.evaluateExpression();
        },
    });
    ButtonCollection.ButtonOpenParentheses = new Button({
        name: 'Open Parentheses',
        xdata: '[data-key-openparentheses]',
        value: '(',
        display: '(',
        shortcut: ['('],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression('(');
            }
            else {
                HTMLFetcher.getExpression().append('(');
            }
        },
    });
    ButtonCollection.ButtonDecimal = new Button({
        name: 'Decimal',
        xdata: '[data-key-decimal]',
        value: '.',
        display: '.',
        shortcut: ['.', ','],
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (HTMLFetcher.getExpressionText().includes('.') || FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '.')) {
            }
            else {
                HTMLFetcher.getExpression().append('.');
            }
        },
    });
    ButtonCollection.ButtonCloseParentheses = new Button({
        name: 'Close Parentheses',
        xdata: '[data-key-closeparentheses]',
        value: ')',
        display: ')',
        shortcut: [')'],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (FrontendMathParserExtension.checkClosingParenthesesIsAllowed(HTMLFetcher.getExpressionText())) {
                HTMLFetcher.getExpression().append(')');
            }
        },
    });
    ButtonCollection.ButtonNumberZero = new Button({
        name: 'Zero',
        xdata: '[data-key-zero]',
        value: '0',
        display: '0',
        shortcut: ['0'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberOne = new Button({
        name: 'One',
        xdata: '[data-key-one]',
        value: '1',
        display: '1',
        shortcut: ['1'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberTwo = new Button({
        name: 'Two',
        xdata: '[data-key-two]',
        value: '2',
        display: '2',
        shortcut: ['2'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberThree = new Button({
        name: 'Three',
        xdata: '[data-key-three]',
        value: '3',
        display: '3',
        shortcut: ['3'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberFour = new Button({
        name: 'Four',
        xdata: '[data-key-four]',
        value: '4',
        display: '4',
        shortcut: ['4'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberFive = new Button({
        name: 'Five',
        xdata: '[data-key-five]',
        value: '5',
        display: '5',
        shortcut: ['5'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberSix = new Button({
        name: 'Six',
        xdata: '[data-key-six]',
        value: '6',
        display: '6',
        shortcut: ['6'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberSeven = new Button({
        name: 'Seven',
        xdata: '[data-key-seven]',
        value: '7',
        display: '7',
        shortcut: ['7'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberEight = new Button({
        name: 'Eight',
        xdata: '[data-key-eight]',
        value: '8',
        display: '8',
        shortcut: ['8'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonNumberNine = new Button({
        name: 'Nine',
        xdata: '[data-key-nine]',
        value: '9',
        display: '9',
        shortcut: ['9'],
        keytype: "[data-number]",
        funcHandler: function () {
            numberInput();
        },
    });
    ButtonCollection.ButtonAddition = new Button({
        name: 'Plus',
        xdata: '[data-key-plus]',
        value: '+',
        display: '+',
        shortcut: ['+'],
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '+')) {
                HTMLFetcher.getExpression().append('+');
            }
        },
    });
    ButtonCollection.ButtonSubtraction = new Button({
        name: 'Minus',
        xdata: '[data-key-minus]',
        value: '-',
        display: '-',
        shortcut: ['-'],
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '-')) {
                if (FrontendMathParserExtension.checkForNullExpression()) {
                    HTMLFetcher.setExpression('-');
                }
                else {
                    HTMLFetcher.getExpression().append('-');
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
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '/')) {
                HTMLFetcher.getExpression().append('/');
            }
        },
    });
    ButtonCollection.ButtonMultiplication = new Button({
        name: 'Multiply',
        xdata: '[data-key-multiply]',
        value: '*',
        display: '*',
        shortcut: ['*'],
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '*')) {
                HTMLFetcher.getExpression().append('*');
            }
        },
    });
    ButtonCollection.ButtonPercentage = new Button({
        name: 'Percentage',
        xdata: '[data-key-percentage]',
        value: '%',
        display: '&percnt;',
        shortcut: ['p'],
        keytype: "[data-simpleoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '%')) {
                HTMLFetcher.getExpression().append('%');
            }
        },
    });
    ButtonCollection.ButtonBackspace = new Button({
        name: 'Backspace',
        xdata: '[data-key-backspace]',
        value: 'Backspace',
        display: 'C',
        shortcut: ['Backspace', 'c'],
        keytype: "[data-action]",
        funcHandler: function () {
            HTMLFetcher.setExpression(HTMLFetcher.getExpressionText().slice(0, -1));
        },
    });
    ButtonCollection.ButtonLessThan = new Button({
        name: 'Less Than',
        xdata: '[data-key-lt]',
        value: '<',
        display: '&lt;',
        shortcut: ['<'],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('<');
        },
    });
    ButtonCollection.ButtonGreaterThan = new Button({
        name: 'Greater Than',
        xdata: '[data-key-gt]',
        value: '>',
        display: '&gt;',
        shortcut: ['>'],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('>');
        },
    });
    ButtonCollection.ButtonLessThanOrEqual = new Button({
        name: 'Less Than or Equal',
        xdata: '[data-key-lteq]',
        value: '<=',
        display: '&le;',
        shortcut: [],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('<=');
        },
    });
    ButtonCollection.ButtonGreaterThanOrEqual = new Button({
        name: 'Greater Than or Equal',
        xdata: '[data-key-gteq]',
        value: '>=',
        display: '&ge;',
        shortcut: [],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('>=');
        },
    });
    ButtonCollection.ButtonPower = new Button({
        name: 'Power',
        xdata: '[data-key-power]',
        value: '^',
        display: 'x<sup>y</sup>',
        shortcut: ['Dead', '^'],
        keytype: "[data-advancedoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '^')) {
                HTMLFetcher.getExpression().append('^');
            }
        },
    });
    ButtonCollection.ButtonNaturalLogarithm = new Button({
        name: 'Natural Logarithm',
        xdata: '[data-key-naturallog]',
        value: 'ln',
        display: 'Ln',
        shortcut: ['L'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("ln(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('ln(');
            }
        },
    });
    ButtonCollection.ButtonLogarithm = new Button({
        name: 'Logarithm',
        xdata: '[data-key-log]',
        value: 'log',
        display: 'log',
        shortcut: ['l'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("log(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('log(');
            }
        },
    });
    ButtonCollection.ButtonFactorial = new Button({
        name: 'Factorial',
        xdata: '[data-key-factorial]',
        value: '!',
        display: 'x!',
        shortcut: ['!'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('!');
        },
    });
    ButtonCollection.ButtonSquareRoot = new Button({
        name: 'Square Root',
        xdata: '[data-key-squareroot]',
        value: 'sqrt',
        display: '&radic;',
        shortcut: ['r'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("sqrt(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('sqrt(');
            }
        },
    });
    ButtonCollection.ButtonCubicRoot = new Button({
        name: 'Cubic Root',
        xdata: '[data-key-cuberoot]',
        value: '',
        display: 'Cbrt',
        shortcut: [],
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
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("cos(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('cos(');
            }
        },
    });
    ButtonCollection.ButtonSine = new Button({
        name: 'Sinus',
        xdata: '[data-key-sine]',
        value: 'sin',
        display: 'sin',
        shortcut: ['s'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("sin(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('sin(');
            }
        },
    });
    ButtonCollection.ButtonTangent = new Button({
        name: 'Tangent',
        xdata: '[data-key-tangent]',
        value: 'tan',
        display: 'tan',
        shortcut: ['t'],
        keytype: "[data-complexoperator]",
        funcHandler: function () {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression("tan(".concat(HTMLFetcher.getExpressionText(), ")"));
            }
            else {
                HTMLFetcher.setExpression('tan(');
            }
        },
    });
    ButtonCollection.ButtonConstantE = new Button({
        name: 'e',
        xdata: '[data-key-e]',
        value: 'e',
        display: 'e',
        shortcut: ['E'],
        keytype: "[data-constant]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('e');
        },
    });
    ButtonCollection.ButtonConstantPi = new Button({
        name: 'Pi',
        xdata: '[data-key-pi]',
        value: 'pi',
        display: '&pi;',
        shortcut: ['P'],
        keytype: "[data-constant]",
        funcHandler: function () {
            HTMLFetcher.getExpression().append('pi');
        },
    });
    return ButtonCollection;
}());
export default ButtonCollection;
