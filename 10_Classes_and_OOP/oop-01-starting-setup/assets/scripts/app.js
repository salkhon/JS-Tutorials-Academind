// we worked with the object literal notation
// we'll look into OOP in JS.

// OOP - approach, way of writing, structuring code, way of thinking, reasoning and planning code.
// - Work with real life entities in your code.

// you can write JS code in a functional way and that is not bad.

const productList = {
	products: [
		{
			title: "A Pillow",
			imageUrl:
				"https://media.istockphoto.com/photos/white-pillow-isolated-on-white-background-picture-id1018424252",
			price: 19.99,
			description: "A soft pillow!",
		},
		{
			title: "A Carpet",
			imageUrl:
				"https://media.istockphoto.com/photos/ice-blue-carpet-picture-id172452491?s=612x612",
			price: 89.99,
			description: "A carpet which you might like - or not.",
		},
	],

	render() {
		const renderHook = document.getElementById("app");
		const prodListElem = document.createElement("ul");
		prodListElem.className = "product-list";
		for (const product of this.products) {
			const prodElem = document.createElement("li");
			prodElem.className = "product-item";
			prodElem.innerHTML = `
                <div>
                    <img src="${product.imageUrl}" alt="${product.title}">
                    <div class="product-item__content">
                        <h2>${this.title}</h2>
                        <h3>\$${product.price}</h3>
                        <p>${product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
			prodListElem.append(prodElem);
		}
		renderHook.append(prodListElem);
	},
};

// productList.render();
// object literal notation is not reusable.
// It's great if we want to craete a object on the fly or just need to group some data together.

/**
 * Objects
 * - The things you work with in code
 * - Instances of classes (= based on classes)
 * - Class-based creation is an alternative to using object literals!
 *
 * Classes
 * - Blueprints for objects
 * - Define how objects look like, which properties and methods they have
 * - Classes make creation of multiple similar objects much easier
 */

class Product {
	title = "DEFAULT"; // asign with equal, not colon. End with semicolon, not comma.
	imageUrl; // undefined
	description;
	price;

	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		// in JS you can add properties in the constructor for the first time. The pre declaration of fields is
		// for default value.
	}
}

class ElementAttribute {
	constructor(attrName, attrVal) {
		this.name = attrName;
		this.val = attrVal;
	}
}

class Component {
	constructor(renderHookId, shouldRender = true) {
		this.hookId = renderHookId;
		if (shouldRender) {
			this.renderElement();
		}
	}

	renderElement() {
		// "this" is specified by the caller. Component constructor is called in it's child - but the main caller
		// is the "new" keyword. The user calls the child constructors. Therefore "this" refers to those child objects.
		// And therefore, "this" will refer to OVERRIDDEN renderElement() methods.
	}

	createRootElement(tag, cssClasses, attributes) {
		const rootElem = document.createElement(tag);

		if (cssClasses) {
			rootElem.className = cssClasses;
		}

		if (attributes && attributes.length > 0) {
			for (const attr of attributes) {
				rootElem.setAttribute(attr.name, attr.val);
			}
		}

		document.getElementById(this.hookId).append(rootElem);

		return rootElem;
	}
}

class ProductList extends Component {
	products = [];

	constructor(hookId) {
		super(hookId);
		this.fetchProducts();
		this.renderProducts();
	}

	fetchProducts() {
		this.products = [
			new Product(
				"A Pillow",
				"https://media.istockphoto.com/photos/white-pillow-isolated-on-white-background-picture-id1018424252",
				"A soft pillow!",
				19.99
			),
			new Product(
				"A Carpet",
				"https://media.istockphoto.com/photos/ice-blue-carpet-picture-id172452491?s=612x612",
				"A carpet which you might like - or not. ",
				89.99
			),
		];
	}

	renderProducts() {
		for (const product of this.products) {
			new ProductItem(product, "prod-list");
		}
	}

	renderElement() {
		super.createRootElement("ul", "product-list", [
			new ElementAttribute("id", "prod-list"),
		]);
		if (this.products && this.products.length > 0) {
			this.renderProducts();
		}
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId, false);
		this.product = product;
		this.renderElement();
	}

	renderElement() {
		const prodElem = super.createRootElement("li", "product-item");
		prodElem.innerHTML = `
			<div>
				<img src="${this.product.imageUrl}" alt="${this.product.title}">
				<div class="product-item__content">
					<h2>${this.product.title}</h2>
					<h3>\$${this.product.price}</h3>
					<p>${this.product.description}</p>
					<button>Add to Cart</button>
				</div>
			</div>
		`;
		const addCartButtonElem = prodElem.querySelector("button");
		addCartButtonElem.addEventListener(
			"click",
			this.#handleAddToCart.bind(this)
		);
	}

	#handleAddToCart() {
		// can't call using "this" without binding, because the callback will be called in button element.
		console.log(`Adding ${this.product.title} to cart`);
		// need to access ShoppingCart directly, or through intermediates
		App.addProductToCart(this.product);
	}
}

class ShoppingCart extends Component {
	// there will only be one shopping cart. Might make it static or singleton.
	items = [];

	constructor(hookId) {
		super(hookId);
	}

	get totalAmount() {
		return this.items.reduce(
			(prevVal, currItem) => prevVal + currItem.price,
			0
		);
	}

	set cartItems(value) {
		this.items = value;
		this.totalOutputH2.textContent = `Total: \$${this.totalAmount}`;
	}

	addProduct(product) {
		this.items.push(product);
		this.totalOutputH2.textContent = `Total: \$${this.totalAmount.toFixed(
			2
		)}`;
	}

	_handleOrderProducts() {
		console.log("ordering...", this.items);
	}

	renderElement() {
		const cartElem = super.createRootElement("section", "cart");
		cartElem.innerHTML = `
		<h2>Total: \$${0}</h2>
	  	<button>Order Now!</button>
		`;
		const orderButton = cartElem.querySelector("button");
		orderButton.addEventListener("click", this._handleOrderProducts.bind(this));
		this.totalOutputH2 = cartElem.querySelector("h2"); // can define property anywhere
	}
}

class Shop {
	constructor() {
		this.renderElement();
	}
	// combine Cart and ProductList
	renderElement() {
		this.cart = new ShoppingCart("app"); // now this is a property to update
		new ProductList("app");
	}
}

class App {
	static cart;

	static init() {
		// "this" here respresents the class.
		const shop = new Shop();
		this.cart = shop.cart; // communicating the same property
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();

/**
 * Static field / property / method
 * - Defined with "static" keyword
 * - Only accessible on class itself, wihout instantiation
 * - Typically used in helper classes, global configuration
 *
 * Instance Field / Property / Method
 * - Defined without "static" keyword
 * - Only accessible on instances
 *
 * Are object literals ({}) obsolete?
 * > No!
 * 		- Great for general data grouping, objects which you only create once.
 * 		- Quick and easy to create, no overhead
 * > But also condider classes!
 * 		- Great when you re-create the same type of object over and over again
 * 		- More overhead initially but easy "object duplication" thereafter
 */

// LOOK INTO WHERE "this" is what. 

/**
 * Private fields, properties and methods
 * Public:
 * - Accessible OUTSIDE of the class / object
 * - The "things" you work with in your other code
 * - Example: product.buy()
 * 
 * Private
 * - Accessible ONLY INSIDE of the class / object
 * - The "things" you work with in your class only (to split & re-use code)
 * - Example: Hard-cded (fallback) values, re-used class-specific logic
 * USE # in front of property to make it private in vanilla JS
 */

// All objects inherit from Object. 

// Object.getOwnPropertyDescriptors() gets you some meta data stored behind the scenes by JS. 
// It influences how the properties can be used. 
/**
 * property:
 * - value: the value that is contained
 * - writable: assignable
 * - configurable: for example, can delete it
 * - enumerable: appears in a for in loop. 
 * 
 * Sometimes in advanced programs you might want to lock down a property. You want to make sure that it can't be 
 * written to. 
 * 
 * You do:
 * Object.defineProperty(person, "name", {
 * 		configurable: true, 
 * 		enumerable: true,
 * 		value: person.name, 
 * 		writable: false
 * });
 * 
 * We could prevent deletion of property by setting:
 * Object.defineProperty(person, "name", {
 * 		configurable: false, 
 * 		enumerable: true,
 * 		value: person.name, 
 * 		writable: true
 * });
 * 
 * If we want to make sure that functions or methods are not included as for in loop key, 
 * Object.defineProperty(person, "greet", {
 * 		configurable: true, 
 * 		enumerable: false, 
 * 		value: person.greet, 
 * 		writable: true
 * });
 * 
 */
