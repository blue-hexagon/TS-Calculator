import InputController from './input-controller.js';
var HelpTable = (function () {
    function HelpTable() {
    }
    HelpTable.populateHelpTableWithDOMElements = function () {
        var helpTable = document.getElementById('table');
        var tHeader = document.createElement('thead');
        var tHeaderRow = document.createElement('tr');
        var tHeaderRowName = document.createElement('th');
        var tHeaderRowDisplay = document.createElement('th');
        var tHeaderRowShortcuts = document.createElement('th');
        tHeaderRowName.textContent = 'Name';
        tHeaderRowDisplay.textContent = 'Display';
        tHeaderRowShortcuts.textContent = 'Shortcuts';
        tHeader.appendChild(tHeaderRow);
        tHeaderRow.appendChild(tHeaderRowName);
        tHeaderRow.append(tHeaderRowDisplay);
        tHeaderRow.append(tHeaderRowShortcuts);
        var tBody = document.createElement('tbody');
        var tFooter = document.createElement('tfoot');
        InputController.BUTTON_COLLECTION.forEach(function (button) {
            var tRow = document.createElement('tr');
            var tColumnName = document.createElement('th');
            var tColumnDisplay = document.createElement('th');
            var tColumnShortcut = document.createElement('th');
            tColumnName.textContent = button.name;
            tColumnDisplay.innerHTML = button.display;
            button.shortcut.forEach(function (shortcut) {
                if (shortcut === null) {
                    tColumnShortcut.textContent = 'No Shortcuts,';
                }
                else {
                    tColumnShortcut.textContent += "".concat(shortcut, ", ");
                }
            });
            tColumnShortcut.textContent = tColumnShortcut.textContent.slice(0, -2);
            tRow.appendChild(tColumnName);
            tRow.appendChild(tColumnDisplay);
            tRow.appendChild(tColumnShortcut);
            tBody.appendChild(tRow);
        });
        helpTable.append(tHeader);
        helpTable.append(tBody);
        helpTable.append(tFooter);
    };
    return HelpTable;
}());
export default HelpTable;
