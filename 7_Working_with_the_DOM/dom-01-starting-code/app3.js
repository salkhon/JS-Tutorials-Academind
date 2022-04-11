// Creating Elements in the page. 
// We have 2 ways of doing this. 
/**
 * We can write some HTML code in JS, and tesll JS therefore the browser to parse this HTML and render it. 
 * - The HTML string can be added using the innerHTML property in element nodes. This adds and render that HTML code.
 * - insertAdjacentHTML() method if you want to add some rendered HTML content next to some existing content instead of replacing 
 * that object. This adds (render) HTML string in specific position. 
 * 
 * OR, 
 * 
 * We use the createElement() method on the document object. Adn manually then insert it somewher in our document. 
 * - appendChild() / append() - appends new DOM element inside another parent DOM element. 
 * - prepend(), before(), after(), insertBefore() - insert new DOM element/node in specific position. 
 * - replaceChild() / replaceWith() - remove an existing element and replace it with a new one. 
 * 
 * .textContent property gives all chlid textNodes.  
 * Reassigning text content replces all the html with the newly assigned TEXT. 
 * 
 * .innerHTML
 * textContent only updates text. But with innerHTML you can replace and render real HTML code.  
 * But this will replace ALL descendents with the new HTML code. But that might not be useful for all cases. 
 * You might append content to innerHTML, to keep the existing elements. But the downside is, this concetenation
 * RE-RENDERS all the previous innerHTML. When we do this, we replace the entire HTML content with new content that
 * includes the concatenated part. Eevrything gets rerendered. 
 * - That's not good for performance. You are forcing the browser to re render parts of HTML that did not change at all. 
 * - If input is rerendered you'll lose what the user typed in the input field. 
 * SO, innerHTML is useful when you want to change all the HTML content of the part. It's not so good when you want to 
 * add something to the page. 
 * 
 * 
 * .insertAdjacentHTML()
 * To solve the above mentioned problem, this method can be used. THis allows you to target a position and then define
 * which HTML you want to enter.
 * <!-- beforebegin -->
    <p>
    <!-- afterbegin -->
    foo
    <!-- beforeend -->
    </p>
    <!-- afterend --> 
    div.insertAdjacentHTML('beforeend', '<p>Something went wrong!</p>');
    While this is fine, there are scenarios you don't want to do it like this. 
 */
/**
 * The downside is, you have no direct access to the rendered element. You have to perform a search . 
 * The more complex HTML code entered, the more complex is the query. 
 * Also, inserting and querying is a two step process, but this can be converted into a one step process. 
 * 
 * document.createElement()
 * We create a new HTML element in JS and then append it to the list. This can be done document.createElement()
 * It's called on the global document variable, naturally. document.createElement('tagname'). Other arguments are optional, with is: property, which is for customized element - advanced topic. 
 * element.appendChild(anynode)
 * This takes anynode, also a text node. But you don't create text node like this in JS, you just modify textContent.
 * Also you have direct access to the element appended. With which you can add event listeners, or change the style
 * or do whatever.  
 * We can add new DOM using .append(). That way we can add text nodes as well. 
 * list.append('Some text');
 * .append() also is able to add multiple nodes separated by commas. 
 * .prepend() does the same but adds at the top. 
 * .before() adds before a selected element. ***BUT DOING SO REMOVES THE ELEMENT FROM PREVIOUS POSITION IF EXISTED BEFORE. 
 * If you have an element selected, either because you selected it in the DOM with querySelector, or because you created it
 * with createElement(), and that element is already part of the DOM. Then if you insert it somewhere else, this is not copied. 
 * Instead the existing element is detached from the place it was and moved to the new place. This makes sense because 
 * objects are reference values and therefore if we add it somewhere else we always work with the same object. If you
 * want a new one, you have to instantiate a new one. 
 * You have .after(). You also have .replaceWith(newLi), which puts newLi in position of the element on which it is 
 * called. 
 * We also have the equivalent for .insertAdjacentHTML(), which is .insertAdjacentElement(position, element).
 * Which is suppoerted by lower browsers.
 *  
 */
