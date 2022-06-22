function inputSwitch(key: string) {
    /* Wobble and flash the keys being pressed or clicked */
    const dataAttribute: string | void = inputController.getDataAttributeFromKeyInput(key);
    if (dataAttribute !== null && dataAttribute !== undefined) {
        wobble(dataAttribute);
    }

    /** Match the keyclick/keypress with an action */
    if (inputController.getShortcutsFromKeyInput(key)) {
        console.log(key, inputController.getShortcutsFromKeyInput(key));
    } else {
        console.warn('Calculator key not recognized');
    }
    /**
    switch (key) {
        case '=':
        case 'Enter':
            FrontendMathParserExtension.evaluateExpression();
            break;
        case '.':
        case ',':
            if (HTMLFetcher.getExpressionText().includes('.') || FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '.')) { null; } else { HTMLFetcher.getExpression().append('.'); }
            break;
        case 'Backspace':
        case 'C':
            HTMLFetcher.setExpression(HTMLFetcher.getExpressionText().slice(0, -1));
            break;
        case 'ac':
        case 'Delete':
        case 'Escape':
            HTMLFetcher.setExpression('0');
            HTMLFetcher.setResult('0');
            break;
        case '+':// TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '+')) { HTMLFetcher.getExpression().append('+'); }
            break;
        case '-':// TODO: after minus, only numbers allowed
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '-')) {
                if (FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression('-'); } else { HTMLFetcher.getExpression().append('-'); }
            }
            break;
        case '*':// TODO: After multiply, only number or minus if times, divide or +, replace multiply sign
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '*')) {
                HTMLFetcher.getExpression().append('*');
            }
            break;
        case '/':// TODO: See todo-multiply
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '/')) {
                HTMLFetcher.getExpression().append('/');
            }
            break;
        case '%':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '%')) { HTMLFetcher.getExpression().append('%'); }
            break;
        case '(':
            if (FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression('('); } else { HTMLFetcher.getExpression().append('('); }
            break;
        case ')':
            if (FrontendMathParserExtension.checkClosingParenthesesIsAllowed(HTMLFetcher.getExpressionText())) {
                HTMLFetcher.getExpression().append(')');
            }
            break;
        case 'Dead':
        case '^':
            if (!FrontendMathParserExtension.checkCharacterIsNotARepeat(HTMLFetcher.getExpressionText(), '^')) {
                HTMLFetcher.getExpression().append('^');
            }
            break;
        case 'sqrt':
        case 'r':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`sqrt(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('sqrt('); }
            break;
        case 'log':
        case 'l':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`log(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('log('); }
            break;
        case 'ln':
        case 'L':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`ln(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('ln('); }
            break;
        case '!':
            HTMLFetcher.getExpression().append('!');
            break;
        case 'e':
            HTMLFetcher.getExpression().append('e');
            break;
        case 'pi':
            HTMLFetcher.getExpression().append('pi');
            break;
        case 'sin':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`sin(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('sin('); }
            break;
        case 'cos':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`cos(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('cos('); }
            break;
        case 'tan':
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.setExpression(`tan(${HTMLFetcher.getExpressionText()})`); } else { HTMLFetcher.setExpression('tan('); }
            break;
        case '>':
            HTMLFetcher.getExpression().append('>');
            break;
        case '<':
            HTMLFetcher.getExpression().append('<');
            break;
        case '>=':
            HTMLFetcher.getExpression().append('>=');
            break;
        case '<=':
            HTMLFetcher.getExpression().append('<=');
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
            if (!FrontendMathParserExtension.checkForNullExpression()) { HTMLFetcher.getExpression().append(key); } else { HTMLFetcher.setExpression(key); }
            break;
        default:
            console.warn('Calculator key not recognized');
    }
     */
}
