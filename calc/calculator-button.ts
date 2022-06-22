/* eslint-disable max-classes-per-file */
import HTMLFetcher from './html-fetcher.js';

enum ButtonType {
    NUMBER = '[data-number]',
    CONSTANT = '[data-constant]',
    ACTION = '[data-action]',
    SIMPLE_OPERATOR = '[data-simpleoperator]',
    ADVANCED_OPERATOR = '[data-advancedoperator]',
    COMPLEX_OPERATOR = '[data-complexoperator]',
}
class ButtonColor {
    buttonColors: { [buttonType: string]: [bgColor: string, hoverBgColor: string], } = {
        NUMBER: ['blue', 'darkblue'],
        CONSTANT: ['purple', 'darkpurple'],
        ACTION: ['green', 'darkgreen'],
        SIMPLE_OPERATOR: ['yellow', 'darkyellow'],
        ADVANCED_OPERATOR: ['orange', 'darkorange'],
        COMPLEX_OPERATOR: ['cyan', 'darkcyan'],
    };
}
interface ButtonInterface {
    name: string;
    xdata: string;
    value: string;
    display: string;
    shortcut: string[];
    keytype: ButtonType;
    funcHandler: CallableFunction;
}
export class Button {
    public name: string;

    public xdata: string;

    public value: string;

    public display: string;

    public shortcut: string[];

    public keytype: ButtonType;

    public funcHandler: CallableFunction;

