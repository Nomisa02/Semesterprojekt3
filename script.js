const { ipcRenderer } = require('electron');
const db = require('./database');

let basket = [];

function buyItem(itemName) {
    alert(`You have selected ${itemName}`);
    addToBasket(itemName);
}

function addToBasket(itemName) {
    basket.push(itemName);
    updateBasketUI();
}

function updateBasketUI() {
    const basketItems = document.getElementById('basketItems');
    basketItems.innerHTML = '';
    basket.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        basketItems.appendChild(li);
    });
}

function confirmBasket() {
    if (basket.length > 0) {
        basket.forEach(item => db.saveSelection(item));
        alert('Basket confirmed and saved to the database.');
        basket = [];
        updateBasketUI();
    } else {
        alert('Basket is empty.');
    }
}

function clickBox(item) {
    if (item) {
        alert(`You have selected: ${item}`);
        addToBasket(item);
    } else {
        alert('No item provided.');
    }
}

function inputChanged() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    addToBasket(`Input: ${inputField.value}`);
}

function inputButtonClicked() {
    const inputField = document.getElementById('inputField');
    alert(`Input value: ${inputField.value}`);
    addToBasket(`Input: ${inputField.value}`);
}

function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        });
}

function buttonClicked() {
    console.log("Button clicked!");
    addToBasket('Button');
}