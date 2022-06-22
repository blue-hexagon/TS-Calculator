"use strict";
class InputController {
    constructor(cusorPosition = 0) {
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
    populateHelpTableWithDOMElements() {
        const helpTable = document.getElementById('table');
        const tHeader = document.createElement('thead');
        const tHeaderRow = document.createElement('tr');
        const tHeaderRowName = document.createElement('th');
        const tHeaderRowDisplay = document.createElement('th');
        const tHeaderRowShortcuts = document.createElement('th');
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        const tBody = document.createElement('tbody');
        const tFooter = document.createElement('tfoot');
        for (const handle of InputController.HANDLES) {
            const tRow = document.createElement('tr');
            const tColumnName = document.createElement('th');
            const tColumnDisplay = document.createElement('th');
            const tColumnShortcut = document.createElement('th');
            tColumnName.textContent = handle.name;
            tColumnDisplay.innerHTML = handle.display;
            for (const iter in handle.shortcut) {
                if (handle.shortcut[iter] === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,';
                }
                else {
                    tColumnShortcut.textContent += `${handle.shortcut[iter]}, `;
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
    }
    getHandleByCalcKeyLookup(key) {
        for (const handle of InputController.HANDLES) {
            if (handle.shortcut.length > 0 && handle.shortcut.includes(key)) {
                return handle.shortcut;
            }
        }
    }
    getDataAttributeByCalcKeyLookup(key) {
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
InputController.ButtonAC = new CalculatorButton('All Clear', '[data-action-allclear]', 'ac', 'AC', ['Escape', 'Delete'], CalculatorButtonType.ACTION, () => {
    setExpression('0');
    setResult('0');
});
InputController.handles = new Array(InputController.ButtonAC);
InputController.HANDLES = new Array({
    name: 'All Clear', xdata: '[data-action-allclear]', value: 'ac', display: 'AC', shortcut: ['Escape', 'Delete'],
}, {
    name: 'Equals', xdata: '[data-action-equals]', value: '=', display: '=', shortcut: ['=', 'Enter'],
}, {
    name: 'Decimal', xdata: '[data-special-decimal]', value: '.', display: '.', shortcut: ['.', ','],
}, {
    name: 'Open Parentheses', xdata: '[data-operator-openparentheses]', value: '(', display: '(', shortcut: ['('],
}, {
    name: 'Close Parentheses', xdata: '[data-operator-closeparentheses]', value: ')', display: ')', shortcut: [')'],
}, {
    name: 'Zero', xdata: '[data-number-zero]', value: '0', display: '0', shortcut: ['0'],
}, {
    name: 'One', xdata: '[data-number-one]', value: '1', display: '1', shortcut: ['1'],
}, {
    name: 'Two', xdata: '[data-number-two]', value: '2', display: '2', shortcut: ['2'],
}, {
    name: 'Three', xdata: '[data-number-three]', value: '3', display: '3', shortcut: ['3'],
}, {
    name: 'Four', xdata: '[data-number-four]', value: '4', display: '4', shortcut: ['4'],
}, {
    name: 'Five', xdata: '[data-number-five]', value: '5', display: '5', shortcut: ['5'],
}, {
    name: 'Six', xdata: '[data-number-six]', value: '6', display: '6', shortcut: ['6'],
}, {
    name: 'Seven', xdata: '[data-number-seven]', value: '7', display: '7', shortcut: ['7'],
}, {
    name: 'Eight', xdata: '[data-number-eight]', value: '8', display: '8', shortcut: ['8'],
}, {
    name: 'Nine', xdata: '[data-number-nine]', value: '9', display: '9', shortcut: ['9'],
}, {
    name: 'Plus', xdata: '[data-operator-plus]', value: '+', display: '+', shortcut: ['+'],
}, {
    name: 'Minus', xdata: '[data-operator-minus]', value: '-', display: '-', shortcut: ['-'],
}, {
    name: 'Divide', xdata: '[data-operator-divide]', value: '/', display: '/', shortcut: ['/'],
}, {
    name: 'Multiply', xdata: '[data-operator-multiply]', value: '*', display: '*', shortcut: ['*'],
}, {
    name: 'Percentage', xdata: '[data-operator-percentage]', value: '%', display: '&percnt;', shortcut: ['p'],
}, {
    name: 'Backspace', xdata: '[data-action-backspace]', value: 'Backspace', display: 'C', shortcut: ['Backspace', 'c'],
}, {
    name: 'Less Than', xdata: '[data-operator-lt]', value: '<', display: '&lt;', shortcut: ['<'],
}, {
    name: 'Greater Than', xdata: '[data-operator-gt]', value: '>', display: '&gt;', shortcut: ['>'],
}, {
    name: 'Less Than or Equal', xdata: '[data-operator-lteq]', value: '<=', display: '&le;', shortcut: [],
}, {
    name: 'Greater Than or Equal', xdata: '[data-operator-gteq]', value: '>=', display: '&ge;', shortcut: [],
}, {
    name: 'Power', xdata: '[data-operator-power]', value: '^', display: 'x<sup>y</sup>', shortcut: ['Dead', '^'],
}, {
    name: 'Natural Logarithm', xdata: '[data-operator-naturallog]', value: 'ln', display: 'Ln', shortcut: ['L'],
}, {
    name: 'Logarithm', xdata: '[data-operator-log]', value: 'log', display: 'log', shortcut: ['l'],
}, {
    name: 'Factorial', xdata: '[data-operator-factorial]', value: '!', display: 'x!', shortcut: ['!'],
}, {
    name: 'Square Root', xdata: '[data-operator-squareroot]', value: 'sqrt', display: '&radic;', shortcut: ['r'],
}, {
    name: 'Cosine', xdata: '[data-operator-cosine]', value: 'cos', display: 'cos', shortcut: ['c'],
}, {
    name: 'Sinus', xdata: '[data-operator-sine]', value: 'sin', display: 'sin', shortcut: ['s'],
}, {
    name: 'Tangent', xdata: '[data-operator-tangent]', value: 'tan', display: 'tan', shortcut: ['t'],
}, {
    name: 'e', xdata: '[data-operator-e]', value: 'e', display: 'e', shortcut: ['E'],
}, {
    name: 'Pi', xdata: '[data-operator-pi]', value: 'pi', display: '&pi;', shortcut: ['P'],
});
