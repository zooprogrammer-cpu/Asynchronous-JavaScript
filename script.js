'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// old school way to make a AJAX call
const getCountryData = function (country) {
    const request = new XMLHttpRequest(); // calling the function and storing it into request object
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
    request.send(); // this fetches the data in the background
    // when that is done, it will emmit the load event and as soon as data arrives, the function runs
    request.addEventListener('load', function () {
        //console.log(this.responseText);
        //convert this to JSON Object. Array containing one object
        //const data = JSON.parse(this.responseText)
        // const[data] destructues the array into an object
        const [data] = JSON.parse(this.responseText)
        console.log(data);
        //Destructure Object to get the nested languages data
        const { languages: lang } = data
        const firstLang = Object.values(lang)[0];

        const {currencies : currency} = data
        console.log(currency);
        const curr = Object.values(currency)
        const currencyName = curr[0].name;
        console.log(currencyName);

        //copy this from the HTML file and add src from the recieved data
        const html = `
    <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${firstLang}</p>
            <p class="country__row"><span>💰</span>${currencyName}</p>
          </div>
        </article>
    `;
        countriesContainer.insertAdjacentHTML('beforeend', html)
        countriesContainer.style.opacity = 1
    })
}
// two AJAX calls go out at the same time and whichever data comes first, 
// fires the load event
getCountryData('portugal')
getCountryData('usa')