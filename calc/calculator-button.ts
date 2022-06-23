/* eslint-disable max-classes-per-file */
import HTMLFetcher from './html-fetcher.js'
import FrontendMathParserExtension from './frontend-mathparser-extension.js'

const enum ButtonType {
    NUMBER = '[data-number]',
    CONSTANT = '[data-constant]',
    ACTION = '[data-action]',
    SIMPLE_OPERATOR = '[data-simpleoperator]',
    ADVANCED_OPERATOR = '[data-advancedoperator]',
    COMPLEX_OPERATOR = '[data-complexoperator]',
}
class ButtonColor {
    buttonColors: { [buttonType: string]: [bgColor: string, hoverBgColor: string] } = {
        NUMBER: ['blue', 'darkblue'],
        CONSTANT: ['purple', 'darkpurple'],
        ACTION: ['green', 'darkgreen'],
        SIMPLE_OPERATOR: ['yellow', 'darkyellow'],
        ADVANCED_OPERATOR: ['orange', 'darkorange'],
        COMPLEX_OPERATOR: ['cyan', 'darkcyan'],
    }
}
type ButtonInterface = {
    name: string
    xdata: string
    value: string
    display: string
    shortcut: string[]
    keytype: ButtonType
    funcHandler: CallableFunction
}
export class Button {
    public name: string

    public xdata: string

    public value: string

    public display: string

    public shortcut: string[]

    public keytype: ButtonType

    public funcHandler: CallableFunction

