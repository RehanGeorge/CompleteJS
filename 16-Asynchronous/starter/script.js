'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
const getCountryData = function(country, numeral = 0) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();

    request.addEventListener('load', function() {
    // console.log(this.responseText);

        const data = JSON.parse(this.responseText)[numeral];
        console.log(data);

        const html = `
        <article class="country">
        <img class="country__img" src="${data.flag}"/>
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(0)}M people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    })
}

getCountryData('india', 1);
getCountryData('usa');
*/

const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}

const renderCountry = function(data, className = '') {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flag}"/>
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>`;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
}

/*
const getCountryAndNeighbour = function(country, numeral = 0) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();

    request.addEventListener('load', function() {
    // console.log(this.responseText);

        const data = JSON.parse(this.responseText)[numeral];
        console.log(data);
        
        // Render country
        renderCountry(data);

        // Get neighbour country
        const [neighbour] = data.borders;
        
        if(!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://countries-api-836d.onrender.com/countries/name/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function() {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, 'neighbour');
        })
    })
};

// getCountryAndNeighbour('india', 1);
getCountryAndNeighbour('usa');
*/

// Fetch
// const request = fetch('https://countries-api-836d.onrender.com/countries/name/india');
// console.log(request);

/*
const getCountryData = function(country, numeral = 0) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(data) {
        console.log(data);
        renderCountry(data[numeral]);
    })
}
*/

const getJSON = function(url, errorMsg= 'Something went wrong') {
    return fetch(url)
    .then(response => {
        if(!response.ok)
         throw new Error(`${errorMsg} ${response.status}`);
        return response.json()
    });
}

/*
const getCountryData = function(country, numeral = 0) {
    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => {
        console.log(response);

        if(!response.ok) throw new Error(`Country not found ${response.status}`);

        return response.json()
    })
    .then(data => {
        renderCountry(data[numeral])
        const neighbour = data[numeral].borders[0];

        if(!neighbour) return;

        // Country 2
        return fetch(`https://countries-api-836d.onrender.com/countries/name/${neighbour}`)
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {console.error(`${err} 💥`)
    renderError(`Something went wrong 💥 ${err.message}. Try again!`)})
    .finally(() => countriesContainer.style.opacity = 1);
}
*/

const getCountryData = function(country, numeral = 0) {
    // Country 1
    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country not found')
    .then(data => {
        renderCountry(data[numeral])
        const neighbour = data[numeral].borders[0];

        if(!neighbour) throw new Error('No neighbour found!');

        // Country 2
        return getJSON(`https://countries-api-836d.onrender.com/countries/name/${neighbour}`, 'Country not found')
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {console.error(`${err} 💥`)
    renderError(`Something went wrong 💥 ${err.message}. Try again!`)})
    .finally(() => countriesContainer.style.opacity = 1);
}

// btn.addEventListener('click', function() {
//     getCountryData('india', 1);
// });

// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err));
// console.log('Getting position...');

/*
// Position data
const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

getPosition().then(pos => console.log(pos));

const authCode = '278906601139617563300x10193';


const whereAmI = function() {
    getPosition().then(pos => {
        const {latitude: lat, longitude: lng} = pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${authCode}`)
        .then(response => {
            if(!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`);
            return data;
        })
        .then((data) => getCountryData(data.country))
        .catch((error) => console.error(error.message));
    })
}
*/

/*
btn.addEventListener('click', whereAmI);

const lotteryPromise = new Promise(function(resolve, reject) {
    console.log('Lottery draw is happening 🔮');
    setTimeout(function() {
        if(Math.random() >= 0.5) {
            resolve('You win!');
        } else {
            reject(new Error('You lost your money!'));
        }
    }, 2000)
})

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(2).then(() => {
    console.log('I waited for 2 seconds')
    return wait(1);
}).then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));


console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
    for(let i = 0; i < 1000000000; i++) {}
        console.log(res);
})
console.log('Test end');


const getPosition = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

const authCode = '278906601139617563300x10193';

const whereAmI = async function(country) {
    try {
        // Geolocation
        // fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
        // .then(response => console.log(response));
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${authCode}`);
        if(!resGeo.ok) throw new Error('Problem getting location data');
        const dataGeo = await resGeo.json();
        console.log(dataGeo);

        // Country data
        const res = await fetch (`https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`);
        if(!resGeo.ok) throw new Error('Problem getting country');
        const data = await res.json();
        console.log(data);
        renderCountry(data[0]);
        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch(err) {
        console.error(err);
        renderError(`Something went wrong 💥 ${err.message}. Try again!`);
    }
    

    
}

// console.log('1: Will get location');
// whereAmI().then(city => console.log(city)).catch(err => console.error(err.message));
// console.log('3: Finished getting location');

// console.log('FIRST');

(async function() {
    try {
        const city = await whereAmI();
        console.log(city);
    } catch(err) {
        console.error(err.message);
    }
    console.log('3: Finished getting location');
})();

const get3Countries = async function(c1, c2, c3) {
    try {
        // const [data1] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`, 'Country not found');
        // const [data2] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`, 'Country not found');
        // const [data3] = await getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`, 'Country not found');

        const data = await Promise.all([
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`, 'Country not found'),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`, 'Country not found'),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`, 'Country not found')
        ])
        console.log(data.map(d => d[0].capital));
    } catch(err) {
        console.error(err);
    }
}

get3Countries('india', 'usa', 'canada');
*/
// Promise.race
const test = async function() {
    const res = await Promise.race([
        getJSON(`https://countries-api-836d.onrender.com/countries/name/india`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/usa`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/canada`)
    ]);
    console.log(res[0]);
}
test();

const timeout = function(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error('Request took too long!'));
        }, sec * 1000);
    });
};

Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/india`),
    timeout(0.1)
]).then(res => console.log(res[0])).catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
]).then(res => console.log(res));

// Promise.any [ES2021]
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another success')
]).then(res => console.log(res));
