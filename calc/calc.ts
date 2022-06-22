/* eslint max-classes-per-file: 0 */
import HTMLFetcher from './html-fetcher.js';
import { Button, ButtonCollection } from './calculator-button.js';
import wobble from './animate.js';

class FrontendMathParserExtension {
    public static evaluateExpression(): void {
        /** Checks to see if the expression contains equality operators
           *  - and if so converts and returns the result as a boolean value
           *  - and if not returns the results
           *  - and if the evaluation fails because of an improper expression-string
           *    it returns a localized word for error
           */
        try {
            const result = String(math.round(math.evaluate(HTMLFetcher.getExpression().textContent as string), 10));
            if (HTMLFetcher.getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
                HTMLFetcher.getResult().innerHTML = String(Boolean(result));
            } else {
                HTMLFetcher.getResult().innerHTML = result;
            }
        } catch {
            HTMLFetcher.getResult().innerHTML = 'Fejl';
        }
    }

    public static checkForNullExpression(): boolean {
        return HTMLFetcher.getExpressionText() === '0';
    }

    public static checkCharacterIsNotARepeat(appendableString: string, char: string): boolean {
        return appendableString[appendableString.length - 1] === char;
    }

    public static checkClosingParenthesesIsAllowed(expressionString: string): boolean {
        /* Checks that a closing parentheses is allowed.
         - A closing parentheses is allowed only if the number of opening parentheses >= closing parentheses
         - Otherwise a closing parentheses is not allowed */
        const opens = expressionString.match(/[(]/g);
        const closes = expressionString.match(/[)]/g);
        if (opens?.length && closes?.length) { return (opens.length > closes.length); }
        if (opens?.length && opens.length > 0) { return true; }
        return false;
    }
}

class InputController {
    public cursorPosition: number;

    public constructor(cusorPosition = 0) {
        this.cursorPosition = cusorPosition;
    }

    public static HANDLES = [
        ButtonCollection.ButtonAC,
        ButtonCollection.ButtonEquals,
        ButtonCollection.ButtonOpenParentheses,
        ButtonCollection.ButtonDecimal,
        ButtonCollection.ButtonCloseParentheses,
        ButtonCollection.ButtonNumberZero,
        ButtonCollection.ButtonNumberOne,
        ButtonCollection.ButtonNumberTwo,
        ButtonCollection.ButtonNumberThree,
        ButtonCollection.ButtonNumberFour,
        ButtonCollection.ButtonNumberFive,
        ButtonCollection.ButtonNumberSix,
        ButtonCollection.ButtonNumberSeven,
        ButtonCollection.ButtonNumberEight,
        ButtonCollection.ButtonNumberNine,
        ButtonCollection.ButtonAddition,
        ButtonCollection.ButtonSubtraction,
        ButtonCollection.ButtonDivision,
        ButtonCollection.ButtonMultiplication,
        ButtonCollection.ButtonPercentage,
        ButtonCollection.ButtonBackspace,
        ButtonCollection.ButtonLessThan,
        ButtonCollection.ButtonGreaterThan,
        ButtonCollection.ButtonLessThanOrEqual,
        ButtonCollection.ButtonGreaterThanOrEqual,
        ButtonCollection.ButtonPower,
        ButtonCollection.ButtonNaturalLogarithm,
        ButtonCollection.ButtonLogarithm,
        ButtonCollection.ButtonFactorial,
        ButtonCollection.ButtonSquareRoot,
        ButtonCollection.ButtonCubicRoot,
        ButtonCollection.ButtonNthRoot,
        ButtonCollection.ButtonCosine,
        ButtonCollection.ButtonSine,
        ButtonCollection.ButtonTangent,
        ButtonCollection.ButtonConstantE,
        ButtonCollection.ButtonConstantPi,
    ];

    public static handles = [
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
        // { name: "Cubic Root", xdata: '[data-operator-cuberoot]', value: '' , display: "Cbrt"},
        // { name: "Nth Root", xdata: '[data-operator-nthroot]', value: '' , display: "NthRt"},

        {
            name: 'Cosine', xdata: '[data-operator-cosine]', value: 'cos', display: 'cos', shortcut: ['c'],
        },
        {
            name: 'Sinus', xdata: '[data-operator-sine]', value: 'sin', display: 'sin', shortcut: ['s'],
        },
        {
            name: 'Tangent', xdata: '[data-operator-tangent]', value: 'tan', display: 'tan', shortcut: ['t'],
        },
        /**
        { name: "Cosine", xdata: '[data-operator-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
        { name: "Sinus", xdata: '[data-operator-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
        { name: "Tangent", xdata: '[data-operator-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
        { name: "Cosine", xdata: '[data-operator-cosine]', value: 'cos', display: "cos", shortcut: ["C"] },
        { name: "Sinus", xdata: '[data-operator-sine]', value: 'sin', display: "sin", shortcut: ["S"] },
        { name: "Tangent", xdata: '[data-operator-tangent]', value: 'tan', display: "tan", shortcut: ["T"] },
        */
        {
            name: 'e', xdata: '[data-operator-e]', value: 'e', display: 'e', shortcut: ['E'],
        },
        {
            name: 'Pi', xdata: '[data-operator-pi]', value: 'pi', display: '&pi;', shortcut: ['P'],
        },
    ];

