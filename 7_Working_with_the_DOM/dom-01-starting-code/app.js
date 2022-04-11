// Connection between html and the script.

// Loading of html, DOM adn how JS fits in. 
// Nodes and ELements. Html content in JS
// Querying DOM Nodes, getting access to teh rendered html code. 
// Read and manipulate the DOM, for example change the style of the element. 
// We'll look at how to add or remove elements to the rendered html (DOM nodes)

// Whats DOM?
// The Document Object Model.
// JS and Browser interacts all the time.
// Browser:
/*
<body>
<h1>Welcome!</h1>
</body>

Parsed and rendered by the browser. Top to bottom. Ecnounters script - executes it. 

*/
// JS is a hosted language. That means that the browser provides the environment for JS to run. 
// It provides the JS Engine which parses and executes the JS code. 
// The browser also provides a bunch of API that allows the source to interact with 
// the browser. The browser exposes functionality to let JS interact with that
// rendered html code. That's called Document Object Model. 
// So DOM is loaded and rendered html, or to be precise the object representation
// of this html code into which we can tap with JS. 
// const titleEl = document.querySelector('h1');

// DOM is not strictly tied to browsers. There are other tools that can parse
// html. Not restricted to JS, tools can allow to read and work with html code in python
// or also with JS if you are running it in NodeJS, which does not have this DOM functionality
// built in, becuase it is detached from the browser. You can add certain packages
// to bring that back in. The borwser has that all buit in for you.

// In the end, it has 2 important built-in global objects that grant you this access. 
// document object - globally available, which the browser exposes to you to interact with the
// html page. 
// Another important object, document is a property of that object is - window object. 
// Document is the root DOM node that the browser esposes to you. That means that this 
// is the top most entry point to get access to all that rendered html code. 

// document vs window.
// document: 
// - Root DOM node, 
// - Provides access to element querying, DOM content etc. 
// window: 
// - Real topmost global object exposed to you in JS in the browser. 
// - Which reflects the browser window that is active. 
// - It's your global storage for your 
// script. Gives access to all the features that the browser wants to expose to you.  

// You can call alert() directly because it is a method of window. 
// Because you have access of window, you can just call the alert(). 
// equivalent window.alert()
// Browser always looks at thw window object if you call something. 
// so document IS window.document. 
// So the window object has other nice features, store data in the browser
// THere are some events that are exclusive to the window. 

// Also window does not give access to the entire window, but to the tab you are running, 
// otherwise it would be a security risk.


// HTML renders the pixels of the webpage, also parses the html code and creats an
// object representation. Because in the end, the browser does not work with text which
// html originally is, but with objects that are sotred in memory. 
// Therefore the <htlm> tag is translated into HTML node. This is an element node to be
// precise. Represents HTML element.
// HTML, HEAD, TITLE, BODY, HEADER, H1
// A structure is created, because the browser creates a tree of nodes. 
// The html node is the top mode, which has child nodes and grand chiild nodes and so forth. 

// NOt just html trags are loaded and created as objects, also all texts. 
// These are created as text nodes. 
// Whitespaces are translated as a node in the browser. White spaces are not rendered
// But they are part of the DOM. All texts are a part of DOM as text nodes. 
// You have Element Nodes for all the elements. Content in the elements might be elements
// and also Text Nodes. Text is indeed stored as objects, with different fields and 
// methods thatn element node. 

// You can't see text nodes in the dev tools. We'll see them when querying. 
// A BIG feature of the dev tools, is you can edit the html on the fly, without
// commiting to your actual file. 

// Query from html: querySelector(), getElementById(). these methods will select one element
// at a time. You also have: querySelectorAll(), getElementsByTagName() which selects
// multiple elements. 

// querySelector takes CSS selectors or pseudo selectors. Gives you power. 
// getElementById takes an Id which you might have assigned. Since id should be unique in
// your webpage, selects a particular element. 
// querySelector will give you FIRST match in your the page. 
// This gives you a direct reference to the DOM element, which it found. 

