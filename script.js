const { ipcRenderer } = require('electron');
const db = require('./database');

function buyItem(itemName) {
    alert(`You have selected ${itemName}`);
    db.saveSelection(itemName);
}

function clickBox() {
    alert('You clicked the box!');
    db.saveSelection('Box');
}

function buttonClicked() {
    alert('Button clicked!');
    db.saveSelection('Button');
}

function inputChanged() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    db.saveSelection(`Input: ${inputField.value}`);
}

function dropdownChanged() {
    const dropdown = document.getElementById('dropdown');
    alert(`Selected option: ${dropdown.value}`);
    db.saveSelection(`Dropdown: ${dropdown.value}`);
}

function inputButtonClicked() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    db.saveSelection(`Input: ${inputField.value}`);
}