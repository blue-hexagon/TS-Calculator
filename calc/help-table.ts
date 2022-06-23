import InputController from './input-controller.js';

export default class HelpTable {
    public static populateHelpTableWithDOMElements(): void {
        /** Prints a help table by iterating over the InputControllers Handles */
        const helpTable = document.getElementById('table') as HTMLElement;
        const tHeader = document.createElement('thead') as HTMLElement;
        const tHeaderRow = document.createElement('tr') as HTMLElement;
        const tHeaderRowName = document.createElement('th') as HTMLElement;
        const tHeaderRowDisplay = document.createElement('th') as HTMLElement;
        const tHeaderRowShortcuts = document.createElement('th') as HTMLElement;
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        const tBody = document.createElement('tbody') as HTMLElement;
        const tFooter = document.createElement('tfoot') as HTMLElement;
        InputController.BUTTON_COLLECTION.forEach((button) => {
            const tRow = document.createElement('tr') as HTMLElement;
            const tColumnName = document.createElement('th') as HTMLElement;
            const tColumnDisplay = document.createElement('th') as HTMLElement;
            const tColumnShortcut = document.createElement('th') as HTMLElement;
            tColumnName.textContent = button.name;
            tColumnDisplay.innerHTML = button.display;
            button.shortcut.forEach((shortcut) => {
                if (shortcut === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,'; // A comma is appended so we can slice the last character out, see code below to understand.
                } else {
                    tColumnShortcut.textContent += `${shortcut}, `;
                }
            });
            tColumnShortcut.textContent = tColumnShortcut.textContent!.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        });
        helpTable!.append(tHeader);
        helpTable!.append(tBody);
        helpTable!.append(tFooter);
    }
}