// querySelectAll(), getElementsByTagName() returns collections of elements (array-like objects): NodeList.
// Different way of querying elements (CSS selectos, by tag name, by CSS class)
// Important: querySelectorAll() will give youa non live node list. A snapshot of the currently
// rendered DOm. Whereas get something by something (getElementByTagName()) will return
// a live node list, responds to changing the DOM. 

/*
Nodes:
- The objects that make up the DOM. 
- HTML tags are just element nodes. 
- Text creates text nodes. 
- Attributes create attribute nodes. 

Elements are one type of node. So elements are created off of html tags which where rendered, 
// Not by the texts in there.  
// On element nodes you have properties and methods to interact with the elements. 
// To change their style, to change their content. You also have special methods and 
// properties on text nodes, but you don't work with text nodes as often as elements. 
// Typically you want add an element, remove them, you want to change the style or edit
// it on any other way. 
// For text you want to just want to change the text, then you go to the element that 
holds the text and change the child content of that element. Which is why we don't work with
text nodes that often.
- Available methods and properties depend on the kind of elements.
- Can be selected in various different ways via JS. 
- Can be created adn removed visa JS. 
*/

// Querying Elements
/**
 * All query methods are available in documents, or also any other element node. 
 * 
 * document.getElementById("id"); // No # at the beginning, because that's for CSS selector. 
 * 
 * by console.dir() we can see all the methods and properties of the element. 
 * Such objects are created for all html elements.
 * const h1 = document.getElementById('main-title');
 * h1.querySelectorAll(), is supported. 
 * but, h1.getElementById() is NOT SUPPORTED. 
 * 
 * So summary: with document, then some selection method, you search the entire document 
 * for an element, a class name of a CSS selector - but then once you have one element, 
 * and you want to search the child of the selected element, you can use methods from the 
 * retrieved element node.
 *  
 * document.getElementsByClassName('list-item') will return an HTML collection object. 
 * Not an array, but array-like. You can use a for loop to search through and select items 
 * by index. 
 * 
 * More popular nowadays are document.querySelector();
 * document.getElementById() is common, because Id is supposed to be unique. 
 * 
 * But if you want a collection, or a more complex query, querySelector is the way to go. 
 * 
 * For querySelectors you use selectors as you would in CSS. 
 * For class you use a . (dot) infront. 
 * For id you use #
 * All list item selection:
 * document.querySelector('list-item')
 * querySelector() will select the first matching document. 
 * querySelectorAll() will fetch all matching items. 
 * Will return a NodeList. 
 * 
 * The selector can be complex. 
 * document.querySelector('ul li:first-of-type')
 * ul then for a list item, and then the first of such type. 
 * first-of-type is a pseudo selector. 
 * last-of-type selects the last item. 
 * 
 * So querySelector gives you a lot of power to target individual elements on you screen.  
 * You would want to do that to add Event Listeners, Manipulate these elements on the go. 
 * That's the cool thing about JS, it runs in the browser after the webpage has been loaded. 
 * So it allows you to manipulate what's in the screen with the loaded page.
 * It creates a highly dynamic UXs, where you can change things on the UI - without the
 * need to reload a new document. This provides a faster and better UX instead than if 
 * the document reloads on every click. 
 * 
 * REALLY IMPORTANT for DOM:
 * import your script correctly. You need to import you script such that it only runs after 
 * all the html contents have been parsed and loaded.  
 * That can be achieved by putting it in the end. Or, importing it in the head - but adding defer. 
 * That way - download it early but only run it once you are done with parsing. 
 * */

