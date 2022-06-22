"use strict";
function inputSwitch(key) {
    var dataAttribute = inputController.getDataAttributeFromKeyInput(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }
    if (inputController.getShortcutsFromKeyInput(key)) {
        console.log(key, inputController.getShortcutsFromKeyInput(key));
    }
    else {
        console.warn('Calculator key not recognized');
    }
}
