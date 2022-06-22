function getExpression(): HTMLElement {
  return document.getElementById('expression')!;
}
function getExpressionText(): string {
  return getExpression().textContent!;
}
function setExpression(str: string): void {
  getExpression().textContent = str;
}

/*---*/
function getResult(): HTMLElement {
  return document.getElementById('result')!;
}

function getResultText(): string {
  return getResult().textContent!;
}

function setResult(str: string): void {
  getResult().textContent = str;
}
