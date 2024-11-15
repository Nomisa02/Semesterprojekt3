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

function clickBox1() {
    window.location.href = 'Page1.html';
}

function clickBox2() {
    alert('You clicked the box!');
    db.saveSelection('Box');
}

function clickBox3() {
    alert('You clicked the box!');
    db.saveSelection('Box');
}


function inputChanged() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    db.saveSelection(`Input: ${inputField.value}`);
}

function inputButtonClicked() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    db.saveSelection(`Input: ${inputField.value}`);
}

function dropdownChanged() {
    var dropdown = document.getElementById("dropdown");
    var selectedValue = dropdown.value;
    fetch(selectedValue)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        });
}


function buttonClicked() {
    console.log("Button clicked!");
    db.saveSelection('Button');
}

function inputButtonClicked() {
    var inputField = document.getElementById("inputField");
    console.log("Input submitted:", inputField.value);
    db.saveSelection('Inputbutton');
}

function buyBeer() {
    // Assuming you have a function in database.js to handle the database entry
    console.log("Beer added!");
    db.saveSelection('Beer');
}

function buyWater() {
    console.log("Water added!")
    db.saveSelection('Water')
}