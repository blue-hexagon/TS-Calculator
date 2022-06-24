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
        btn = inputController.getButtonFromKeyInput(key);
        btn.funcHandler();
    }
    else {
        console.warn('Calculator key not recognized');
    }
}
var _loop_1 = function (iter) {
    var handle = InputController.BUTTON_COLLECTION[iter];
    try {
        if (handle !== undefined && handle !== null) {
            var button = document.querySelector(handle.xdata);
            button.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            button.addEventListener('click', function () {
                console.info("Clicked: ".concat(handle.value));
                inputSwitch(handle.value);
            }, false);
        }
    }
    catch (error) {
        throw Error("A query for an element with attribute \"".concat(handle.xdata, "\" returned 'null' or 'undefined'.\nError: ").concat(error));
    }
};
for (var iter = 0; iter < InputController.BUTTON_COLLECTION.length; iter += 1) {
    _loop_1(iter);
}
document.body.addEventListener('keydown', function (e) {
    console.log("Pressed: ".concat(e.key));
    inputSwitch(e.key);
}, false);
