export default function flashAnimation(selector) {
    var button = document.querySelector(selector);
    if (button === null && button === undefined) {
        throw Error("flashAnimation::Document query for a button [".concat(document.querySelector(selector), "] returned null or undefined when it should have returned an HTMLElement."));
    }
    console.log('log', button);
    button.animate([{ transform: 'translate(0px, 0px)', backgroundColor: 'white' }, { transform: 'translate(0px, 2px)' }, { transform: 'translate(0px, 0px)' }], {
        duration: 180,
    });
}
