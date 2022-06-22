var HTMLFetcher = (function () {
    function HTMLFetcher() {
    }
    HTMLFetcher.getExpression = function () {
        return document.getElementById('expression');
    };
    HTMLFetcher.getExpressionText = function () {
        return this.getExpression().textContent;
    };
    HTMLFetcher.setExpression = function (str) {
        this.getExpression().textContent = str;
    };
    HTMLFetcher.getResult = function () {
        return document.getElementById('result');
    };
    HTMLFetcher.getResultText = function () {
        return this.getResult().textContent;
    };
    HTMLFetcher.setResult = function (str) {
        this.getResult().textContent = str;
    };
    return HTMLFetcher;
}());
export default HTMLFetcher;
