// import math = require('mathjs')
import math from 'mathjs';

/** -------------------------------------------- */
/** --------------Class-Declarations------------ */
/** -------------------------------------------- */
enum CalculatorButtonType {
    NUMBER = '[data-number]',
    CONSTANT = '[data-constant]',
    ACTION = '[data-action]',
    SIMPLE_OPERATOR = '[data-simpleoperator]',
    ADVANCED_OPERATOR = '[data-advancedoperator]',
    COMPLEX_OPERATOR = '[data-complexoperator]'
}
class CalculatorButton {
  public name: string;

  public xdata: string;

  public value: string;

  public display: string;

  public shortcut: string[];

  public keytype: CalculatorButtonType;

  public inputSwitch: CallableFunction;

  public constructor(name: string, xdata: string, value: string, display: string, shortcut: string[], keytype: CalculatorButtonType, inputSwitchFunc: CallableFunction) {
    this.name = name;
    this.xdata = xdata;
    this.value = value;
    this.display = display;
    this.shortcut = shortcut;
    this.keytype = keytype;
    this.inputSwitch = inputSwitchFunc;
  }
}

/** -------------------------------------------- */
/** --------------Add-Event-Listeners----------- */
/** -------------------------------------------- */

const inputController = new InputController();

inputController.populateHelpTableWithDOMElements();
for (let el = 0; el < InputController.HANDLES.length; el++) {
  const handle = InputController.HANDLES[el];
  try {
    if (handle !== undefined && handle !== null) {
      const el = document.querySelector(handle.xdata);

            /** Set textContent of buttons */
            el!.innerHTML = handle.display;
            console.warn('xdata:', handle.xdata, document.querySelector(handle.xdata));
            /** Add click eventlisteners */
            el!.addEventListener('click', () => {
              console.info(`Clicked: ${handle.value}`);
              inputSwitch(handle.value);
            }, false);
    }
  } catch (error) {
    throw Error(`A query for an element with attribute "${handle.xdata}" returned 'null' or 'undefined'.\nError: ${error}`);
  }
}
/** Add keydown eventlisteners */
document.body.addEventListener('keydown', (e) => {
  console.info(`Pressed: ${e.key}`);
  inputSwitch(e.key);
}, false);

