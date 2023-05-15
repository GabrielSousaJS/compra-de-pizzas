const selectElement = (e) => document.querySelector(e);
const selectElements = (e) => document.querySelectorAll(e);


pizzaJson.map((item, index) => {
    let pizzaItem = selectElement('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        selectElement('.pizzaBig img').src = pizzaJson[key].img;
        selectElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        selectElement('.pizzaWindowArea').style.opacity = 0;
        selectElement('.pizzaWindowArea').style.display = "flex";
        setTimeout(() => {
            selectElement('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    selectElement('.pizza-area').append(pizzaItem);
});