/**
 * JS heavy applications change things in the rendered UI without the need to reload a new 
 * page with that changed html code. Instead you want to change it on the already loaded page.  
 * 
 * <p id="welcome-text" class="text-default">Welcome!</p>
 * 
 * const p = document.getElementById('welcome-text');
 * p.textContent -> "Welcome!"
 * p.id -> "welcome-text"
 * p.className -> "text-default"
 * You don't always change things, you might want to find at what state is the element. 
 * 
 * You CAN also change this, p.className = "new-class";
 * NOT ALL properties are change-able, but alot of them are. 
 * You can assign a new text here and this will be reflected back in the DOM. 
 * <p .. class="new-class">
 * Totally automatically by the browser. 
 *  
 * const h1 = document.querySelector('h1');
 * h1.textContent = 'Some new text!';
 * // It removes the old TEXT NODE, creates a new TEXT NODE and replaced the old one
 * with it. 
 * 
 * h1.className = 'title';
 * // And now if we had some CSS code, we would see changes reflected if that class
 * // was addressed. 
 * 
 * h1.style. -> GIVES ACCESS to a huge object with all CSS styles translated to JS 
 *              properties. 
 * h1.style.color = 'white'; // HEXCODE could be used as well. 
 * h1.style.backgroundColor = 'black';
 * // background-color WON't WORK. Property names can't have dashes.
 *  
 * Q. But how do I know which properties are available?
 *  - console.dir(domObject)
 *  - You can search on MDN. 
 * 
 * NB: What you do in JS is only in memory, when you reload it - it will be lost. 
 * Does not affect on the underlying files which were loaded. Which is in some server. 
 * 
 */
/**
 * Attributes vs Properties
 * Often (but not always), attributes are mapped to properites and "live synchronization" is set up. 
 * <input id="input-1" class="input-default" values="Enter text...">
 * 3 attributes, that behave in different ways, in terms of the DOM object that is created and how the properties of that 
 * object are initialized. 
 * Attributes (plaxed in HTML code, on element tags). Browser creates DOM and preconfigures some its properties based on
 * these attributes. 
 * 
 * Property is value that is store in the object that is created based on the html code. 
 * 
 * const input = document.querySelector('input');
 * input.id, input.className, input.value
 * Properties are automatically added on created DOM objects. 
 * 
 * NB: Not every attribute has a direct one to one mapping in properties. 
 * input.id has it. (1:1 mapping + live-sync)
 * input.className (different name but live-sync)
 * input.value (1:1 mapping but 1-way live sync). If you change the input value this will not` be reflected back to the 
 * attribute. Only if you change the attribute, the properties will change. That makes sense because this input element
 * is to hold some used input. If you would always reflect this back to the attribute that would mean if you ever want to 
 * reset the input to its initial value - that would not be possible because we lost the original value. So when the user
 * types there the input is stored in the input.value property, but not not reflected in the html code.  
 * 
 * Changing live sync properties does not severe the DOM object connection established
 * by selecting through that property. Although latter calls need the new property selector. 
 * 
 * This is defualt behavior, but you CAN force to chang;e attribute. 
 * input.setAttribute('value', 'some other defaul text')
 * This does not update the UI, bacause actually changing the attribute will not override
 * existing changes made. So you don't accidentally clear the user input. 
 * So value is the more complex property, but fairly straight forward.
 * reset to default, input.value = input.getAttribute('value');
 */
/**
 * Multiple items
 * const allLis = document.querySelectorAll('li');
 * allLis is a NodeList, indexable. 
 * 
 */
// Summary
const h1 = document.getElementById('main-title');

h1.textConent = 'Some new title!';
h1.style.color = 'white';
h1.style.backgroundColor = 'black'; // background-color like CSS is not a property name

const li = document.querySelector('li:last-of-type');
li.textContent = li.textContent + ' (Change!)';

const body = document.body;
const ul = body.querySelector('ul'); // elements can be queried upon. 
console.dir(ul);

const listItemElements = document.querySelectorAll('li');
const listItemElementsAlt = document.getElementsByTagName('li'); // LIVE LIST, REFLECTS CHANGES TO THE HTML
// NOT talking aobut the property attribute live sync, talking about the list of selected items.
for (const listItemEl of listItemElements) {
    console.dir(listItemEl);
}

