
// Initialize Swiper only if the library is loaded and the container exists
if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        effect: "fade",
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

// Show/Hide the Category List
const readMoreBtn = document.getElementById('readMoreBtn');
const readLessBtn = document.getElementById('readLessBtn');
const expandedContent = document.getElementById('expandedContent');

if (readMoreBtn && readLessBtn && expandedContent) {
    readMoreBtn.addEventListener('click', () => {
        expandedContent.classList.remove('hidden');
        readMoreBtn.classList.add('hidden');
    });

    readLessBtn.addEventListener('click', () => {
        expandedContent.classList.add('hidden');
        readMoreBtn.classList.remove('hidden');
    });
}

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function (e) {
        const item = this.closest('.accordion-item');
        item.classList.toggle('open');
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });
    });
});


// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.querySelector('.nav-links');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        const icon = hamburgerMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// --- Cart Logic ---
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('zeyraCart')) || [];
} catch (e) {
    console.warn("Storage access denied. Cart will not persist.", e);
}

function saveCart() {
    try {
        localStorage.setItem('zeyraCart', JSON.stringify(cart));
    } catch (e) {
        console.warn("Could not save cart to storage.", e);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalCounter = document.getElementById('cartTotalCounter');

    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => el.textContent = totalItems);

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
            if (cartTotalCounter) cartTotalCounter.textContent = 'Rs. 0';
        } else {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
                total += priceNum * item.quantity;

                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price} x ${item.quantity}</p>
                        <span class="remove-item" onclick="removeFromCart(${index})">Remove</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
            if (cartTotalCounter) cartTotalCounter.textContent = `Rs. ${total.toLocaleString()}`;
        }
    }
}

window.addToCart = function (name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
};

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    saveCart();
};

const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartOverlay = document.getElementById('cartOverlay');

if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (cartSidebar) cartSidebar.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('active');
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('active');
    });
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('active');
    });
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.product-card');
        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.price').textContent;
        const image = card.querySelector('img').src;
        addToCart(name, price, image);
    }
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const icon = question.querySelector('.faq-icon');
        item.classList.toggle('active');
        icon.textContent = item.classList.contains('active') ? '-' : '+';

        document.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.faq-icon').textContent = '+';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', updateCartUI);




function openTab(evt, tabName) {
    var i, tabContent, tabLinks;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }

    // Remove "active" class from all buttons
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the current tab and add active class to button
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}




document.querySelectorAll('.cat-btn').forEach(button => {
    button.addEventListener('click', function () {
        // 1. Remove 'active' class from all buttons and add to clicked one
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            // 2. Logic for "ALL" vs Specific Category
            if (filterValue === 'all') {
                product.style.display = 'block'; // Show everything
            } else {
                if (product.getAttribute('data-category') === filterValue) {
                    product.style.display = 'block'; // Show matching
                } else {
                    product.style.display = 'none'; // Hide non-matching
                }
            }
        });
    });
});

