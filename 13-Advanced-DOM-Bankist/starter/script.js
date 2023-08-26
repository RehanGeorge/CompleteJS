'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content'); // returns a NodeList
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // prevent default behaviour of the link
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // forEach is a method of the NodeList object

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // prevent default behaviour of the link
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // returns the closest parent element with the specified selector

  // Guard clause
  if (!clicked) return; // guard clause

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // returns the element that triggered the event
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // returns a NodeList
    const logo = link.closest('.nav').querySelector('img'); // returns the first element that matches the selector

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // 'this' keyword refers to the 'this' keyword of the function that is called
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/*
// Sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});


// Sticky navigation: Intersection Observer API
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // null means the viewport
  threshold: [0, 0.2], // 0 means the callback function is called as soon as even 1 pixel is visible
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // returns a DOMRect object

const stickyNav = function (entries) {
  const [entry] = entries; // destructuring the entries array
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section'); // returns a NodeList

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // load the image 200px before it is visible
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left'); // querySelector returns the first element that matches the selector
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.5)'; // scale the slider down to 50%
  // slider.style.overflow = 'visible'; // make the overflow visible

  //Functions
  const createDots = function () {
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); // short circuiting
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
};

slider();

/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // returns a NodeList
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // returns a HTMLCollection
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // returns a HTMLCollection

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // adds the element as the first child of the header element
header.append(message); // adds the element as the last child of the header element
// header.append(message.cloneNode(true)); // adds a copy of the element as the last child of the header element

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // removes the element from the DOM
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // returns nothing
console.log(message.style.backgroundColor); // returns the color in rgb format

console.log(getComputedStyle(message).color); // returns the color in rgb format)
console.log(getComputedStyle(message).height); // returns the height in px format

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height); // returns the height in px format

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // returns the value of the alt attribute
console.log(logo.src); // returns the value of the src attribute
console.log(logo.className); // returns the value of the class attribute

logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist'); // adds a new attribute to the element

console.log(logo.getAttribute('src')); // returns the value of the src attribute
console.log(logo.src); // returns the value of the src attribute

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // returns the value of the href attribute
console.log(link.getAttribute('href')); // returns the value of the href attribute

// Data attributes
console.log(logo.dataset.versionNumber); // returns the value of the data-version-number attribute

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // returns the coordinates of the button

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // returns the current scroll position

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // returns the height/width of the viewport

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // scrolls to the coordinates of the section

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth', // smooth scrolling
  // });

  // Modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});


const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);


// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// Event propagation
// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(); // this refers to the element on which the event handler is attached
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true // sets the event listener to the capturing phase
);


// DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // returns all the elements with the highlight class that are inside the h1 element
console.log(h1.childNodes); // returns all the child nodes of the h1 element
console.log(h1.children); // returns all the child elements of the h1 element

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode); // returns the parent node of the h1 element
console.log(h1.parentElement); // returns the parent element of the h1 element

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // returns the closest parent element with the header class

h1.closest('h1').style.background = 'var(--gradient-primary)'; // returns the closest parent element with the h1 tag

// Going sideways: siblings
console.log(h1.previousElementSibling); // returns the previous sibling element of the h1 element
console.log(h1.nextElementSibling); // returns the next sibling element of the h1 element

console.log(h1.previousSibling); // returns the previous sibling node of the h1 element
console.log(h1.nextSibling); // returns the next sibling node of the h1 element

console.log(h1.parentElement.children); // returns all the child elements of the parent element of the h1 element
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