/**
 * Once you selected a node using getElementBy..., or querySelector - you might be interested in traversing all it's child
 * nodes. So rather than manually selecting every element you might be interested in using querySelector, you could take 
 * a selected element, and move to its children or siblings and so on based on that element. 
 * Child: Direct child node or element. 
 * <div>
 * <p>
 * a <em> test! </em>
 * </p>
 * </div>
 * <p> is a child of <div>. <em> isn't!
 * Descendent: direct or indirect child node or element. <p> and <am>
 * Parent: Direct parent node or element. 
 * Ancenstor: Direct or indirect parent node / element. 
 * 
 * DOM Traversal: You have a selected node. Current Node (eg. <div>)
 * 
 * You can always go up. Find a parent element or node. 
 * Current Node -> document.body; parentNode, parentElement, closest()
 * Every DOM object will have parentNode, parentElement properties. div, paragraph etc. 
 * parentNode: selects any parent node. 
 * parentElement: parent node that is also an element, html element. 
 * closest(): any ancestor that matches a certain query, CSS selector. Closest descendent is selected by querySelector. 
 * Only element noeds can be parents, so parentNode has to be an element node. 
 * 
 * You can go down. childNodes, children, querySelector(), ...
 * childNodes: all child nodes, including text nodes. 
 * children: only child elements. 
 * querySelector, getElementsByClassName: previously shown. 
 * 
 * Special properties:
 * firstChild: first child node
 * firstElementChild: first element. 
 * lastChild:
 * lastElementChild:
 * 
 * Staying at the same level (Sibling):
 * previousSibling, previousElementSibling: previous sibling node, direct.  
 * nextSibling, nextElementSibling: 
 * 
 * 
 * Textnodes aren't rendered. But you can render them using styles. 
 * CSS: white-space: pre. overrides the browser default and renders the white space between tags. 
 * 
 * 
 * DOM Traversal vs Query Methods
 * DOM traversals are efficient.
 * DOM traversal methods might be unclear just seeing the script. Often after change in the html, changes the firstChild, 
 * lastChild, nextSibtling etc. That way the app might behave unpredictably. Use it in cases where the relation you are traversing
 * stays the same. Even if you move code around. 
 * 
 * Query methods might not be as efficient, but often the gain in efficiency is not worth the trouble. Also important: Deeply
 * nested traversal logiv will most likely also not yield any performance benefits or even perform worse. 
 * 
 */

/**
 * Styling DOM Elements. 
 * Via style property
 * You can do it with the style property. Directly target the individual CSS styles applied to that element. It's like 
 * using inline styles with the elements on your document. This has the highest specifity. This will overwrite any other 
 * styles. Style property names are based on CSS properties but have adjusted names (backgroundColor)
 * 
 * Via className
 * You can manipulate the CSS classes that are added to an element. Directly set the CSS classes assigned to the element. 
 * You can change these classes, remove them or add new ones. That means you adjust the styles that are applied by these
 * classes. You set/control all classes at once. You can also control the id or other properties, if you are using them on your
 * CSS code. BUt CSS classes are the most commonn way to spread CSS styles. 
 * 
 * Visa classList
 *  className takes only one string, that is the string of all the classes that should be added. And therefore if you have to 
 * toggle a class, you have manually manage, you keep classes that you don't want to remove and only remove the ones you target. 
 * To make it easier all these element nodes have a property classList. Which is a JS object. Makes easy to add remove or 
 * toggle CSS classes. Easier to address individual classes instead of string manipulation. 
 */
/**
 * .cloneNode()
 * SO we've seen that inserting the same element twice in different positinos does not copy it, rather moves it. 
 * But if we want to copy it, you can clone it. 
 * .cloneNode(?deep), deep cloning referes to when the children are also cloned. 
 */
/**
 * Live Nodelist vs Nonlive node list. 
 * 
 * const listItems = document.querySelectorAll('li');
 * 
 * listItems
 * NodeList(3) [li, li.list-item, li.list-item]
 * 
 * const listItems2 = ul.getElementsByTagName('li');
 * 
 * listItems2
 * HTMLCollection(3) [li, li.list-item, li.list-item]
 * 
 * So one returns NodeList, another an HTMLCollection. But they respond differently when inserting new element. 
 *  However if we create and appendChild() a list item, then the HTMLCollection updates itself, BUT the NodeList DOES NOT. 
 * So NodeList is NOT live. HTMLCollection is LIVE. Live connection does not always mean better, comsumes more memory. 
 * HTMLCollection is bound to ul childElements. 
 * .getElementsBy_____() always returns a live collection. 
 */
/**
 * Remove element
 * ul.remove();
 * Removes from the rendered page. Removes from the DOM. 
 * For internet explorer, list.parentElement.removeChild(list);
 */
