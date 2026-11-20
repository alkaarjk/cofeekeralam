
document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // MOBILE NAVIGATION
    // =================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    // =================================
    // SHOPPING CART
    // =================================

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let cart = [];

    // Load saved cart safely
    try {

        const savedCart = JSON.parse(
            localStorage.getItem("coffeeKeralamCart")
        );

        if (Array.isArray(savedCart)) {

            cart = savedCart.filter(item =>

                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                item.price > 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0

            );

        }

    } catch (error) {

        cart = [];

    }


    // =================================
    // UPDATE CART
    // =================================

    function updateCart() {

        cartItems.replaceChildren();

        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";

            const details = document.createElement("div");

            const heading = document.createElement("h3");
            heading.textContent = item.name;

            const price = document.createElement("p");

            price.textContent =
                `₹${item.price} × ${item.quantity} = ₹${itemTotal}`;

            details.append(heading, price);


            // ACTION BUTTONS

            const actions = document.createElement("div");
            actions.className = "cart-actions";


            // DECREASE

            const decrease = document.createElement("button");

            decrease.textContent = "-";
            decrease.setAttribute("aria-label", "Decrease quantity");

            decrease.addEventListener("click", () => {

                item.quantity--;

                if (item.quantity <= 0) {

                    cart.splice(index, 1);

                }

                updateCart();

            });


            // QUANTITY

            const quantity = document.createElement("span");

            quantity.textContent = item.quantity;


            // INCREASE

            const increase = document.createElement("button");

            increase.textContent = "+";
            increase.setAttribute("aria-label", "Increase quantity");

            increase.addEventListener("click", () => {

                item.quantity++;

                updateCart();

            });


            // REMOVE

            const remove = document.createElement("button");

            remove.textContent = "Remove";
            remove.className = "remove-button";

            remove.addEventListener("click", () => {

                cart.splice(index, 1);

                updateCart();

            });


            actions.append(
                decrease,
                quantity,
                increase,
                remove
            );

            itemDiv.append(details, actions);

            cartItems.appendChild(itemDiv);

        });


        // EMPTY CART

        if (cart.length === 0) {

            const empty = document.createElement("p");

            empty.className = "empty-cart";
            empty.textContent = "Your cart is empty.";

            cartItems.appendChild(empty);

        }


        // UPDATE TOTAL

        cartTotal.textContent = total.toFixed(2);

        cartCount.textContent = count;


        // SAVE CART

        try {

            localStorage.setItem(
                "coffeeKeralamCart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error("Unable to save shopping cart.", error);

        }

    }


    // =================================
    // ADD TO CART
    // =================================

    document.querySelectorAll(".add-to-cart").forEach(button => {

        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            if (!name || !Number.isFinite(price) || price <= 0) {
                return;
            }

            const existingProduct = cart.find(
                item => item.name === name
            );

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            updateCart();

            const originalText = "Add to Cart";

            button.textContent = "Added Successfully ✓";
            button.disabled = true;

            setTimeout(() => {

                button.textContent = originalText;
                button.disabled = false;

            }, 1000);

        });

    });


    // =================================
    // WHATSAPP ORDER
    // =================================

    const checkoutButton =
        document.getElementById("checkout-btn");

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your shopping cart is empty!");

            return;

        }

        // REPLACE WITH YOUR REAL WHATSAPP NUMBER
        const phoneNumber = "919876543210";

        let message =
            "Hello Coffee Keralam! I would like to place an order.\n\n";

        cart.forEach(item => {

            message +=
                `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;

        });

        const total = cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

        message +=
            `\nTotal Amount: ₹${total.toFixed(2)}`;

        const whatsappURL =
            "https://wa.me/" +
            phoneNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });


    // =================================
    // CONTACT FORM VALIDATION
    // =================================

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("form-status");

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        if (!name || !email || !message) {

            formStatus.textContent =
                "Please complete all fields.";

            return;

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            formStatus.textContent =
                "Please enter a valid email address.";

            return;

        }

        formStatus.textContent =
            "Thank you! This demo form has been validated. Email delivery requires a backend or form service.";

        contactForm.reset();

    });


    // =================================
    // CURRENT YEAR
    // =================================

    document.getElementById("current-year").textContent =
        new Date().getFullYear();


    // INITIAL CART DISPLAY

    updateCart();

});