// --- Auth Modal Functionality ---
const authModal = document.getElementById('authModal');
const userIcons = document.querySelectorAll('.fa-user');
const authClose = document.querySelector('.auth-close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Open auth modal when user icon is clicked
userIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close auth modal
if (authClose) {
    authClose.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (authModal) {
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Switch between login and signup forms
window.switchToSignup = function (e) {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
};

window.switchToLogin = function (e) {
    e.preventDefault();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
};

// Handle login form submission
window.handleLogin = function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Store user info in localStorage (in a real app, this would be an API call)
    const user = {
        email: email,
        loggedIn: true,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('zeyraUser', JSON.stringify(user));

    // Show success message
    alert('Login successful! Welcome back.');

    // Close modal
    authModal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Reset form
    e.target.reset();
};

// Handle signup form submission
window.handleSignup = function (e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Store user info in localStorage (in a real app, this would be an API call)
    const user = {
        name: name,
        email: email,
        loggedIn: true,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('zeyraUser', JSON.stringify(user));

    // Show success message
    alert('Account created successfully! Welcome to ZEYRA.');

    // Close modal
    authModal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Reset form
    e.target.reset();
};

// Handle contact form submission
window.handleContact = function (e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;

    // Simulate sending message
    alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you at ${email} soon.`);

    // Reset form
    e.target.reset();
};

// --- Search Functionality ---
const searchOverlay = document.getElementById('searchOverlay');
const searchIcons = document.querySelectorAll('.fa-search');
const searchClose = document.querySelector('.search-close');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Comprehensive product database with all categories
const allProducts = [
    // NECKLACES
    { name: 'Elegant Beaded Pearl Choker Set', price: 'Rs. 3,500', image: 'necklace/Elegant_Beaded_Pearl_Choker_Set_-_Antique_-_2.jpg', category: 'necklace' },
    { name: 'Hyderabadi Guluband Necklace', price: 'Rs. 3,500', image: 'necklace/B-1-HyderabadiGulubandNecklace.jpg', category: 'necklace' },
    { name: 'Zarrin Panna Pearl Choker Set', price: 'Rs. 3,250', image: 'necklace/Zarrin_Panna_Pearl_Choker_Set.jpg', category: 'necklace' },
    { name: 'Colorful Symphony Necklace', price: 'Rs. 3,500', image: 'necklace/Colorful-Symphony-Necklace.jpg', category: 'necklace' },
    { name: 'Embellished Necklace', price: 'Rs. 3,500', image: 'necklace/S-1-EmbellishedNecklace.jpg', category: 'necklace' },
    { name: 'Hyderabadi Guluband (Red)', price: 'Rs. 3,500', image: 'necklace/Hyderabadi_Guluband_Necklace_-_Red.jpg', category: 'necklace' },
    { name: 'Elegant Beaded Pearl Choker (Golden)', price: 'Rs. 3,500', image: 'necklace/Elegant_Beaded_Pearl_Choker_Set_-_Golden_-_1.jpg', category: 'necklace' },

    // EARRINGS
    { name: 'Emerald Baroque Pearl Earrings', price: 'Rs. 3,500', image: 'earings/EmeraldBaroquePearlEarrings-G-3.jpg', category: 'earrings' },
    { name: 'Elaborate Baroque Pearl Earrings', price: 'Rs. 3,500', image: 'earings/2_-_Bloom_Stud_Baroque_Pearl_Earrings.jpg', category: 'earrings' },
    { name: 'Bella Ruby Drop Earrings', price: 'Rs. 3,800', image: 'earings/BellaRubyStatementDropEarrings-1_3e5af33c-0643-4f8c-a1db-7bbf08eac22c.jpg', category: 'earrings' },
    { name: 'Bloom Stud Pearl Earrings', price: 'Rs. 2,500', image: 'earings/1_-_Bloom_Stud_Baroque_Pearl_Earrings.jpg', category: 'earrings' },
    { name: 'Elaborate Baroque Pearl Earrings (Pink)', price: 'Rs. 3,200', image: 'earings/ElaborateBaroquePearlEarrings-2.jpg', category: 'earrings' },
    { name: 'Emerald Baroque Pearl Earrings (Multi)', price: 'Rs. 3,500', image: 'earings/EmeraldBaroquePearlEarrings-MG-1.jpg', category: 'earrings' },
    { name: 'Elaborate Baroque Pearl Earrings (Gold)', price: 'Rs. 3,500', image: 'earings/ElaborateBaroquePearlEarrings-4.jpg', category: 'earrings' },
    { name: 'Bella Ruby Statement Drop Earrings', price: 'Rs. 3,800', image: 'earings/BellaRubyStatementDropEarrings-2.jpg', category: 'earrings' },

    // BANGLES
    { name: 'Exquisite Precious Formed Bangles', price: 'Rs. 4,500', image: 'bangles/Exquisite_Precious_Formed_Bangles_-_Multi_-_1.jpg', category: 'bangles' },
    { name: 'Virelle Bangles', price: 'Rs. 4,500', image: 'bangles/Virelle_Bangles_2.jpg', category: 'bangles' },
    { name: 'Dazzling Micro Butterfly Inspired Bangles', price: 'Rs. 4,500', image: 'bangles/Dazzling_Micro_Butterfly_Inspired_Bangles_.3.jpg', category: 'bangles' },
    { name: 'Multi Pearl Bangles', price: 'Rs. 4,500', image: 'bangles/53.jpg', category: 'bangles' },
    { name: 'Crest Bangles', price: 'Rs. 4,200', image: 'bangles/Crest_Bangles.jpg', category: 'bangles' },

    // BRACELETS
    { name: 'Bella Ribbon Bow Bracelet', price: 'Rs. 2,500', image: 'bracelet/Bella_Ribbon_Bow_Cluster_Bracelet_-_1.jpg', category: 'bracelet' },
    { name: 'Aurora Bracelet', price: 'Rs. 2,200', image: 'bracelet/AuroraBracelets.jpg', category: 'bracelet' },
    { name: 'Malachite Bracelet', price: 'Rs. 2,800', image: 'bracelet/MalachiteBracelets-1.jpg', category: 'bracelet' },
    { name: 'Cascade Bold Stone Bracelet', price: 'Rs. 1,800', image: 'bracelet/Cascade_Bold_Stone_Bracelet_-_1.jpg', category: 'bracelet' },
    { name: 'Estelle Cuff Stainless Steel Bracelet', price: 'Rs. 2,500', image: 'bracelet/Estelle_Cuff_Stainless_Steel_Bracelet_-_3.jpg', category: 'bracelet' },

    // PENDANTS
    { name: 'Minimalist Golden Satellite Chain', price: 'Rs. 699', image: 'pendant/NovaPendant-P-2.jpg', category: 'pendant' },
    { name: 'Nova Pendant', price: 'Rs. 3,500', image: 'pendant/NovaPendant-P-2.jpg', category: 'pendant' },
    { name: 'Chains-0050-B-1', price: 'Rs. 3,500', image: 'pendant/Chains-0050-B-1.jpg', category: 'pendant' },

    // FINGER RINGS
    { name: 'Gold Plated ADJUSTABLE Ring', price: 'Rs. 1,200', image: 'finger ring/Rich_Bold_Square_Cluster_Ring_-_1.jpg', category: 'finger-rings' },
    { name: 'Traditional Multi-hued Ring', price: 'Rs. 950', image: 'finger ring/Opulent_Multi_hued_Cluster_Ring.jpg', category: 'finger-rings' },
    { name: 'Dazzling Micro Stone Ring', price: 'Rs. 1,500', image: 'finger ring/Dazzling_Micro_Stone_Ring_5.jpg', category: 'finger-rings' },
    { name: 'Floral Design Ring', price: 'Rs. 650', image: 'finger ring/Pear_Cut_Lab_Cluster_Vortex_Ring_-_4.jpg', category: 'finger-rings' },

    // NOSE RINGS
    { name: 'Bride Dazzling Nose Ring', price: 'Rs. 2,800', image: 'nose ring/BRIDENOSERING-0010-R-1.jpg', category: 'nose-rings' },
    { name: 'Wedding Collection Nose Ring', price: 'Rs. 2,500', image: 'nose ring/WeddingNoseRing-0001-R-1.jpg', category: 'nose-rings' },
    { name: 'Bride Dazzling Nose Ring (Gold)', price: 'Rs. 2,800', image: 'nose ring/BrideDazzlingNoseRing-G-1.jpg', category: 'nose-rings' },

    // BRIDAL SETS
    { name: 'Anushka Bridal Set', price: 'Rs. 15,500', image: 'bridal set/GR-1-AnushkaBridalSet.jpg', category: 'bridal-sets' },
    { name: 'Primrose Bridal Set', price: 'Rs. 12,800', image: 'bridal set/Primrose_Bridal_Set_-_R_-_2.jpg', category: 'bridal-sets' },
    { name: 'Primrose Bridal Set (Pink)', price: 'Rs. 12,800', image: 'bridal set/Primrose_Bridal_Set_-_P_-_2.jpg', category: 'bridal-sets' }
];

// Open search overlay
searchIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
});

// Close search overlay
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
    });
}

// Close search when clicking outside
if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            searchInput.value = '';
            searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
        }
    });
}


// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length === 0) {
            searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
            return;
        }

        // Filter products based on search query (name or category)
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.category.replace('-', ' ').toLowerCase().includes(query)
        );

        // Display results
        if (filteredProducts.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for "${query}"</p>
                    <p style="font-size: 13px; margin-top: 10px;">Try searching for: necklace, earrings, bangles, bracelet, bridal, pendant, rings, nose ring</p>
                </div>
            `;
        } else {
            // Check if user is searching by category
            const categoryMatch = filteredProducts[0].category;
            const allSameCategory = filteredProducts.every(p => p.category === categoryMatch);

            let resultsHTML = '';

            // If searching by category, show category header
            if (allSameCategory && filteredProducts.length > 3) {
                const categoryName = categoryMatch.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
                resultsHTML = `
                    <div style="padding: 15px; background: #f8f9fa; border-radius: 10px; margin-bottom: 15px; text-align: center;">
                        <h3 style="color: #601026; margin: 0; font-size: 18px;">
                            <i class="fas fa-gem"></i> ${categoryName}
                        </h3>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 13px;">
                            Found ${filteredProducts.length} products
                        </p>
                    </div>
                `;
            }

            resultsHTML += filteredProducts.map(product => `
                <div class="search-result-item" onclick="window.location.href='${product.category}.html'">
                    <img src="${product.image}" alt="${product.name}" class="search-result-img">
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>${product.price}</p>
                    </div>
                </div>
            `).join('');

            searchResults.innerHTML = resultsHTML;
        }
    });
}

// Close search with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            searchInput.value = '';
            searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
        }
        if (authModal && authModal.classList.contains('active')) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
