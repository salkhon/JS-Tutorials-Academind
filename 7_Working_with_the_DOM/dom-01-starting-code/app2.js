const uli = document.body.firstElementChild.nextElementSibling; // changed to section
const firstLi = uli.firstElementChild;

console.log(firstLi);

const section = document.querySelector('section');
const button = document.querySelector('button');

// section.style.backgroundColor = 'blue';
section.className = 'red-bg';

button.addEventListener('click', () => {
    // classList has a toggle method. 
    section.classList.toggle('visible'); // will check if visible is present, if so then deletes it. 
    section.classList.toggle('invisible'); // will check if invisible is present, if not will add.
});
