/* app.js */

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subTotalElem = document.querySelector(".subtotal");

const cartJSON = localStorage.getItem("CART") || "[]"
const cart = JSON.parse(cartJSON);

updateCart();

function renderProducts() {
	if (productsEl) {
		products.forEach((product) => {
			productsEl.innerHTML += `
                <div class="item">
                    <div class="item-container">
                        <div class="item-img">
                            <img src=${product.imgSrc} alt=${product.name}>
                        </div>
                        <div class="desc">
                            <h2>${product.name}</h2>
                            <h2><small>$</small>${product.price}</h2>
                            <p>
                                ${product.description}
                            </p>
                        </div>
                        <div class="add-to-wishlist">
                            <img src="./icons/heart.png" alt="add to wish list">
                        </div>
                        <div class="add-to-cart" onclick="addToCart(${product.id})">
                            <img src="./icons/bag-plus.png" alt="add to cart">
                        </div>
                    </div>
                </div>
            `;
		});
	}
}

/**
 * @param {number} productId
 */
function addToCart(productId) {
	if (cart.some((product) => product.id === productId)) {
		console.log("Element already exists in cart");
		return;
	}

	cart.push({
		...products.find((product) => product.id === productId),
		numUnits: 1,
	});
	updateCart();
}

function updateCart() {
	renderCartItems();
	renderSubTotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart))
}

function renderCartItems() {
	if (cartItemsEl) {
		cartItemsEl.innerHTML = "";
		cart.forEach((cartItem) => {
			cartItemsEl.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <img src=${cartItem.imgScr} alt=${cartItem.name}>
                    <h4>${cartItem.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${cartItem.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('-', ${cartItem.id})">-</div>
                    <div class="number">${cartItem.numUnits}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('+', ${cartItem.id})">+</div>           
                </div>
            </div>
            `;
		});
	}
}

/**
 * @param {string} operation
 * @param {number} cartItemId
 */
function changeNumberOfUnits(operation, cartItemId) {
	let cartItem = cart.find((cartItem) => cartItem.id === cartItemId);
	if (operation === "+") {
		cartItem.numUnits += 1;
	} else if (operation === "-" && cartItem.numUnits > 0) {
		cartItem.numUnits -= 1;
	}
	updateCart();
}

function renderSubTotal() {
	let totalPrice = 0,
		totalItems = 0;

	cart.forEach((item) => {
		totalPrice += item.price * item.numUnits;
		totalItems += item.numUnits;
	});

	if (subTotalElem) {
		subTotalElem.textContent = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
	}
}

renderProducts();