    public static populateHelpTableWithDOMElements(): void {
        /** Prints a help table by iterating over the InputControllers Handles */
        const helpTable = document.getElementById('table') as HTMLElement;
        const tHeader = document.createElement('thead') as HTMLElement;
        const tHeaderRow = document.createElement('tr') as HTMLElement;
        const tHeaderRowName = document.createElement('th') as HTMLElement;
        const tHeaderRowDisplay = document.createElement('th') as HTMLElement;
        const tHeaderRowShortcuts = document.createElement('th') as HTMLElement;
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        const tBody = document.createElement('tbody') as HTMLElement;
        const tFooter = document.createElement('tfoot') as HTMLElement;
        for (const handle of InputController.HANDLES) {
            const tRow = document.createElement('tr') as HTMLElement;
            const tColumnName = document.createElement('th') as HTMLElement;
            const tColumnDisplay = document.createElement('th') as HTMLElement;
            const tColumnShortcut = document.createElement('th') as HTMLElement;
            tColumnName.textContent = handle.name;
            tColumnDisplay.innerHTML = handle.display;
            for (const iter in handle.shortcut) {
                if (handle.shortcut[iter] === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,'; // A comma is appended so we can slice the last character out, see code below to understand.
                } else {
                    tColumnShortcut.textContent += `${handle.shortcut[iter]}, `;
                }
            }
            tColumnShortcut.textContent = tColumnShortcut.textContent!.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        }
        helpTable!.append(tHeader);
        helpTable!.append(tBody);
        helpTable!.append(tFooter);
    }

    public getHandleByCalcKeyLookup(key: string): (string | null)[] | void {
        for (const handle of InputController.HANDLES) {
            if (handle.shortcut.length > 0 && handle.shortcut.includes(key)) {
                return handle.shortcut;
            }
        }
    }

    public getDataAttributeByCalcKeyLookup(key: string): string | void {
        for (const handle of InputController.HANDLES) {
            if (handle.value === key || handle.display === key) {
                return handle.xdata;
            }

            if (handle.shortcut !== null) {
                for (const keyboardShortcut of handle.shortcut) {
                    if (keyboardShortcut === key) {
                        return handle.xdata;
                    }
                }
            }
        }
    }
}

/** -------------------------------------------- */
/** --------------Add-Event-Listeners----------- */
/** -------------------------------------------- */

const inputController = new InputController();
InputController.populateHelpTableWithDOMElements();

for (let el = 0; el < InputController.HANDLES.length; el++) {
    const handle = InputController.HANDLES[el];
    try {
        if (handle !== undefined && handle !== null) {
            const el = document.querySelector(handle.xdata);

            /** Set textContent of buttons */
            el!.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            /** Add click eventlisteners */
            el!.addEventListener('click', () => {
                console.info(`Clicked: ${handle.value}`);
                inputSwitch(handle.value);
            }, false);
        }
    } catch (error) {
        throw Error(`A query for an element with attribute "${handle.xdata}" returned 'null' or 'undefined'.\nError: ${error}`);
    }
}
/** Add keydown eventlisteners */
document.body.addEventListener('keydown', (e) => {
    console.info(`Pressed: ${e.key}`);
    inputSwitch(e.key);
}, false);

/** -------------------------------------------- */
/** --------------Event-Handler----------------- */
/** -------------------------------------------- */

function inputSwitch(key: string) {
    /* Wobble and flash the keys being pressed or clicked */
    const dataAttribute: string | void = inputController.getDataAttributeByCalcKeyLookup(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }

    /** Match the keyclick/keypress with an action */
    if (inputController.getHandleByCalcKeyLookup(key)) {
        console.log(key, inputController.getHandleByCalcKeyLookup(key));
    } else {
        console.warn('Calculator key not recognized');
    }
    switch (key) {
        case '=':
        case 'Enter':
            FrontendMathParserExtension.evaluateExpression();
            break;
        case '.':
        case ',':
            if (HTMLFetcher.getExpressionText().includes('.') || FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '.')) { null; } else { HTMLFetcher.getExpression().append('.'); }
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
        case '+':// TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '+')) { HTMLFetcher.getExpression().append('+'); }
            break;
        case '-':// TODO: after minus, only numbers allowed
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '-')) {
                if (FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression('-'); } else { HTMLFetcher.getExpression().append('-'); }
            }
            break;
        case '*':// TODO: After multiply, only number or minus if times, divide or +, replace multiply sign
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '*')) {
                HTMLFetcher.getExpression().append('*');
            }
            break;
        case '/':// TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '/')) {
                HTMLFetcher.getExpression().append('/');
            }
            break;
        case '%':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '%')) { HTMLFetcher.getExpression().append('%'); }
            break;
        case '(':
            if (FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression('('); } else { HTMLFetcher.getExpression().append('('); }
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
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`sqrt(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('sqrt('); }
            break;
        case 'log':
        case 'l':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`log(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('log('); }
            break;
        case 'ln':
        case 'L':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`ln(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('ln('); }
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
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`sin(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('sin('); }
            break;
        case 'cos':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`cos(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('cos('); }
            break;
        case 'tan':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`tan(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('tan('); }
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
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.getExpression().append(key); } else { HTMLFetcher.setExpression(key); }
            break;
        default:
            console.warn('Calculator key not recognized');
    }
}
