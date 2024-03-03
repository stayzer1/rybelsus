$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartItems();
    calculateTotalAmount();
    updateCartCount();
    function updateCartItems() {
        $('.cart__item').empty();
        const uniqueProducts = {};
        cart.forEach(item => {
            const key = item.name + item.package;
            if (!uniqueProducts[key]) {
                uniqueProducts[key] = { ...item };
            } else {
                uniqueProducts[key].quantity += item.quantity;
            }
        });
        for (const key in uniqueProducts) {
            const product = uniqueProducts[key];
            if (product.quantity > 0) {
                $('.cart__item').append(`
                        <div class="cart__result-text">
                            <p>Packaging:</p>${product.package}
                        </div>
                        <div class="cart__result-text">
                            <p>Per Pack:</p>$${product.price.toFixed(2)}
                        </div>
                        <div class="cart__result-text">
                            <p>QTY:</p>
                            
                            <span>
                            <button class="decrease-quantity" data-name="${product.name}"  data-package="${product.package}">-</button>
                            ${product.quantity}
                            <button class="increase-quantity" data-name="${product.name}"  data-package="${product.package}">+</button>
                            </span>
                            
                        </div>
                `);
            }
            
        }
        if (cart.length === 0) {
            $('.empty').text('The basket is empty!');
        } else {
            $('.empty').hide()
        }
    }

    function calculateTotalAmount() {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        $('.total-cart').text('$' + totalAmount.toFixed(2));
    }
    function updateCartCount() {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        $('.cart__count').text(totalQuantity);
    }
    $('.cart__item').on('click', '.increase-quantity', function() {
        const name = $(this).data('name');
        const package = $(this).data('package');
        const selectedItem = cart.find(item => item.name === name && item.package === package);
        selectedItem.quantity++;
        updateCartItems();
        calculateTotalAmount();
        localStorage.setItem('cart', JSON.stringify(cart));
    });
    $('.cart__item').on('click', '.decrease-quantity', function() {
        const name = $(this).data('name');
        const package = $(this).data('package');
        const selectedItemIndex = cart.findIndex(item => item.name === name && item.package === package);
        if (selectedItemIndex !== -1) {
            cart[selectedItemIndex].quantity--;
            if (cart[selectedItemIndex].quantity === 0) {
                cart.splice(selectedItemIndex, 1);
            }
            updateCartItems();
            calculateTotalAmount();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartCount();
    });
});
