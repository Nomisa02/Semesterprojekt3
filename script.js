let basket = [];

function buyItem(itemName) {
    alert(`You have selected ${itemName}`);
    addToBasket(itemName);
}

function addToBasket(itemName, price) {
    basket.push({ name: itemName, price: price });
    updateBasketUI();
}

function updateBasketUI() {
    const basketItems = document.getElementById('basketItems');
    basketItems.innerHTML = '';
    basket.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}kr`;
        basketItems.appendChild(li);
    });
}

function confirmBasket() {
    if (basket.length > 0) {
        basket.forEach(item => {
            db.saveSelection({
                name: item.name,
                price: item.price,
                timestamp: new Date()
            });
        });
        alert('Basket confirmed and saved to the database.');
        basket = [];
        updateBasketUI();
    } else {
        alert('Basket is empty.');
    }
}

function cancelBasket() {
    basket = [];
    updateBasketUI();
    alert('Basket cleared.');
}

function clickBox(item, price) {
    if (item && price) {
        addToBasket(item, price);
    } else {
        alert('Missing item or price information.');
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