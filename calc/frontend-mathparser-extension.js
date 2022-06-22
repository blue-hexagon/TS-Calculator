import HTMLFetcher from './html-fetcher.js';
var FrontendMathParserExtension = (function () {
    function FrontendMathParserExtension() {
    }
    FrontendMathParserExtension.evaluateExpression = function () {
        try {
            var result = String(math.round(math.evaluate(HTMLFetcher.getExpression().textContent), 10));
            if (HTMLFetcher.getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
                HTMLFetcher.getResult().innerHTML = String(Boolean(result));
            }
            else {
                HTMLFetcher.getResult().innerHTML = result;
            }
        }
        catch (_a) {
            HTMLFetcher.getResult().innerHTML = 'Fejl';
        }
    };
    FrontendMathParserExtension.checkForNullExpression = function () {
        return HTMLFetcher.getExpressionText() === '0';
    };
    FrontendMathParserExtension.checkCharacterIsNotARepeat = function (appendableString, char) {
        return appendableString[appendableString.length - 1] === char;
    };
    FrontendMathParserExtension.checkClosingParenthesesIsAllowed = function (expressionString) {
        var opens = expressionString.match(/[(]/g);
        var closes = expressionString.match(/[)]/g);
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && (closes === null || closes === void 0 ? void 0 : closes.length)) {
            return (opens.length > closes.length);
        }
        if ((opens === null || opens === void 0 ? void 0 : opens.length) && opens.length > 0) {
            return true;
        }
        return false;
    };
    return FrontendMathParserExtension;
}());
export default FrontendMathParserExtension;
