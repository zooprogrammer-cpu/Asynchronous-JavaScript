'use strict';
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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/////Async/await

const whereAmI = async function () {
  //Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //Reverse geocoding . await until the promise from fetch returns and assign to resGeo variable
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();

  //Country data
  // await until the promise of the value returns and assign it to res variable
  const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);

  // this is the same as doing this in the old way
  //fetch(`https://restcountries.com/v2/name/${country}`).then(res=>console.log(res))

  const data = await res.json()
  renderCountry(data[0])

  return `You are in ${dataGeo.city}, ${dataGeo.country}`
}

console.log(`1. Will get location`);
// this returns a promise and not the value that we would like
//const city = whereAmI();
//console.log(city);
// need to add .then
// whereAmI()
//   .then(city => console.log(city))
//   .catch(error=> console.error(error))
//   .finally(() => console.log(`3. Finished getting location`));

//Instead of using .then, can use IIFE


// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2:`);
//   } catch (err) {
//     console.error(err);
//   }
//   console.log(`3. Finished getting location`);
// })();


const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
    ])
    // console.log([data1.capital, data2.capital, data3.capital]);
    console.log(data);
    console.log(data.map(d=>d[0].capital));
  }
  catch (err) {
    console.error(err);
  }
}

get3Countries(`portugal`, `canada`, `tanzania`);