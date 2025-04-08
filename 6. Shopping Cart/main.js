//  Image slider


let currentIndexes = {};

// Show specific slide
function showSlide(sliderId, index) {
    const slider = document.getElementById(sliderId);
    const slides = slider.getElementsByClassName("slide");

    // Ensure index stays within bounds
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    // Hide all slides and show the active one
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");

    // Store the current index for this slider
    currentIndexes[sliderId] = index;
}

// Next slide
function nextSlide(sliderId) {
    if (!(sliderId in currentIndexes)) currentIndexes[sliderId] = 0;
    showSlide(sliderId, currentIndexes[sliderId] + 1);
}

// Previous slide
function prevSlide(sliderId) {
    if (!(sliderId in currentIndexes)) currentIndexes[sliderId] = 0;
    showSlide(sliderId, currentIndexes[sliderId] - 1);
}

// Initialize sliders on page load
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".slider").forEach((slider) => {
        const sliderId = slider.id;
        currentIndexes[sliderId] = 0;
        showSlide(sliderId, 0);
    });
});










// let currentSlide = 0;
// const slides = document.querySelectorAll(".slide");

// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.classList.remove("active");
//         if (i === index) {
//             slide.classList.add("active");
//         }
//     });
// }

// // Next slide
// function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
// }

// // Previous slide
// function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
// }
// // // Auto-slide every 3 seconds
// // setInterval(nextSlide, 3000);


let cart = [];

// Add Cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCart();
}

// Remove Cart
function removeCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Quantity update

function updateQuantity(index, value) {
    if (value <= 0) {
        removeCart(index);
    } else {
        cart[index].quantity = value;
    }
    updateCart();
}

// Update cart

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        const cartItem = document.createElement("tr");
        cartItem.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                    <input type = "number" value = "${item.quantity}" min = "1"
                    onchange = "updateQuantity(${index}, this.value)"
            </td>
            <td>$${item.price * item.quantity}</td>
            <td>
                    <button class = "remove-btn" onclick = "removeCart(${index})">Remove</button>
            </td>` ;

        cartContainer.appendChild(cartItem);

    });

    document.getElementById("total-price").textContent = total;
    document.getElementById("cart-count").textContent = totalQuantity;// cart.length (only show the item quentity in under the view cart)

}

// Open cart

function openCart() {
    document.getElementById("cart-model").style.display = "block";
}

// Close cart

function closeCart() {
    document.getElementById("cart-model").style.display = "none";
}






