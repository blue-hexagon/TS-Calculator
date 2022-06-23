/* eslint max-classes-per-file: 0 */
import HTMLFetcher from './html-fetcher.js';
import ButtonCollection from './calculator-button.js';
import wobble from './animate.js';
import FrontendMathParserExtension from './frontend-mathparser-extension.js';
import InputController from './input-controller.js';
import HelpTable from './help-table.js';

const inputController = new InputController();
HelpTable.populateHelpTableWithDOMElements();

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
        // inputController.getButtonFromKeyInput(key).funcHandler(key);
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
