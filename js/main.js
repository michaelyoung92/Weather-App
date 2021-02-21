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

const main = document.querySelector('main');
main.style.display = 'none';

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

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.city.name}, ${weather.city.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.list[0].main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.list[0].weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText  =`${Math.round(weather.list[0].main.temp_min)}°c / ${Math.round(weather.list[0].main.temp_max)}°c`;

    //Wind Speed

    let windSpeed = document.querySelector('.wind-speed');
    let windMps = weather.list[0].wind.speed;
    windSpeed.innerText = `${Math.round(windMps * 2.23)} mph`;

    //Humidity
    let humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.list[0].main.humidity} %`;

    //Feels Like
    let feelsLike = document.querySelector('.feels-like');
    feelsLike.innerText = `${Math.round(weather.list[0].main.feels_like)}°c`;
    

    main.style.display = 'block';
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