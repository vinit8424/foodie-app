const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 249,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
        description: "Classic pizza with tomato, mozzarella and basil."
    },
    {
        id: 2,
        name: "Chicken Burger",
        category: "burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        description: "Juicy chicken patty with fresh vegetables."
    },
    {
        id: 3,
        name: "French Fries",
        category: "burger",
        price: 99,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
        description: "Crispy golden fries with seasoning."
    },
    {
        id: 4,
        name: "Cold Coffee",
        category: "drink",
        price: 129,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
        description: "Smooth and refreshing iced coffee."
    },
    {
        id: 5,
        name: "Chocolate Cake",
        category: "dessert",
        price: 179,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
        description: "Rich chocolate cake with creamy frosting."
    },
    {
        id: 6,
        name: "Veggie Pizza",
        category: "pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        description: "Loaded with fresh vegetables and cheese."
    }
];

let cart = [];

function displayFoods(category = "all") {
    const container = document.getElementById("food-container");

    const filteredFoods =
        category === "all"
            ? foods
            : foods.filter(food => food.category === category);

    container.innerHTML = filteredFoods.map(food => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}">

            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>

                <div class="food-bottom">
                    <span class="price">₹${food.price}</span>

                    <button class="add-btn" onclick="addToCart(${food.id})">
                        Add +
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function filterFood(category, button) {
    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    displayFoods(category);
}

function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const food = foods.find(item => item.id === id);

        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p style="text-align:center; color:#777;">
                Your cart is empty.
            </p>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="quantity">
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join("");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(`Thank you for your order! Total amount: ₹${total}`);

    cart = [];
    updateCart();
    toggleCart();
}

displayFoods();
updateCart();