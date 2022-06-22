"use strict";
function getExpression() {
    return document.getElementById('expression');
}
function getExpressionText() {
    return getExpression().textContent;
}
function setExpression(str) {
    getExpression().textContent = str;
}
function getResult() {
    return document.getElementById('result');
}
function getResultText() {
    return getResult().textContent;
}
function setResult(str) {
    getResult().textContent = str;
}
