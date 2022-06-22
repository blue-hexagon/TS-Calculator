/* eslint max-classes-per-file: 0 */
import HTMLFetcher from './html-fetcher.js';
import ButtonCollection from './calculator-button.js';
import wobble from './animate.js';
import FrontendMathParserExtension from './frontend-mathparser-extension.js';

class InputController {
    public cursorPosition: number;

    public constructor(cusorPosition = 0) {
        this.cursorPosition = cusorPosition;
    }

    public static BUTTON_COLLECTION = [
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
        // ButtonCollection.ButtonCubicRoot,
        // ButtonCollection.ButtonNthRoot,
        ButtonCollection.ButtonCosine,
        ButtonCollection.ButtonSine,
        ButtonCollection.ButtonTangent,
        ButtonCollection.ButtonConstantE,
        ButtonCollection.ButtonConstantPi,
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
        InputController.BUTTON_COLLECTION.forEach((button) => {
            const tRow = document.createElement('tr') as HTMLElement;
            const tColumnName = document.createElement('th') as HTMLElement;
            const tColumnDisplay = document.createElement('th') as HTMLElement;
            const tColumnShortcut = document.createElement('th') as HTMLElement;
            console.log(button);
            tColumnName.textContent = button.name;
            tColumnDisplay.innerHTML = button.display;
            button.shortcut.forEach((shortcut) => {
                if (shortcut === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,'; // A comma is appended so we can slice the last character out, see code below to understand.
                } else {
                    tColumnShortcut.textContent += `${shortcut}, `;
                }
            });
            tColumnShortcut.textContent = tColumnShortcut.textContent!.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        });
        helpTable!.append(tHeader);
        helpTable!.append(tBody);
        helpTable!.append(tFooter);
    }

    public getShortcutsFromKeyInput(key: string): (string | null)[] | void {
        // InputController.BUTTON_COLLECTION.forEach((button) => {

        // });
        for (const button of InputController.BUTTON_COLLECTION) {
            if (button.shortcut.length > 0 && button.shortcut.includes(key)) {
                return button.shortcut;
            }
        }
    }

    public getDataAttributeFromKeyInput(key: string): string | void {
        for (const button of InputController.BUTTON_COLLECTION) {
            if (button.value === key || button.display === key) {
                return button.xdata;
            }

            if (button.shortcut !== null) {
                for (const keyboardShortcut of button.shortcut) {
                    if (keyboardShortcut === key) {
                        return button.xdata;
                    }
                }
            }
        }
    }
}

const inputController = new InputController();
InputController.populateHelpTableWithDOMElements();
function inputSwitch(key: string) {
    /* Wobble and flash the keys being pressed or clicked */
    const dataAttribute: string | void = inputController.getDataAttributeFromKeyInput(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }

    /** Match the keyclick/keypress with an action */
    const keys = inputController.getShortcutsFromKeyInput(key);
    if (keys) {
        console.log(key, keys);
    } else {
        console.warn('Calculator key not recognized');
    }
}
/** Setup event listeners for click and keypresses */
for (let el = 0; el < InputController.BUTTON_COLLECTION.length; el += 1) {
    const handle = InputController.BUTTON_COLLECTION[el];
    try {
        if (handle !== undefined && handle !== null) {
            const el = document.querySelector(handle.xdata);
            /** Set textContent of buttons */
            el!.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            /** Add click eventlisteners */
            el!.addEventListener('click', () => {
                console.info(`Clicked: ${handle.value}`);
                // handle.funcHandler();
                inputSwitch(handle.value);
            }, false);
        }
    } catch (error) {
        throw Error(`A query for an element with attribute "${handle.xdata}" returned 'null' or 'undefined'.\nError: ${error}`);
    }
}
/** Add keydown eventlisteners */
document.body.addEventListener('keydown', (e) => {
    console.log(`Pressed: ${e.key}`);
    // handle.funcHandler();
    inputSwitch(e.key);
}, false);
