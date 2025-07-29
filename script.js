// Toggle cart popup
document.getElementById("cart").addEventListener("click", () => {
    document.getElementById("cart-popup").style.display = "block";
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-popup").style.display = "none";
});

// Cart Logic
let cartItems = [];
const itemCount = document.getElementById("item-count");
const checkoutItems = document.getElementById("checkout-items");
const totalAmount = document.getElementById("total-amount");

// Add to Cart
document.querySelectorAll(".add").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        let price = button.getAttribute("data-price");

        // Clean up commas or currency symbols
        price = parseFloat(price.replace(/[₹,]/g, ""));

        cartItems.push({ name, price });
        updateCart();
    });
});

// Update Cart Display
function updateCart() {
    itemCount.textContent = cartItems.length;

    checkoutItems.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
        const p = document.createElement("p");
        p.textContent = `${item.name} - Rs.${item.price}`;
        checkoutItems.appendChild(p);
        total += item.price;
    });

    totalAmount.textContent = total.toFixed(2);
}

// WhatsApp Checkout
document.getElementById("checkout").addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Cart is empty. Please add items!");
        return;
    }

    let message = `Hello! I'd like to order the following from StyleMart:%0A%0A`;
    cartItems.forEach(item => {
        message += `- ${item.name} - Rs.${item.price}%0A`;
    });

    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    message += `%0ATotal: Rs.${total.toFixed(2)}%0A%0AName: ______%0AAddress: ______%0APayment: COD`;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
});



