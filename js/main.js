// const api = {
//     key: '39b44eaa66c8464bda8ff71fc2a80638',
//     base: 'https://api.openweathermap.org/data/2.5/'
// }

// const main = document.querySelector('main');
// main.style.display = 'none';

// const searchBox = document.querySelector('.search-box');
// searchBox.addEventListener('keypress', setQuery);

// function setQuery(evt) {
//     if(evt.keyCode == 13) {
//         getResults(searchBox.value);
//     }
// }

// function getResults(query) {
//     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//         return weather.json();
//     }).then(displayResults);
// }


// function displayResults(weather) {
//     console.log(weather);
//     let city = document.querySelector('.location .city');
//     city.innerText = `${weather.name}, ${weather.sys.country}`;

//     let now = new Date();
//     let date = document.querySelector('.location .date');
//     date.innerText = dateBuilder(now);

//     let temp = document.querySelector('.current .temp');
//     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

//     let weather_el = document.querySelector('.current .weather');
//     weather_el.innerText = weather.weather[0].main;

//     let hilow = document.querySelector('.hi-low');
//     hilow.innerText  =`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

//     main.style.display = 'block';
// }

// function dateBuilder(d) {
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//     const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`;
// }







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

    let city = document.querySelector('.location');
    city.innerText = `${weather.city.name}, ${weather.city.country}`;

    let now = new Date();
    let date = document.querySelector('.todays-date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temperature');
    temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>°c</span>`;

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
    const colorList = [
        {weather: 'Clear', color1: '#7AE7C7', color2: '#72C1E1'},
        {weather: 'Clouds', color1: '#F981BB', color2: '#7F7E84'},
        {weather: 'Drizzle', color1: '#b2c9c8', color2: '#698b8b'},
        {weather: 'Fog', color1: '#C5B2A6', color2: '#7F7E84'},
        {weather: 'Rain', color1: '#504AC4', color2: '#59AED1'},
        {weather: 'Snow', color1: '#bfc9cf', color2: '#77BDE0'},
        {weather: 'Thunderstorm', color1: '#314F71', color2: '#4A4176'},
        {weather: 'Tornado', color1: '#939393', color2: '#e47977c5'}
    ]

    colorList.forEach(color => {
        if(color.weather == weather.list[0].weather[0].main) {
            body.style.backgroundImage = `linear-gradient(to bottom right, ${color.color1}, ${color.color2})`;
        }
    });
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