export default function wobble(selector: string) {
    const el: HTMLElement = document.querySelector(selector)!;
    if (el === null && el === undefined) {
        throw Error('Document query returned null or undefined when it should have returned a HTMLElement');
    }
    el.animate([
        { transform: 'translate(0px, 0px)', backgroundColor: 'white' },
        { transform: 'translate(0px, 2px)' },
        { transform: 'translate(0px, 0px)' },
    ], {
        duration: 180,
    });
}
/**
public static idElFontSizeScaler(expression: HTMLElement, text: string): void {
// NOT USED
// On each keyclick/keypress:
// Check if the font should be scaled
// And either scale it or don't
// Usage: idElFontSizeScaler(HTMLFetcher.getExpression(), HTMLFetcher.getExpressionText())
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
*/
