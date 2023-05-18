let modalQuantity = 1;

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
        modalQuantity = 1;

        selectElement('.pizzaBig img').src = pizzaJson[key].img;
        selectElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        selectElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        selectElement('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        
        size = selectElement('.pizzaInfo--size.selected').classList.remove('selected');

        selectElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
            const indexBigPizza = 2;

            if (sizeIndex === indexBigPizza) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        selectElement('.pizzaInfo--qt').innerHTML = modalQuantity;

        selectElement('.pizzaWindowArea').style.opacity = 0;
        selectElement('.pizzaWindowArea').style.display = "flex";
        setTimeout(() => {
            selectElement('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    selectElement('.pizza-area').append(pizzaItem);
});

// Eventos do modal
const closeModal = () => {
    selectElement('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        selectElement('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

selectElements('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

selectElement('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQuantity > 1) {
        modalQuantity--;
        selectElement('.pizzaInfo--qt').innerHTML = modalQuantity;
    }
});

selectElement('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQuantity++;
    selectElement('.pizzaInfo--qt').innerHTML = modalQuantity;
});

selectElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        selectElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});