/** -------------------------------------------- */
/** --------------Event-Handler----------------- */
/** -------------------------------------------- */
function inputSwitch(key: string) {
  /* Wobble and flash the keys being pressed or clicked */
  const dataAttribute: string | void = inputController.getDataAttributeByCalcKeyLookup(key);
  if (dataAttribute !== null && dataAttribute !== undefined) {
    wobble(dataAttribute);
  }

  /** Match the keyclick/keypress with an action */
  if (inputController.getHandleByCalcKeyLookup(key)) {
    console.log(key, inputController.getHandleByCalcKeyLookup(key));
  } else {
    console.warn('Calculator key not recognized');
  }
  switch (key) {
    case '=':
    case 'Enter':
      evaluateExpression();
      break;
    case '.':
    case ',':
      if (getExpressionText().includes('.') || checkCharacterIsNotARepeat(getExpressionText(), '.')) { null; } else { getExpression().append('.'); }
      break;
    case 'Backspace':
    case 'C':
      setExpression(getExpressionText().slice(0, -1));
      break;
    case 'ac':
    case 'Delete':
    case 'Escape':
      setExpression('0');
      setResult('0');
      break;
    case '+':// TODO: See todo-multiply
      if (!checkCharacterIsNotARepeat(getExpressionText(), '+')) { getExpression().append('+'); }
      break;
    case '-':// TODO: after minus, only numbers allowed
      if (!checkCharacterIsNotARepeat(getExpressionText(), '-')) {
        if (checkForNullExpression()) { setExpression('-'); } else { getExpression().append('-'); }
      }
      break;
    case '*':// TODO: After multiply, only number or minus if times, divide or +, replace multiply sign
      if (!checkCharacterIsNotARepeat(getExpressionText(), '*')) {
        getExpression().append('*');
      }
      break;
    case '/':// TODO: See todo-multiply
      if (!checkCharacterIsNotARepeat(getExpressionText(), '/')) {
        getExpression().append('/');
      }
      break;
    case '%':
      if (!checkCharacterIsNotARepeat(getExpressionText(), '%')) { getExpression().append('%'); }
      break;
    case '(':
      if (checkForNullExpression()) { setExpression('('); } else { getExpression().append('('); }
      break;
    case ')':
      if (checkClosingParenthesesIsAllowed(getExpressionText())) {
        getExpression().append(')');
      }
      break;
    case 'Dead':
    case '^':
      if (!checkCharacterIsNotARepeat(getExpressionText(), '^')) {
        getExpression().append('^');
      }
      break;
    case 'sqrt':
    case 'r':
      if (!checkForNullExpression()) { setExpression(`sqrt(${getExpressionText()})`); } else { setExpression('sqrt('); }
      break;
    case 'log':
    case 'l':
      if (!checkForNullExpression()) { setExpression(`log(${getExpressionText()})`); } else { setExpression('log('); }
      break;
    case 'ln':
    case 'L':
      if (!checkForNullExpression()) { setExpression(`ln(${getExpressionText()})`); } else { setExpression('ln('); }
      break;
    case '!':
      getExpression().append('!');
      break;
    case 'e':
      getExpression().append('e');
      break;
    case 'pi':
      getExpression().append('pi');
      break;
    case 'sin':
      if (!checkForNullExpression()) { setExpression(`sin(${getExpressionText()})`); } else { setExpression('sin('); }
      break;
    case 'cos':
      if (!checkForNullExpression()) { setExpression(`cos(${getExpressionText()})`); } else { setExpression('cos('); }
      break;
    case 'tan':
      if (!checkForNullExpression()) { setExpression(`tan(${getExpressionText()})`); } else { setExpression('tan('); }
      break;
    case '>':
      getExpression().append('>');
      break;
    case '<':
      getExpression().append('<');
      break;
    case '>=':
      getExpression().append('>=');
      break;
    case '<=':
      getExpression().append('<=');
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (!checkForNullExpression()) { getExpression().append(key); } else { setExpression(key); }
      break;
    default:
      console.warn('Calculator key not recognized');
  }
}

/** -------------------------------------------- */
/** ------------------Animations---------------- */
/** -------------------------------------------- */
function wobble(selector: string) {
  const el = document.querySelector(selector);
  if (el !== null && el !== undefined) {
    console.log('log', el);
    el.animate([
      { transform: 'translate(0px, 0px)', backgroundColor: 'white' },
      { transform: 'translate(0px, 2px)' },
      { transform: 'translate(0px, 0px)' },
    ], {
      duration: 180,
    });
  }
}
function idElFontSizeScaler(expression: HTMLElement, text: string): void {
  /** On each keyclick/keypress:
    *  - Check if the font should be scaled
    *  - And either scale it or don't
    *  -- Usage: idElFontSizeScaler(getExpression(), getExpressionText())
     */
  if (text.length === 18) {
    if (expression.style.fontSize === '3rem') {
      expression.animate([
        { fontSize: '3rem' },
        { fontSize: '2rem' },
      ], {
        // timing options
        duration: 100,
      });
      expression.style.fontSize = '2rem';
    } else if (expression.style.fontSize === '2rem') {
      expression.animate([
        { fontSize: '2rem' },
        { fontSize: '3rem' },
      ], {
        // timing options
        duration: 100,
      });
      expression.style.fontSize = '3rem';
    }
  } else if (text.length === 28) {
    if (expression.style.fontSize === '2rem') {
      expression.animate([
        { fontSize: '2rem' },
        { fontSize: '1rem' },
      ], {
        // timing options
        duration: 100,
      });
      expression.style.fontSize = '1rem';
    } else if (expression.style.fontSize === '1rem') {
      expression.animate([
        { fontSize: '1rem' },
        { fontSize: '2rem' },
      ], {
        // timing options
        duration: 100,
      });
      expression.style.fontSize = '2rem';
    }
  }
}
