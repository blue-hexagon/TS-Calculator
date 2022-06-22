"use strict";
function evaluateExpression() {
    try {
        const result = String(math.round(math.evaluate(getExpression().textContent), 10));
        if (getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
            getResult().innerHTML = String(Boolean(result));
            console.log(result, Boolean(result));
        }
        else {
            getResult().innerHTML = result;
            console.log(result, Boolean(result));
        }
    }
    catch (_a) {
        getResult().innerHTML = 'Fejl';
    }
}
function checkForNullExpression() {
    return getExpressionText() === '0';
}
function checkCharacterIsNotARepeat(appendableString, char) {
    return appendableString[appendableString.length - 1] == char;
}
function checkClosingParenthesesIsAllowed(expressionString) {
    const opens = expressionString.match(/[(]/g);
    const closes = expressionString.match(/[)]/g);
    if ((opens === null || opens === void 0 ? void 0 : opens.length) && (closes === null || closes === void 0 ? void 0 : closes.length)) {
        return (opens.length > closes.length);
    }
    if ((opens === null || opens === void 0 ? void 0 : opens.length) && opens.length > 0) {
        return true;
    }
    return false;
}
