import wobble from './animate.js';
import InputController from './input-controller.js';
import HelpTable from './help-table.js';
var inputController = new InputController();
HelpTable.populateHelpTableWithDOMElements();
function inputSwitch(key) {
    var dataAttribute = inputController.getDataAttributeFromKeyInput(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }
    var keys = inputController.getShortcutsFromKeyInput(key);
    if (keys) {
        console.log(key, keys);
    }
    else {
        console.warn('Calculator key not recognized');
    }
}
var _loop_1 = function (el) {
    var handle = InputController.BUTTON_COLLECTION[el];
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
for (var el = 0; el < InputController.BUTTON_COLLECTION.length; el += 1) {
    _loop_1(el);
}
document.body.addEventListener('keydown', function (e) {
    console.log("Pressed: ".concat(e.key));
    inputSwitch(e.key);
}, false);
