import ButtonCollection from './calculator-button.js';

export default class InputController {
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

    public getButtonFromKeyInput(key: string): object | void {
        InputController.BUTTON_COLLECTION.forEach((button) => {
            if (button.shortcut.length > 0 && key in button.shortcut) {
                return button;
            }
        });
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
