'use strict';

//where am I 
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////


const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1
}




//whereAmI(52.508, 13.381);

// Promisifying with geolocation - find the current location
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// )
// Copying the above function and put it inside the Promise

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // )
    //can also do this
    navigator.geolocation.getCurrentPosition(resolve, reject)

  })
}

//getPosition().then(pos => console.log(`Your current position is:`, pos))


const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Problem with geocoding ${res.status}`)
      }
      return res.json()
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`)
      return fetch(`https://restcountries.com/v2/name/${data.country}`)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Country not found ${res.status}`)
      }
      return res.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`There is some error in geocode data ${err.message}`)
    })
}

btn.addEventListener('click', whereAmI)