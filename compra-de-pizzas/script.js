const selectElement = (e) => document.querySelector(e);
const selectElements = (e) => document.querySelectorAll(e);


pizzaJson.map((item, index) => {
    let pizzaItem = selectElement('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    selectElement('.pizza-area').append(pizzaItem);
});