    public constructor({ name, xdata, value, display, shortcut, keytype, funcHandler }: ButtonInterface) {
        this.name = name
        this.xdata = xdata
        this.value = value
        this.display = display
        this.shortcut = shortcut
        this.keytype = keytype
        this.funcHandler = funcHandler
    }
}
function numberInput(key: string) {
    /** Used numerous times for single digits numbers */
    if (!FrontendMathParserExtension.checkForNullExpression()) {
        HTMLFetcher.getExpression().append(key)
    } else {
        HTMLFetcher.setExpression(key)
    }
}
export class ButtonCollection {
    public static ButtonAC = new Button({
        name: 'All Clear',
        xdata: '[data-key-allclear]',
        value: 'ac',
        display: 'AC',
        shortcut: ['Escape', 'Delete'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {
            HTMLFetcher.setExpression('0')
            HTMLFetcher.setResult('0')
        },
    })

    public static ButtonEquals = new Button({
        name: 'Equals',
        xdata: '[data-key-equals]',
        value: '=',
        display: '=',
        shortcut: ['=', 'Enter'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {
            FrontendMathParserExtension.evaluateExpression()
        },
    })

    public static ButtonOpenParentheses = new Button({
        name: 'Open Parentheses',
        xdata: '[data-key-openparentheses]',
        value: '(',
        display: '(',
        shortcut: ['('],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            if (FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression('(')
            } else {
                HTMLFetcher.getExpression().append('(')
            }
        },
    })

    public static ButtonDecimal = new Button({
        name: 'Decimal',
        xdata: '[data-key-decimal]',
        value: '.',
        display: '.',
        shortcut: ['.', ','],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            // eslint-disable-next-line no-empty
            if (HTMLFetcher.getExpressionText().includes('.') || FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '.')) {
            } else {
                HTMLFetcher.getExpression().append('.')
            }
        },
    })

    public static ButtonCloseParentheses = new Button({
        name: 'Close Parentheses',
        xdata: '[data-key-closeparentheses]',
        value: ')',
        display: ')',
        shortcut: [')'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            if (FrontendMathParserExtension.checkClosingParenthesesIsAllowed(HTMLFetcher.getExpressionText())) {
                HTMLFetcher.getExpression().append(')')
            }
        },
    })

    public static ButtonNumberZero = new Button({
        name: 'Zero',
        xdata: '[data-key-zero]',
        value: '0',
        display: '0',
        shortcut: ['0'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('0')
        },
    })

    public static ButtonNumberOne = new Button({
        name: 'One',
        xdata: '[data-key-one]',
        value: '1',
        display: '1',
        shortcut: ['1'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('1')
        },
    })

    public static ButtonNumberTwo = new Button({
        name: 'Two',
        xdata: '[data-key-two]',
        value: '2',
        display: '2',
        shortcut: ['2'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('2')
        },
    })

    public static ButtonNumberThree = new Button({
        name: 'Three',
        xdata: '[data-key-three]',
        value: '3',
        display: '3',
        shortcut: ['3'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('3')
        },
    })

    public static ButtonNumberFour = new Button({
        name: 'Four',
        xdata: '[data-key-four]',
        value: '4',
        display: '4',
        shortcut: ['4'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('4')
        },
    })

    public static ButtonNumberFive = new Button({
        name: 'Five',
        xdata: '[data-key-five]',
        value: '5',
        display: '5',
        shortcut: ['5'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('5')
        },
    })

    public static ButtonNumberSix = new Button({
        name: 'Six',
        xdata: '[data-key-six]',
        value: '6',
        display: '6',
        shortcut: ['6'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('6')
        },
    })

    public static ButtonNumberSeven = new Button({
        name: 'Seven',
        xdata: '[data-key-seven]',
        value: '7',
        display: '7',
        shortcut: ['7'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('7')
        },
    })

    public static ButtonNumberEight = new Button({
        name: 'Eight',
        xdata: '[data-key-eight]',
        value: '8',
        display: '8',
        shortcut: ['8'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('8')
        },
    })

    public static ButtonNumberNine = new Button({
        name: 'Nine',
        xdata: '[data-key-nine]',
        value: '9',
        display: '9',
        shortcut: ['9'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {
            numberInput('9')
        },
    })

    public static ButtonAddition = new Button({
        name: 'Plus',
        xdata: '[data-key-plus]',
        value: '+',
        display: '+',
        shortcut: ['+'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            // TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '+')) {
                HTMLFetcher.getExpression().append('+')
            }
        },
    })

    public static ButtonSubtraction = new Button({
        name: 'Minus',
        xdata: '[data-key-minus]',
        value: '-',
        display: '-',
        shortcut: ['-'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            // TODO: after minus, only numbers allowed
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '-')) {
                if (FrontendMathParserExtension.checkForNullExpression()) {
                    HTMLFetcher.setExpression('-')
                } else {
                    HTMLFetcher.getExpression().append('-')
                }
            }
        },
    })

    public static ButtonDivision = new Button({
        name: 'Divide',
        xdata: '[data-key-divide]',
        value: '/',
        display: '/',
        shortcut: ['/'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            // TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '/')) {
                HTMLFetcher.getExpression().append('/')
            }
        },
    })

    public static ButtonMultiplication = new Button({
        name: 'Multiply',
        xdata: '[data-key-multiply]',
        value: '*',
        display: '*',
        shortcut: ['*'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            // TODO: After multiply, only number or minus if times, divide or +, replace multiply sign
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '*')) {
                HTMLFetcher.getExpression().append('*')
            }
        },
    })

    public static ButtonPercentage = new Button({
        name: 'Percentage',
        xdata: '[data-key-percentage]',
        value: '%',
        display: '&percnt;',
        shortcut: ['p'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '%')) {
                HTMLFetcher.getExpression().append('%')
            }
        },
    })

    public static ButtonBackspace = new Button({
        name: 'Backspace',
        xdata: '[data-key-backspace]',
        value: 'Backspace',
        display: 'C',
        shortcut: ['Backspace', 'c'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {
            HTMLFetcher.setExpression(HTMLFetcher.getExpressionText().slice(0, -1))
        },
    })

    public static ButtonLessThan = new Button({
        name: 'Less Than',
        xdata: '[data-key-lt]',
        value: '<',
        display: '&lt;',
        shortcut: ['<'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('<')
        },
    })

    public static ButtonGreaterThan = new Button({
        name: 'Greater Than',
        xdata: '[data-key-gt]',
        value: '>',
        display: '&gt;',
        shortcut: ['>'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('>')
        },
    })

    public static ButtonLessThanOrEqual = new Button({
        name: 'Less Than or Equal',
        xdata: '[data-key-lteq]',
        value: '<=',
        display: '&le;',
        shortcut: [],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('<=')
        },
    })

    public static ButtonGreaterThanOrEqual = new Button({
        name: 'Greater Than or Equal',
        xdata: '[data-key-gteq]',
        value: '>=',
        display: '&ge;',
        shortcut: [],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('>=')
        },
    })

    public static ButtonPower = new Button({
        name: 'Power',
        xdata: '[data-key-power]',
        value: '^',
        display: 'x<sup>y</sup>',
        shortcut: ['Dead', '^'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '^')) {
                HTMLFetcher.getExpression().append('^')
            }
        },
    })

    public static ButtonNaturalLogarithm = new Button({
        name: 'Natural Logarithm',
        xdata: '[data-key-naturallog]',
        value: 'ln',
        display: 'Ln',
        shortcut: ['L'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`ln(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('ln(')
            }
        },
    })

    public static ButtonLogarithm = new Button({
        name: 'Logarithm',
        xdata: '[data-key-log]',
        value: 'log',
        display: 'log',
        shortcut: ['l'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`log(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('log(')
            }
        },
    })

    public static ButtonFactorial = new Button({
        name: 'Factorial',
        xdata: '[data-key-factorial]',
        value: '!',
        display: 'x!',
        shortcut: ['!'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('!')
        },
    })

    public static ButtonSquareRoot = new Button({
        name: 'Square Root',
        xdata: '[data-key-squareroot]',
        value: 'sqrt',
        display: '&radic;',
        shortcut: ['r'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`sqrt(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('sqrt(')
            }
        },
    })

    public static ButtonCubicRoot = new Button({
        name: 'Cubic Root',
        xdata: '[data-key-cuberoot]',
        value: '',
        display: 'Cbrt',
        shortcut: [],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {},
    })

    public static ButtonNthRoot = new Button({
        name: 'Nth Root',
        xdata: '[data-key-nthroot]',
        value: '',
        display: 'NthRt',
        shortcut: [],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {},
    })

    public static ButtonCosine = new Button({
        name: 'Cosine',
        xdata: '[data-key-cosine]',
        value: 'cos',
        display: 'cos',
        shortcut: ['c'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`cos(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('cos(')
            }
        },
    })

    public static ButtonSine = new Button({
        name: 'Sinus',
        xdata: '[data-key-sine]',
        value: 'sin',
        display: 'sin',
        shortcut: ['s'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`sin(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('sin(')
            }
        },
    })

    public static ButtonTangent = new Button({
        name: 'Tangent',
        xdata: '[data-key-tangent]',
        value: 'tan',
        display: 'tan',
        shortcut: ['t'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
            if (!FrontendMathParserExtension.checkForNullExpression()) {
                HTMLFetcher.setExpression(`tan(${HTMLFetcher.getExpressionText()})`)
            } else {
                HTMLFetcher.setExpression('tan(')
            }
        },
    })

    public static ButtonConstantE = new Button({
        name: 'e',
        xdata: '[data-key-e]',
        value: 'e',
        display: 'e',
        shortcut: ['E'],
        keytype: ButtonType.CONSTANT,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('e')
        },
    })

    public static ButtonConstantPi = new Button({
        name: 'Pi',
        xdata: '[data-key-pi]',
        value: 'pi',
        display: '&pi;',
        shortcut: ['P'],
        keytype: ButtonType.CONSTANT,
        funcHandler: () => {
            HTMLFetcher.getExpression().append('pi')
        },
    })
}
/**
     public static Button = new Button({
        name: '',
        xdata: '',
        value: '',
        display: '',
        shortcut: [],
        keytype: ButtonType.,
        funcHandler: () => {
        },
    });
 */
/**
{ name: "Cosine", xdata: '[data-key-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
{ name: "Sinus", xdata: '[data-key-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
{ name: "Tangent", xdata: '[data-key-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
{ name: "Cosine", xdata: '[data-key-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
{ name: "Sinus", xdata: '[data-key-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
{ name: "Tangent", xdata: '[data-key-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
*/
