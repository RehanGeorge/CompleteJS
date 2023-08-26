// Importing the module
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js"
console.log('Importing module')
// addToCart('bread', 5)
// console.log(price, tq)

// import * as ShoppingCart from './shoppingCart.js'


// ShoppingCart.addToCart('bread', 5)
// console.log(ShoppingCart.totalPrice)

import add, {cart} from './shoppingCart.js'
add('pizza', 2)
add('bread', 5)
add('apples', 4)

console.log(cart)



/*
console.log('Start fetching...');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Some text')


const getLastPost = async function() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    // console.log(data);
    // console.log('Some text')

    return {title: data.at(-1).title, body: data.at(-1).body}
}

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(data => console.log(data));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
const ShoppingCart2 = (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity) {
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    }

    const orderStock = function(product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
    };

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    }
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
*/

// CommonJS specifications
/*
// Export
export.addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

// Import
const {addToCart} = require('./shoppingCart.js');
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js'

import cloneDeep from 'lodash-es'

const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 5},
    ],
    user: {loggedIn: true},
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);
console.log(stateClone);

if (module.hot) {
    module.hot.accept();
}

class Person {
    greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.greeting}, ${this.name}`);
    }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';

import 'core-js/stable/array/find';

// Polyfilling async functions
import 'regenerator-runtime/runtime';