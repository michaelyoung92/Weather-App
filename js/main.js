//Long Range

const longApi = {
    key: '39b44eaa66c8464bda8ff71fc2a80638',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${longApi.base}forecast?q=${query}&units=metric&APPID=${longApi.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}


function displayResults(weather) {
    console.log(weather);
    const weatherTemp = weather.list[0].main.temp;

    let city = document.querySelector('.location');
    city.innerText = `${weather.city.name}, ${weather.city.country}`;

    let now = new Date();
    let date = document.querySelector('.todays-date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weatherTemp)}<span>°c</span>`;

    let weatherImg = document.querySelector('.weather-img');


    //Display correct weather icon
    const weatherIcons = [
        'Clear',
        'Clouds',
        'Drizzle',
        'Fog',
        'Rain',
        'Snow',
        'Thunderstorm',
        'Tornado'
    ]

    weatherIcons.forEach(icon => {
        if(icon == weather.list[0].weather[0].main) {
            weatherImg.src = `img/svg/${icon}.svg`;
        }
    });

    //Weather Description
    const weatherDescription = document.querySelector('.weather-description');
    weatherDescription.innerText = weather.list[0].weather[0].description;


    //Min & Max Temps
    let minMax = document.querySelector('.min-max');
    minMax.innerText =`${Math.round(weather.list[0].main.temp_min)}°c / ${Math.round(weather.list[0].main.temp_max)} °c `;

    //Extra Infor
    const extraInfo = document.querySelector('.extra-info');
    extraInfo.classList.add('show');

    //Wind Speed
    let windSpeed = document.querySelector('.wind-speed span');
    let windMps = weather.list[0].wind.speed;
    windSpeed.innerText = `${Math.round(windMps * 2.23)} mph`;

    //Humidity
    let humidity = document.querySelector('.humidity span');
    humidity.innerText = `${weather.list[0].main.humidity} %`;

    //Feels Like
    let feelsLike = document.querySelector('.feels-like span');
    feelsLike.innerText = `${Math.round(weather.list[0].main.feels_like)}°c`;

    //Background Color Changer
    const body = document.querySelector('body');

    const colorsByCondition = {
        Clear: {
            color1: '#7AE7C7',
            color2: '#72C1E1'
        },
        Clear5: {
            color1: '#89a1dd',
            color2: '#E4E5E7'
          },
        Clear15: {
            color1: '#C94926',
            color2: '#BB9F34'
          },
        Clouds: {
            color1: '#F981BB',
            color2: '#7F7E84'
          },
        Drizzle: {
            color1: '#b2c9c8', 
            color2: '#698b8b'
        },
        Fog: { 
            color1: '#C5B2A6', 
            color2: '#7F7E84'
        },
        Rain: { 
            color1: '#504AC4', 
            color2: '#59AED1'
        },
        Snow: { 
            color1: '#bfc9cf', 
            color2: '#77BDE0'
        },
        Thunderstorm: { 
            color1: '#314F71', 
            color2: '#4A4176'
        },
        Tornado: {
             color1: '#939393', 
             color2: '#e47977c5'
        }
    }

    //Find correct colours
    const conditions = weather.list[0].weather[0].main;
    const {color1, color2} = weatherTemp < 5 && conditions == 'Clear' ? colorsByCondition.Clear5 : weatherTemp > 15 && conditions == 'Clear' ? colorsByCondition.Clear15 : colorsByCondition[conditions];

    body.style.backgroundImage = `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}