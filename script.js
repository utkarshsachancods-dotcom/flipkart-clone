// Cart data
let cart = JSON.parse(localStorage.getItem('shopzone-cart')) || [];
let cartCount = cart.length;

// Page load par cart count update karo
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', (e) => {
        let query = e.target.value.toLowerCase();
        let products = document.querySelectorAll('.product-card');
        products.forEach(card => {
            let title = card.querySelector('h3').innerText.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    });

    // Har product card par Add to Cart button add karo
    document.querySelectorAll('.product-card').forEach(card => {
        let btn = document.createElement('button');
        btn.innerText = 'Add to Cart';
        btn.className = 'add-to-cart-btn';
        btn.style.cssText = 'width:100%; padding:8px; background:#ff9f00; border:none; margin-top:10px; cursor:pointer; border-radius:4px; font-weight:bold;';
        btn.onclick = () => addToCart(card);
        card.appendChild(btn);
    });
});

// Add to Cart Function
function addToCart(card) {
    let name = card.querySelector('h3').innerText;
    let price = card.querySelector('.price').innerText;
    cart.push({ name, price });
    localStorage.setItem('shopzone-cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} Cart me add ho gaya!`);
}

function updateCartCount() {
    let cartBtn = document.querySelector('.cart-button');
    cartBtn.innerText = `🛒 Cart (${cart.length})`;
    cartBtn.style.cursor = 'pointer';
    cartBtn.onclick = showCart;
}

// Cart dikhao
function showCart() {
    if(cart.length === 0) {
        alert('Cart khali hai!');
        return;
    }
    let text = 'Tere Cart me:\n\n';
    cart.forEach((item, i) => {
        text += `${i+1}. ${item.name} - ${item.price}\n`;
    });
    text += '\nCart clear karna hai to console me localStorage.clear() likh de.';
    alert(text);
}

// Login button
document.querySelector('.login-button').addEventListener('click', () => {
    let name = prompt('Apna naam likh:');
    if(name) {
        document.querySelector('.login-button').innerText = `Hi, ${name}`;
        alert(`Welcome ${name}!`);
    }
});

// Shop Now buttons
document.querySelectorAll('.shop-now, .small-banner button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.product-section').scrollIntoView({ behavior: 'smooth' });
    });
});