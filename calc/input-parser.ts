function evaluateExpression(): void {
  /** Checks to see if the expression contains equality operators
       *  - and if so converts and returns the result as a boolean value
       *  - and if not returns the results
       *  - and if the evaluation fails because of an improper expression-string
       *    it returns a localized word for error
       */
  try {
    const result = String(math.round(math.evaluate(getExpression().textContent as string), 10));
    if (getExpressionText.toString().search('/(<=|<|=>|>)+/') >= 0) {
      getResult().innerHTML = String(Boolean(result));
      console.log(result, Boolean(result));
    } else {
      getResult().innerHTML = result;
      console.log(result, Boolean(result));
    }
  } catch {
    getResult().innerHTML = 'Fejl';
  }
}
function checkForNullExpression(): boolean {
  return getExpressionText() === '0';
}

function checkCharacterIsNotARepeat(appendableString: string, char: string): boolean {
  return appendableString[appendableString.length - 1] == char;
}
function checkClosingParenthesesIsAllowed(expressionString: string): boolean {
  /* Checks that a closing parentheses is allowed.
         - A closing parentheses is allowed only if the number of opening parentheses >= closing parentheses
         - Otherwise a closing parentheses is not allowed */
  const opens = expressionString.match(/[(]/g);
  const closes = expressionString.match(/[)]/g);
  if (opens?.length && closes?.length) { return (opens.length > closes.length); }
  if (opens?.length && opens.length > 0) { return true; }
  return false;
}
