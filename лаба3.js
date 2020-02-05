

var ITEM_TEMPLATE = ' <div  class = "boxes1" id = "uu"> <div class="style1" id = "style1" >val</div> <input class = "in" id = "in" size="50" placeholder="назва"> <button class = "minus" id = "minus" operation="-" data-tooltip = "мінус" type="button1"	onclick="minus()">	- </button> <div class = "output" id="output">1</div>  <button class = "plus" id = "plus" operation="+" data-tooltip = "плюс" type="button2"	onclick="qd()">+   </button> <button class = "123" data-tooltip = "купити" type="buttonKup" onclick="addItem1()">Купити   </button><button class = "buy" id = "buy"  data-tooltip = "купити" type="buy" >Продати   </button> <button class="b1" data-tooltip = "delete" type="buttonKrest" onclick="yeap()">X   </button>      </div>'


var ITEM_TEMPLATE_NEW = ' <div class = "right" > <div	<div class="text">Помідори</div><div class="text1">1</div> </div>'
var ITEM_NEW = '<div class = "middle" > 	<div class="text_" ></div><div class="text1_">1</div> </div>'
//var ITEM_ITEM = '<button class = "buy" id = "buy"  data-tooltip = "купити" type="buy" >Продати   </button>'
//var ITEM2 = '<input class = "in" id = "in" size="50" placeholder="назва">'


var LIST	=	$('#left');
var NEW_LIST = $('#right');
var NEW_NEW_LIST = $('#middle');
var LIST1 = $('#buy');
var LIST2 = $('#in');


addItem("Картофан");
addItem("Морковка");
addItem("Сок");





function	addItem(title)	{    

var node	=	$(ITEM_TEMPLATE);
var node_next	=	$(ITEM_TEMPLATE_NEW);//Create	new	HTML	node
var node1 = $(ITEM_NEW);
//var node2 = $(ITEM_ITEM);
//var node3 = $(ITEM2);
    
node.find(".style1").text(title);
node_next.find(".text").text(title);//Set	product	title
node1.find(".text_").text(title);
node.find(".buy").hide();

node.find(".in").hide();
    

//Delete	Action
node.find("button[type = buttonKrest]").click(function(){
node.remove();
node_next.remove();


});
    

    node.find("button[type = buttonKup]").click(function(){
       
        NEW_NEW_LIST.append(node1);
    
        node.find(".b1").hide();
         node.find(".plus").hide();
         node.find(".minus").hide();
        node.find(".123").hide();
        node_next.find(".text").hide();
        node_next.find(".text1").hide();
        node.find(".buy").show();
        
        node.append(ITEM_ITEM);

    });
    
    
    
    node.find(".style1").click(function() {
        node.find(".style1").hide();
        node.find("#in").show();
    });
    
    node.find("#in").focusout(function() {
        var qwer = node.find("#in").val();
        node.find(".style1").text(qwer);
        node.find(".style1").show();
        node.find("#in").hide();
    });
    
    node.find("#in").keypress(function(){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode=='13') {
             var qwer = node.find("#in").val();
            node.find(".style1").text(qwer);
            node_next.find(".text").text(qwer);
            node1.find(".text_").text(qwer);
            node.find(".style1").show();
            node.find("#in").hide();
         }
    });

    
    
   
    
    
 
    
    
    
    
    node.find('#buy').click(function(){
        NEW_NEW_LIST.append(node1);
    
        node.find(".b1").show();
         node.find(".plus").show();
         node.find(".minus").show();
        node.find(".123").show();
        node_next.find(".text").show();
        node_next.find(".text1").show();
          node.find(".buy").hide();
        node1.find(".text_").hide();
        node1.find(".text1_").hide();
        node.append(ITEM_ITEM);
      

    });

    
    
    
    

    

node.find('#plus').click(function() {
    node.find("#output").html(function(i, val) { return val*1+1 });
    node_next.find(".text1").html(function(i, val) { return val*1+1 });
    node1.find(".text1_").html(function(i, val) { return val*1+1 });
});
    
    node.find('#minus').click(function() {
    node.find("#output").html(function(i, val) { if(val*1>0){return val*1-1 }});
        node_next.find(".text1").html(function(i, val) { return val*1-1 });
    node1.find(".text1_").html(function(i, val) { return val*1-1 });
});
                                                    
$("#text").val("");
$("#text").focus();

   
    
LIST.append(node);	
NEW_LIST.append(node_next);//Add	to	the	end	of	the	list

}






$("#myDIV").click(function(){
    var title = $("#text").val();
    if(title!="")
    addItem(title);
});





