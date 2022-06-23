export default function wobble(selector) {
    var el = document.querySelector(selector);
    if (el === null && el === undefined) {
        throw Error('Document query returned null or undefined when it should have returned a HTMLElement');
    }
    console.log('log', el);
    el.animate([{ transform: 'translate(0px, 0px)', backgroundColor: 'white' }, { transform: 'translate(0px, 2px)' }, { transform: 'translate(0px, 0px)' }], {
        duration: 180,
    });
}
