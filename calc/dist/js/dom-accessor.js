var DOMAccessor = (function () {
    function DOMAccessor() {
    }
    DOMAccessor.getExpression = function () {
        return document.getElementById('expression');
    };
    DOMAccessor.getExpressionText = function () {
        return this.getExpression().textContent;
    };
    DOMAccessor.setExpression = function (str) {
        this.getExpression().textContent = str;
    };
    DOMAccessor.getResult = function () {
        return document.getElementById('result');
    };
    DOMAccessor.getResultText = function () {
        return this.getResult().textContent;
    };
    DOMAccessor.setResult = function (str) {
        this.getResult().textContent = str;
    };
    return DOMAccessor;
}());
export default DOMAccessor;
