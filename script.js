'use strict';
const countriesContainer = document.querySelector('.countries');
const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1
}
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

const whereAmI = function(lat,lng){
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  .then(res => {
    if(!res.ok) throw new Error(`Problem with Geocoding ${res.status}`)
    return res.json()
  })
  .then(data =>{
    console.log(data)
    console.log(`You are in ${data.city}, ${data.country}`)
    return fetch(`https://restcountries.com/v2/name/${data.country}`)
  })
  .then(res=>{
    if(!res.ok){
      throw new Error(`Country not found ${res.status}`)
    }
    return res.json()
  })
  .then(data => renderCountry(data[0]))
  .catch(error=>{
    console.error(`There is an error: ${error.message}💥`)

  })
}

document.querySelector('.btn-country').addEventListener('click', function(){
  whereAmI(51.50354,-0.12768)
 
})

//whereAmI(51.50354,-0.12768)


