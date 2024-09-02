document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');
    const menuIcon = document.querySelector('.menu-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const overlay = document.getElementById('overlay');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');
    const shopButton = document.getElementById('shop-button');
    const allProductsSection = document.getElementById('all-products');
    const newArrivalsButton = document.getElementById('new-arrivals-button');
    const bestSellerSection = document.getElementById('best-seller');
    const brandsButton = document.getElementById('brands-button');
    const brandsSection = document.getElementById('brands');
    const contactButton = document.querySelector('.nav-links a[href="#contact"]');
    const contactCard = document.getElementById('contact-card');
    const closeContactCard = document.getElementById('close-contact-card');
    const placeOrderButton = document.getElementById('place-order-button');
    const popupNotification = document.getElementById('popup-notification');
    const popupMessage = document.getElementById('popup-message');

    let cart = [];
    let cartTotal = 0;

    function addToCart(productName, price) {
        const existingProduct = cart.find(item => item.product === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ product: productName, price: price, quantity: 1 });
        }
        updateCartUI();
        showNotification(`"${productName}" has been added to your cart.`);
    }

    function showNotification(message) {
        if (popupNotification && popupMessage) {
            popupMessage.textContent = message;
            popupNotification.classList.add('show');
            setTimeout(() => {
                popupNotification.classList.remove('show');
            }, 2000); // Notification visible for 2 seconds
        }
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function updateCartUI() {
        if (cartContent) {
            cartContent.innerHTML = '';
            if (cart.length === 0) {
                cartContent.innerHTML = '<p>Your cart is empty.</p>';
                if (cartSummary) cartSummary.innerHTML = '';
            } else {
                cart.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item';
                    itemDiv.innerHTML = `
                        <span>${item.product} (x${item.quantity})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-item" data-product="${item.product}">Remove</button>
                    `;
                    cartContent.appendChild(itemDiv);
                });
                if (cartSummary) cartSummary.innerHTML = `<p>Total: $${calculateTotal()}</p>`;
            }
    
            // Attach event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productName = e.target.dataset.product;
                    removeFromCart(productName);
                });
            });
        }
    }
    
    function removeFromCart(productName) {
        cart = cart.filter(item => item.product !== productName);
        updateCartUI();
    }
    
    // Search box toggle
    if (searchIcon && searchBox) {
        searchIcon.addEventListener('click', () => {
            searchBox.classList.toggle('active');
        });
    }

    // Dropdown menu toggle
    if (menuIcon && dropdownMenu) {
        menuIcon.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });
    }

    // Cart modal and overlay handling
    if (cartIcon && cartModal && overlay) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.toggle('active');
            overlay.classList.toggle('active');
            updateCartUI();
        });

        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartModal.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        overlay.addEventListener('click', () => {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (menuIcon && dropdownMenu && !menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Smooth scroll for "Shop Now" button
    if (shopButton && allProductsSection) {
        shopButton.addEventListener('click', (event) => {
            event.preventDefault();
            allProductsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scroll for "New Arrivals" button
    if (newArrivalsButton && bestSellerSection) {
        newArrivalsButton.addEventListener('click', (event) => {
            event.preventDefault();
            bestSellerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Brands button handling
    if (brandsButton && brandsSection) {
        brandsButton.addEventListener('click', (event) => {
            event.preventDefault();
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section !== brandsSection) {
                    section.style.display = 'none';
                }
            });
            brandsSection.style.display = 'block';
        });
    }

    // Show all sections
    function showAllSections() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => section.style.display = 'block');
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            const targetSectionId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                event.preventDefault();
                showAllSections();
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact card display toggle
    if (contactButton && contactCard && closeContactCard) {
        contactButton.addEventListener('click', (event) => {
            event.preventDefault();
            contactCard.style.display = 'flex';
        });

        closeContactCard.addEventListener('click', () => {
            contactCard.style.display = 'none';
        });

        document.addEventListener('click', (e) => {
            if (contactCard && !contactCard.contains(e.target) && !contactButton.contains(e.target)) {
                contactCard.style.display = 'none';
            }
        });
    }

    // Handle clicks on add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.dataset.product;
            const price = parseFloat(e.target.dataset.price);
            addToCart(product, price);
        });
    });

    // Handle "Place Order" button
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Please add products to your cart');
            } else {
                alert('Your order is being placed. It will be delivered in 3-5 working days. Thanks for shopping!');
                cart = []; // Clear the cart after placing the order
                updateCartUI(); // Update the cart UI to reflect the emptied cart
            }
        });
    } else {
        console.warn('Place order button not found');
    }
});
function removeItem(button) {
    // Find the parent list item of the button and remove it
    const item = button.closest('li');
    item.remove();

    // Update the cart total (if applicable)
    updateCartTotal();
}

function updateCartTotal() {
    // Implement logic to update the total price
    let total = 0;
    document.querySelectorAll('#cart-items .item-price').forEach(priceElement => {
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        total += price;
    });
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

