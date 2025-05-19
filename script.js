// Загрузка корзины из localStorage
function loadCartFromStorage() {
    try {
        const storedCart = localStorage.getItem('cart');
        if (!storedCart) return [];
        const parsed = JSON.parse(storedCart);
        if (!Array.isArray(parsed)) throw new Error('Cart is not an array');
        return parsed;
    } catch (e) {
        localStorage.removeItem('cart');
        return [];
    }
}

// Инициализация корзины
let cart = loadCartFromStorage();

// Основная инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем счетчик корзины на всех страницах
    updateCartCount();
    
    // Инициализация модального окна корзины
    initCartModal();

    // Инициализация страницы каталога
    if (document.getElementById('products-grid')) {
        renderProducts(products);
        setupCatalogEventListeners();
    }

    // Инициализация страницы товара
    if (document.getElementById('product-container')) {
        const productId = new URLSearchParams(window.location.search).get('id');
        if (productId) {
            loadProductDetails(productId);
        }
    }

    // Инициализация страницы оформления заказа
    if (document.getElementById('checkout-items-container')) {
        renderCheckoutItems();
        setupCheckoutForm();
    }
    fetch('footer.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            // Создаем HTML-структуру
            const div = document.createElement('div');
            div.className = className;
            
            const p = document.createElement('p');
            p.innerHTML = textContent;
            
            div.appendChild(p);
            
            // Вставляем в DOM
            const container = document.getElementById('xml-footer-content');
            if (container) {
                container.appendChild(div);
            } else {
                console.error('Container element not found');
            }
        })
});

// Инициализация модального окна корзины
function initCartModal() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');

    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.style.display = 'block';
            renderCartItems();
        });
    }

    if (cartModal) {
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }
}

// Рендер товаров на странице каталога
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-id="${product.id}">
            <a href="product.html?id=${product.id}" class="product-image-link">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </a>
            <div class="product-info">
                <h3 class="product-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <p class="product-price">${product.price.toLocaleString()} Br</p>
                <button class="btn add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        </div>
    `).join('');
}

// Настройка обработчиков событий для каталога
function setupCatalogEventListeners() {
    // Функция для применения фильтров
    function applyFilters() {
        const minPrice = parseInt(document.getElementById('min-price').value) || 0;
        const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
        const guitarType = document.getElementById('guitar-type').value;
        const sortValue = document.getElementById('sort-by').value;
        const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

        let filteredProducts = [...products];
        
        // Фильтрация по цене
        filteredProducts = filteredProducts.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
        
        // Фильтрация по типу
        if (guitarType !== 'all') {
            filteredProducts = filteredProducts.filter(product => 
                product.type === guitarType
            );
        }
        
        // Фильтрация по поисковому запросу
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }

        // Сортировка
        switch(sortValue) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // По умолчанию - исходный порядок
                break;
        }

        renderProducts(filteredProducts);
    }

    // Назначаем обработчики на все элементы фильтров
    document.getElementById('guitar-type')?.addEventListener('change', applyFilters);
    document.getElementById('min-price')?.addEventListener('input', applyFilters);
    document.getElementById('max-price')?.addEventListener('input', applyFilters);
    document.getElementById('sort-by')?.addEventListener('change', applyFilters);
    document.getElementById('search-input')?.addEventListener('input', applyFilters);

    // Добавление в корзину
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
            updateCartCount();
        }
    });
}

// Работа с корзиной
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showAddedToCartMessage(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    renderCheckoutItems();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    countElements.forEach(el => {
        el.textContent = totalCount;
    });
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Ваша корзина пуста</p>';
        document.getElementById('cart-total-price').textContent = '0';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="quantity-controls">
                    <button class="btn quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p>${item.price.toLocaleString()} Br × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} Br</p>
            </div>
            <button class="btn remove-from-cart" data-id="${item.id}">&times;</button>
        </div>
    `).join('');

    // Обновляем итоговую сумму
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-price').textContent = totalPrice.toLocaleString();

    // Добавляем обработчики для кнопок
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.getAttribute('data-id'));
        });
    });

    // Добавляем обработчики для кнопок изменения количества
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                renderCheckoutItems();
            }
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(i => i.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(i => i.id !== productId);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                renderCheckoutItems();
            }
        });
    });
}

function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `Товар "${productName}" добавлен в корзину!`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('show');
    }, 10);

    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Функции для страницы товара
function loadProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const container = document.getElementById('product-container');
        container.innerHTML = `
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}" class="main-product-image">
            </div>
            <div class="product-info">
                <h1 class="product-title">${product.name}</h1>
                <p class="product-price">${product.price.toLocaleString()} Br</p>
                <div class="product-description">
                    <h3>Описание</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-specs">
                    <h3>Характеристики</h3>
                    <ul>
                        ${product.specs.map(spec => `<li><strong>${spec.name}:</strong> ${spec.value}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;

        // Добавляем обработчик для кнопки "В корзину"
        document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            addToCart(product.id);
            updateCartCount();
        });
    }
}

// Функции для страницы оформления заказа
function renderCheckoutItems() {
    const container = document.getElementById('checkout-items-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Ваша корзина пуста</p>';
        document.getElementById('order-total-price').textContent = '0';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <div class="quantity-controls">
                    <button class="btn quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p>${item.price.toLocaleString()} Br × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} Br</p>
            </div>
        </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);   
    document.getElementById('order-total-price').textContent = totalPrice.toLocaleString();

    // Добавляем обработчики для кнопок изменения количества
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                renderCheckoutItems();
            }
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const item = cart.find(i => i.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(i => i.id !== productId);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                renderCheckoutItems();
            }
        });
    });
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить отправку данных на сервер
        alert('Заказ успешно оформлен! Спасибо за покупку!');
        
        // Очищаем корзину после оформления заказа
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Перенаправляем на главную страницу
        window.location.href = 'index.html';
    });
}