    public constructor({
        name, xdata, value, display, shortcut, keytype, funcHandler,
    }: ButtonInterface) {
        this.name = name;
        this.xdata = xdata;
        this.value = value;
        this.display = display;
        this.shortcut = shortcut;
        this.keytype = keytype;
        this.funcHandler = funcHandler;
    }
}
export class ButtonCollection {
    public static ButtonAC = new Button({
        name: 'All Clear',
        xdata: '[data-action-allclear]',
        value: 'ac',
        display: 'AC',
        shortcut: ['Escape', 'Delete'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {
            HTMLFetcher.setExpression('0');
            HTMLFetcher.setResult('0');
        },
    });

    public static ButtonEquals = new Button({
        name: 'Equals',
        xdata: '[data-action-equals]',
        value: '=',
        display: '=',
        shortcut: ['=', 'Enter'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {

        },
    });

    public static ButtonOpenParentheses = new Button({
        name: 'Open Parentheses',
        xdata: '[data-operator-openparentheses]',
        value: '(',
        display: '(',
        shortcut: ['('],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {

        },
    });

    public static ButtonDecimal = new Button({
        name: 'Decimal',
        xdata: '[data-special-decimal]',
        value: '.',
        display: '.',
        shortcut: ['.', ','],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {

        },
    });

    public static ButtonCloseParentheses = new Button({
        name: 'Close Parentheses',
        xdata: '[data-operator-closeparentheses]',
        value: ')',
        display: ')',
        shortcut: [')'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {

        },
    });

    public static ButtonNumberZero = new Button({
        name: 'Zero',
        xdata: '[data-number-zero]',
        value: '0',
        display: '0',
        shortcut: ['0'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberOne = new Button({
        name: 'One',
        xdata: '[data-number-one]',
        value: '1',
        display: '1',
        shortcut: ['1'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberTwo = new Button({
        name: 'Two',
        xdata: '[data-number-two]',
        value: '2',
        display: '2',
        shortcut: ['2'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberThree = new Button({
        name: 'Three',
        xdata: '[data-number-three]',
        value: '3',
        display: '3',
        shortcut: ['3'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberFour = new Button({
        name: 'Four',
        xdata: '[data-number-four]',
        value: '4',
        display: '4',
        shortcut: ['4'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberFive = new Button({
        name: 'Five',
        xdata: '[data-number-five]',
        value: '5',
        display: '5',
        shortcut: ['5'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberSix = new Button({
        name: 'Six',
        xdata: '[data-number-six]',
        value: '6',
        display: '6',
        shortcut: ['6'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberSeven = new Button({
        name: 'Seven',
        xdata: '[data-number-seven]',
        value: '7',
        display: '7',
        shortcut: ['7'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberEight = new Button({
        name: 'Eight',
        xdata: '[data-number-eight]',
        value: '8',
        display: '8',
        shortcut: ['8'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonNumberNine = new Button({
        name: 'Nine',
        xdata: '[data-number-nine]',
        value: '9',
        display: '9',
        shortcut: ['9'],
        keytype: ButtonType.NUMBER,
        funcHandler: () => {

        },
    });

    public static ButtonAddition = new Button({
        name: 'Plus',
        xdata: '[data-operator-plus]',
        value: '+',
        display: '+',
        shortcut: ['+'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonSubtraction = new Button({
        name: 'Minus',
        xdata: '[data-operator-minus]',
        value: '-',
        display: '-',
        shortcut: ['-'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonDivision = new Button({
        name: 'Divide',
        xdata: '[data-operator-divide]',
        value: '/',
        display: '/',
        shortcut: ['/'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonMultiplication = new Button({
        name: 'Multiply',
        xdata: '[data-operator-multiply]',
        value: '*',
        display: '*',
        shortcut: ['*'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonPercentage = new Button({
        name: 'Percentage',
        xdata: '[data-operator-percentage]',
        value: '%',
        display: '&percnt;',
        shortcut: ['p'],
        keytype: ButtonType.SIMPLE_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonBackspace = new Button({
        name: 'Backspace',
        xdata: '[data-action-backspace]',
        value: 'Backspace',
        display: 'C',
        shortcut: ['Backspace', 'c'],
        keytype: ButtonType.ACTION,
        funcHandler: () => {
        },
    });

    public static ButtonLessThan = new Button({
        name: 'Less Than',
        xdata: '[data-operator-lt]',
        value: '<',
        display: '&lt;',
        shortcut: ['<'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonGreaterThan = new Button({
        name: 'Greater Than',
        xdata: '[data-operator-gt]',
        value: '>',
        display: '&gt;',
        shortcut: ['>'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonLessThanOrEqual = new Button({
        name: 'Less Than or Equal',
        xdata: '[data-operator-lteq]',
        value: '<=',
        display: '&le;',
        shortcut: [],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonGreaterThanOrEqual = new Button({
        name: 'Greater Than or Equal',
        xdata: '[data-operator-gteq]',
        value: '>=',
        display: '&ge;',
        shortcut: [],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonPower = new Button({
        name: 'Power',
        xdata: '[data-operator-power]',
        value: '^',
        display: 'x<sup>y</sup>',
        shortcut: ['Dead', '^'],
        keytype: ButtonType.ADVANCED_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonNaturalLogarithm = new Button({
        name: 'Natural Logarithm',
        xdata: '[data-operator-naturallog]',
        value: 'ln',
        display: 'Ln',
        shortcut: ['L'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonLogarithm = new Button({
        name: 'Logarithm',
        xdata: '[data-operator-log]',
        value: 'log',
        display: 'log',
        shortcut: ['l'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonFactorial = new Button({
        name: 'Factorial',
        xdata: '[data-operator-factorial]',
        value: '!',
        display: 'x!',
        shortcut: ['!'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonSquareRoot = new Button({
        name: 'Square Root',
        xdata: '[data-operator-squareroot]',
        value: 'sqrt',
        display: '&radic;',
        shortcut: ['r'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonCubicRoot = new Button({
        name: 'Cubic Root',
        xdata: '[data-operator-cuberoot]',
        value: '',
        display: 'Cbrt',
        shortcut: [],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonNthRoot = new Button({
        name: 'Nth Root',
        xdata: '[data-operator-nthroot]',
        value: '',
        display: 'NthRt',
        shortcut: [],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonCosine = new Button({
        name: 'Cosine',
        xdata: '[data-operator-cosine]',
        value: 'cos',
        display: 'cos',
        shortcut: ['c'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonSine = new Button({
        name: 'Sinus',
        xdata: '[data-operator-sine]',
        value: 'sin',
        display: 'sin',
        shortcut: ['s'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonTangent = new Button({
        name: 'Tangent',
        xdata: '[data-operator-tangent]',
        value: 'tan',
        display: 'tan',
        shortcut: ['t'],
        keytype: ButtonType.COMPLEX_OPERATOR,
        funcHandler: () => {
        },
    });

    public static ButtonConstantE = new Button({
        name: 'e',
        xdata: '[data-operator-e]',
        value: 'e',
        display: 'e',
        shortcut: ['E'],
        keytype: ButtonType.CONSTANT,
        funcHandler: () => {
        },
    });

    public static ButtonConstantPi = new Button({
        name: 'Pi',
        xdata: '[data-operator-pi]',
        value: 'pi',
        display: '&pi;',
        shortcut: ['P'],
        keytype: ButtonType.CONSTANT,
        funcHandler: () => {
        },
    });
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
{ name: "Cosine", xdata: '[data-operator-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
{ name: "Sinus", xdata: '[data-operator-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
{ name: "Tangent", xdata: '[data-operator-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
{ name: "Cosine", xdata: '[data-operator-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
{ name: "Sinus", xdata: '[data-operator-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
{ name: "Tangent", xdata: '[data-operator-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
*/