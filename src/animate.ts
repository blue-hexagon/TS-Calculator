export default function flashAnimation(dataAttribSelector: string) {
    const button: HTMLElement = document.querySelector(dataAttribSelector)!
    if (button === null && button === undefined) {
        throw Error(
            `flashAnimation::Document query for a button [${document.querySelector(
                dataAttribSelector,
            )}] returned null or undefined when it should have returned an HTMLElement.`,
        )
    }
    button.animate([{ transform: 'translate(0px, 0px)', backgroundColor: 'white' }, { transform: 'translate(0px, 2px)' }, { transform: 'translate(0px, 0px)' }], {
        duration: 180,
    })
}
