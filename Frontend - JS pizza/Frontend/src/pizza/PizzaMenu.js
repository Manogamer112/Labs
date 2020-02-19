/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $(".number-piz").text(list.length);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        if(filter=="meat"&&pizza.content.meat) pizza_shown.push(pizza);
        else if(filter=="mushroom"&&pizza.content.mushroom) pizza_shown.push(pizza);
        else if(filter=="ananas"&&pizza.content.pineapple) pizza_shown.push(pizza);
        else if(filter=="ocean"&&pizza.content.ocean) pizza_shown.push(pizza);
        else if(filter=="vega"&&!pizza.content.meat&&!pizza.content.chicken&&!pizza.content.ocean) pizza_shown.push(pizza);
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)

    $(".all-p").click(function(){showPizzaList(Pizza_List)});
    $(".meat").click(function(){filterPizza("meat")});
    $(".mushroom").click(function(){filterPizza("mushroom")});
    $(".ananas").click(function(){filterPizza("ananas")});
    $(".ocean").click(function(){filterPizza("ocean")});
    $(".vega").click(function(){filterPizza("vega")});
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;