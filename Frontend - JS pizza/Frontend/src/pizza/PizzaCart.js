/**
 * Created by chaika on 02.02.16.
 */
var storage = require("../storage");
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var exists = false;
    Cart.forEach(function(item){
        console.log(item.pizza === pizza);
        if(item.pizza==pizza&&item.size==size){
        item.quantity++;
        exists = true;
        }
    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if (!exists)
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    Cart.splice(Cart.indexOf(cart_item),1);
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    var c = storage.get("cart");
    if(c) 
    Cart=c;
    $(".cart-clear").click(function(){
        Cart=[];
        updateCart();
    })
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    storage.set("cart", Cart);
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    var dengi = 0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);
        dengi=dengi +cart_item.pizza[cart_item.size].price*cart_item.quantity;
        $node.find(".button-plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".button-minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if(cart_item.quantity==0)
            removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".button-krest").click(function(){
            //Збільшуємо кількість замовлених піц
            removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".price").text(cart_item.pizza[cart_item.size].price*cart_item.quantity+" грн")

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".prices").text(dengi+" грн");
    $(".cart-count").text(Cart.length);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;