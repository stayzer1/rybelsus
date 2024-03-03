import { saveCart, loadCart } from scripts.min.js
loadCart();
function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output +=
         "<div class='cart__result-text cart__package'><p>Packaging</p>" + cartArray[i].package + "</div>" 
        + "<div class='cart__result-text cart__counter'><p>QTY:</p><button class='minus-item' data-name=" + cartArray[i].name + ">-</button>" + cartArray[i].count + "<button class='plus-item' data-name=" + cartArray[i].name + ">+</button></div>"
        + "<div class='cart__result-text cart__price'><p>Per Pack:</p>" + cartArray[i].price + "</div>"
        // + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        // + " = " 
        + "<div class='cart__result-text cart__total'><p>Total:</p>" + cartArray[i].total + "</div>" ;
    }
    $('.cart__result').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.cart__count').html(shoppingCart.totalCount());
  }
  displayCart();
