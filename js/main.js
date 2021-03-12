const api = {
    key: "39b44eaa66c8464bda8ff71fc2a80638",
    link: "https://api.openweathermap.org/data/2.5/"
}

const submit = document.querySelector('.submit');
const search = document.querySelector('.search-box');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    getData(search.value);
});

//Fetch Weather Data
function getData(city) {
    fetch(`${api.link}weather?q=${city}&units=metric&appid=${api.key}`)
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
    let weatherType = weather.weather[0].main;
    const weatherIconsList = [
        'Clear',
        'Clouds',
        'Drizzle',
        'Fog',
        'Rain',
        'Snow',
        'Thunderstorm',
        'Tornado'
    ]

    weatherIconsList.forEach(icon => {
        if (icon == weatherType) {
            weatherIcon.src = `img/svg/${icon}.svg`;
        }
    });

    //Show Weather Data
    let currentTemp = document.querySelector('.current-temp');
    let weatherTemp = Math.round(weather.main.temp);
    currentTemp.innerText = weatherTemp + '°C';
    

    let minMax = document.querySelector('.min-max');
    let weatherMin = Math.round(weather.main.temp_min);
    let weatherMax = Math.round(weather.main.temp_max);
    minMax.innerText = weatherMin + '°C / ' + weatherMax + '°C';

    let feelsLike = document.querySelector('.feels-like span');
    let weatherFeelsLike = Math.round(weather.main.feels_like);
    feelsLike.innerText = weatherFeelsLike + '°C';

    //Set Weather Description
    let weatherDescription = document.querySelector('.weather-description');
    weatherDescription.innerText = weatherType;

    //Set City Name
    let cityName = document.querySelector('.city');
    let weatherCityName = weather.name;
    let country = weather.sys.country;
    cityName.innerText = weatherCityName + ", " + country;

    //Set Wind Speed
    let windSpeed = document.querySelector('.wind-speed span');
    let weatherWindSpeed = Math.round(weather.wind.speed * 2.23);
    windSpeed.innerText = weatherWindSpeed + "mph";

    //Set Humidity
    let humidity = document.querySelector('.humidity span');
    let weatherHumidity = weather.main.humidity;
    humidity.innerText = weatherHumidity + "%";
}

//Return Todays Date
function todaysDate(d) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const days = [
        "Sun","Mon","Tues","Wed","thurs","Fri","Sat"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

 