import ButtonCollection from './calculator-button.js';
var InputController = (function () {
    function InputController(cusorPosition) {
        if (cusorPosition === void 0) { cusorPosition = 0; }
        this.cursorPosition = cusorPosition;
    }
    InputController.prototype.getButtonFromKeyInput = function (key) {
        InputController.BUTTON_COLLECTION.forEach(function (button) {
            if (button.shortcut.length > 0 && key in button.shortcut) {
                return button;
            }
        });
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
export default InputController;
