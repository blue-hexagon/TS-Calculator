import ButtonCollection from './calculator-button.js';
import wobble from './animate.js';
var InputController = (function () {
    function InputController(cusorPosition) {
        if (cusorPosition === void 0) { cusorPosition = 0; }
        this.cursorPosition = cusorPosition;
    }
    InputController.populateHelpTableWithDOMElements = function () {
        var helpTable = document.getElementById('table');
        var tHeader = document.createElement('thead');
        var tHeaderRow = document.createElement('tr');
        var tHeaderRowName = document.createElement('th');
        var tHeaderRowDisplay = document.createElement('th');
        var tHeaderRowShortcuts = document.createElement('th');
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        var tBody = document.createElement('tbody');
        var tFooter = document.createElement('tfoot');
        InputController.BUTTON_COLLECTION.forEach(function (button) {
            var tRow = document.createElement('tr');
            var tColumnName = document.createElement('th');
            var tColumnDisplay = document.createElement('th');
            var tColumnShortcut = document.createElement('th');
            console.log(button);
            tColumnName.textContent = button.name;
            tColumnDisplay.innerHTML = button.display;
            button.shortcut.forEach(function (shortcut) {
                if (shortcut === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,';
                }
                else {
                    tColumnShortcut.textContent += "".concat(shortcut, ", ");
                }
            });
            tColumnShortcut.textContent = tColumnShortcut.textContent.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        });
        helpTable.append(tHeader);
        helpTable.append(tBody);
        helpTable.append(tFooter);
    };
    InputController.prototype.getShortcutsFromKeyInput = function (key) {
        for (var _i = 0, _a = InputController.BUTTON_COLLECTION; _i < _a.length; _i++) {
            var button = _a[_i];
            if (button.shortcut.length > 0 && button.shortcut.includes(key)) {
                return button.shortcut;
            }
        }
    };
    InputController.prototype.getDataAttributeFromKeyInput = function (key) {
        for (var _i = 0, _a = InputController.BUTTON_COLLECTION; _i < _a.length; _i++) {
            var button = _a[_i];
            if (button.value === key || button.display === key) {
                return button.xdata;
            }
            if (button.shortcut !== null) {
                for (var _b = 0, _c = button.shortcut; _b < _c.length; _b++) {
                    var keyboardShortcut = _c[_b];
                    if (keyboardShortcut === key) {
                        return button.xdata;
                    }
                }
            }
        }
    };
    InputController.BUTTON_COLLECTION = [
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
        ButtonCollection.ButtonCosine,
        ButtonCollection.ButtonSine,
        ButtonCollection.ButtonTangent,
        ButtonCollection.ButtonConstantE,
        ButtonCollection.ButtonConstantPi,
    ];
    return InputController;
}());
var inputController = new InputController();
InputController.populateHelpTableWithDOMElements();
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
