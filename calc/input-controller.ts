import flashAnimation from './animate.js'
import { ButtonCollection, Button } from './calculator-button.js'
export default class InputController {
    public cursorPosition: number

    public constructor(cusorPosition = 0) {
        this.cursorPosition = cusorPosition
    }
    public static BUTTON_COLLECTION: Button[] = [
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
    ]
    public static inputSwitch(key: string) {
        /* Wobble and flash the keys being pressed or clicked */
        const dataAttribute: string | void = InputController.getDataAttributeFromKeyInput(key)
        if (dataAttribute !== null && dataAttribute !== undefined) {
            flashAnimation(dataAttribute)
        }

        /** Run the buttons funcHandler() on keyclick/keypress */
        const button = InputController.getButtonFromKeyInput(key)
        if (button) {
            button.funcHandler()
        } else {
            console.debug('Calculator key not recognized')
        }
    }
    public static setup() {
        /** Setup event listeners for click and keypresses */
        for (let iter = 0; iter < InputController.BUTTON_COLLECTION.length; iter += 1) {
            const handle = InputController.BUTTON_COLLECTION[iter]
            try {
                if (handle !== undefined && handle !== null) {
                    const button = document.querySelector(handle.xdata)
                    /** Set textContent of buttons */
                    button!.innerHTML = handle.display
                    console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata))
                    /** Add click eventlisteners */
                    button!.addEventListener(
                        'click',
                        () => {
                            console.debug(`Clicked: ${handle.value}`)
                            // handle.funcHandler();
                            InputController.inputSwitch(handle.value)
                        },
                        false,
                    )
                }
            } catch (error) {
                throw Error(`setup:: a query for an element with attribute "${handle.xdata}" returned 'null' or 'undefined'.\nError: ${error}.`)
            }
        }
        /** Add keydown eventlisteners */
        document.body.addEventListener(
            'keydown',
            e => {
                console.debug(`Pressed: ${e.key}`)
                InputController.inputSwitch(e.key)
            },
            false,
        )
    }
    public static getButtonFromKeyInput(key: string): Button | void {
        for (const button of InputController.BUTTON_COLLECTION) {
            if ((button.shortcut.length > 0 && button.shortcut.includes(key)) || key === button.value) {
                return button
            }
        }
    }

    public static getShortcutsFromKeyInput(key: string): string[] | [] | void {
        InputController.BUTTON_COLLECTION.forEach(button => {
            if ((button.shortcut.length > 0 && button.shortcut.includes(key)) || key === button.value) {
                return button.shortcut
            }
        })
    }

    public static getDataAttributeFromKeyInput(key: string): string | void {
        for (const button of InputController.BUTTON_COLLECTION) {
            if (button.value === key || button.display === key) {
                return button.xdata
            }

            if (button.shortcut !== null) {
                for (const keyboardShortcut of button.shortcut) {
                    if (keyboardShortcut === key) {
                        return button.xdata
                    }
                }
            }
        }
    }
}
