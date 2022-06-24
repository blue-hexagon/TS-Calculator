import flashAnimation from './animate.js';
import { ButtonCollection } from './calculator-button.js';
var InputController = (function () {
    function InputController(cusorPosition) {
        if (cusorPosition === void 0) { cusorPosition = 0; }
        this.cursorPosition = cusorPosition;
    }
    InputController.inputSwitch = function (key) {
        var dataAttribute = InputController.getDataAttributeFromKeyInput(key);
        if (dataAttribute !== null && dataAttribute !== undefined) {
            flashAnimation(dataAttribute);
        }
        var button = InputController.getButtonFromKeyInput(key);
        if (button) {
            button.funcHandler();
        }
        else {
            console.debug('Calculator key not recognized');
        }
    };
    InputController.setup = function () {
        var _loop_1 = function (iter) {
            var handle = InputController.BUTTON_COLLECTION[iter];
            try {
                if (handle !== undefined && handle !== null) {
                    var button = document.querySelector(handle.xdata);
                    button.innerHTML = handle.display;
                    console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
                    button.addEventListener('click', function () {
                        console.info("Clicked: ".concat(handle.value));
                        InputController.inputSwitch(handle.value);
                    }, false);
                }
            }
            catch (error) {
                throw Error("setup:: a query for an element with attribute \"".concat(handle.xdata, "\" returned 'null' or 'undefined'.\nError: ").concat(error, "."));
            }
        };
        for (var iter = 0; iter < InputController.BUTTON_COLLECTION.length; iter += 1) {
            _loop_1(iter);
        }
        document.body.addEventListener('keydown', function (e) {
            console.log("Pressed: ".concat(e.key));
            InputController.inputSwitch(e.key);
        }, false);
    };
    InputController.getButtonFromKeyInput = function (key) {
        for (var _i = 0, _a = InputController.BUTTON_COLLECTION; _i < _a.length; _i++) {
            var button = _a[_i];
            if ((button.shortcut.length > 0 && key in button.shortcut) || key === button.value) {
                console.log("Returning button: ".concat(button));
                return button;
            }
        }
    };
    InputController.getShortcutsFromKeyInput = function (key) {
        InputController.BUTTON_COLLECTION.forEach(function (button) {
            if ((button.shortcut.length > 0 && button.shortcut.includes(key)) || key === button.value) {
                console.log("Returning btn.shortcuts: ".concat(button.shortcut));
                return button.shortcut;
            }
        });
    };
    InputController.getDataAttributeFromKeyInput = function (key) {
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
export default InputController;
