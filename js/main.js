//Animate intro text

//Intro heading
const introHeading = document.querySelector('.app-description h2');
const headingText = introHeading.textContent;
const splitHeading = headingText.split('');
introHeading.textContent = '';

//Intro text
const introText = document.querySelector('.app-description p');
const text = introText.textContent;
introText.textContent = '';
introText.innerHTML += text;

//Search box
const search = document.querySelector('.search-box');

//Current location button
let currentBtn = document.querySelector('.current-btn');

//Animate intro heading
splitHeading.forEach(letter => {
    introHeading.innerHTML += '<span>' + letter + '</span>';
});

let char = 0;
let timer = setInterval(() => {
    const span = introHeading.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;

    if(char === splitHeading.length){
        complete();
        return;
    }
}, 60);

function complete(){
    clearInterval(timer);
    timer = null;
}

//Animate intro text
setTimeout(() => {
    introText.classList.add('fade');
}, 1500);

//Animate search box
setTimeout(() => {
    search.classList.add('fade');
    currentBtn.classList.add('fade');
}, 2500);



//Weather App

//Api key and url
const api = {
    key: "10d46d88220b8c34b7e07c861dc1f659",
    link: "https://api.openweathermap.org/data/2.5/"
}

//Listen for search action
search.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        getData(search.value);
    }
});

search.addEventListener('blur', () => {
    getData(search.value);
});

//Listen for button click
currentBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coordinates);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
    
    //Get user coordinates
    function coordinates(location) {
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        locationData(lat, lon);
    }
    
    //Fetch weather data for user location
    function locationData(lat, lon) {
        fetch(`${api.link}forecast?lat=${lat}&lon=${lon}&units=metric&&appid=${api.key}`).then(data => {
            return data.json();
        }).then(displayData);
    }
});

// Fetch Weather Data
function getData(city) {
    fetch(`${api.link}forecast?q=${city}&units=metric&appid=${api.key}`)
        .then(weatherData => {
            return weatherData.json();
        }).then(displayData);
}

//Display Weather Data
function displayData(weather) {
    console.log(weather);

    //Change Layout
    const container = document.querySelector('.container');
    container.classList.add('change-layout');

    //Show Content
    const weatherInfo = document.querySelector('.weather-info');
    const extraWeatherInfo = document.querySelector('.extra-weather-info');
    weatherInfo.classList.add('show');
    extraWeatherInfo.classList.add('show-extra');

    //Hide Content
    const appIntro = document.querySelector('.app-description');
    appIntro.classList.add('hide');

    //Set Todays Date
    let date = document.querySelector('.date');
    let today = new Date();
    date.innerText = todaysDate(today);

    //Set Weather Icon
    let weatherIcon = document.querySelector('.weather-icon img');
    let weatherType = weather.list[0].weather[0].main.toLowerCase();
    const weatherIconsList = [
        'clear',
        'clouds',
        'drizzle',
        'fog',
        'rain',
        'snow',
        'thunderstorm',
        'tornado'
    ]

    weatherIconsList.forEach(icon => {
        if (icon == weatherType.toLowerCase()) {
            weatherIcon.classList = '';
            weatherIcon.src = `img/${icon}.svg`;
            
            if(icon == 'clear') { 
                weatherIcon.classList.add('spin');
            } else if(icon == 'clouds' || icon == 'snow' || icon == 'rain' || icon == 'thunderstorm') {
                weatherIcon.classList.add('move');
            } else if(icon == 'fog') {
                weatherIcon.classList.add('zoom');
            }
        }
    });

    //Show Weather Data
    let currentTemp = document.querySelector('.current-temp');
    let weatherTemp = Math.round(weather.list[0].main.temp);
    currentTemp.innerText = weatherTemp + '°C';
    
    //Return array of temperatures for next 48 hours
    let temps = [];
    temps.push(weather.list[0].main.temp);

    for(let i = 0; i < 7; i++) {
        temps.push(weather.list[i].main.temp);
    }

    //Lowest temp
    let weatherMin = Math.round(Math.min.apply(Math, temps));

    //Highest temp
    let weatherMax = Math.round(Math.max.apply(Math, temps));

    //Set high and low temperatures
    let minMax = document.querySelector('.min-max');
    minMax.innerText = weatherMin + '°C / ' + weatherMax + '°C';

    //Set 'feels like' temperature
    let feelsLike = document.querySelector('.feels-like span');
    let weatherFeelsLike = Math.round(weather.list[0].main.feels_like);
    feelsLike.innerText = weatherFeelsLike + '°C';

    //Set Weather Description
    let weatherDescription = document.querySelector('.weather-description');
    weatherDescription.innerText = weatherType;

    //Set City Name
    let cityName = document.querySelector('.city');
    let weatherCityName = weather.city.name;
    let country = weather.city.country;
    cityName.innerText = weatherCityName + ", " + country;

    //Set Wind Speed
    let windSpeed = document.querySelector('.wind-speed span');
    let weatherWindSpeed = Math.round(weather.list[0].wind.speed * 2.23);
    windSpeed.innerText = weatherWindSpeed + "mph";

    //Set Humidity
    let humidity = document.querySelector('.humidity span');
    let weatherHumidity = weather.list[0].main.humidity;
    humidity.innerText = weatherHumidity + "%";

    //Change background colour to match weather
    const colorList = {
        clear: {
            color1: '#7AE7C7',
            color2: '#72C1E1'
        },
        clear5: {
            color1: '#89a1dd',
            color2: '#E4E5E7'
        },
        clear15: {
            color1: '#C94926',
            color2: '#BB9F34'
        },
        clouds: {
            color1: '#F981BB',
            color2: '#698b8b'
        },
        drizzle: {
            color1: '#b2c9c8',
            color2: '#72C1E1'
        },
        fog: {
            color1: '#C5B2A6',
            color2: '#7F7E84'
        },
        rain: {
            color1: '#504AC4',
            color2: '#59AED1'
        },
        snow: {
            color1: '#bfc9cf',
            color2: '#77BDE0'
        },
        thunderstorms: {
            color1: '#314F71',
            color2: '#4A4176'
        },
        tornado: {
            color1: '#939393',
            color2: '#e47977c5'
        }
    }

    const body = document.querySelector('body');

    const {color1, color2} = weatherTemp < 5 && weatherType == 'clear'
        ? colorList.clear5
        : weatherTemp > 15 && weatherType == 'clear'
            ? colorList.clear15
            : colorList[weatherType];

    body.style.backgroundImage = `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

//Return todays date
function todaysDate(d) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const days = [
        "Sun","Mon","Tues","Wed","Thurs","Fri","Sat"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

 