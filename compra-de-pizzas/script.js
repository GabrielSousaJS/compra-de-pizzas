let cart = [];
let modalQuantity = 1;
let modalKey = 0;

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
        modalKey = key;

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

selectElement('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(selectElement('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey] + '@' + size;

    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > 1) {
        cart[key].quantity += modalQuantity;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            quantity: modalQuantity
        });
    }

    updateCart();
    closeModal();
});

const updateCart = () => {
    if (cart.length > 0) {
        selectElement('aside').classList.add('show');
        selectElement('.cart').innerHTML = '';

        let subtotal = 0;
        let desc = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].quantity;

            let cartItem = selectElement('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';    
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantity;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].quantity > 1) {
                    cart[i].quantity--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].quantity++;
                updateCart();
            });

            selectElement('.cart').append(cartItem);
        }

        desc = subtotal * 0.1;
        total = subtotal - desc;

        selectElement('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        selectElement('.desconto span:last-child').innerHTML = `R$ ${desc.toFixed(2)}`;
        selectElement('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        selectElement('aside').classList.remove('show');
    }
}