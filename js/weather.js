const LOCATION = "Location";
const API_KEY = "9adb6f091007e7ccfecf841e773fbef7";

const weatherMenu = document.querySelector(".menu__weather"),
    weatherID = document.querySelector("#weather"),
    todayHeader = document.querySelector(".weather__today__header"),
    CITYNAME = document.querySelector(".cityName"),
    MAIN = document.querySelector(".main"),
    TEMP = document.querySelector(".temp"),
    FEELS = document.querySelector(".feels_like"),
    HUMIDITY = document.querySelector(".humidity"),
    WINDSPEED = document.querySelector(".wind_speed"),
    tempMIN = document.querySelector(".temp_min"),
    tempMAX = document.querySelector(".temp_max"),
    SUNRISE = document.querySelector(".sunrise"),
    SUNSET = document.querySelector(".sunset");

function loadCoords() {
    const locationValue = localStorage.getItem(LOCATION);
    if (locationValue === null) {
        getLocation();
    } else {
        const lat = JSON.parse(locationValue).latitude;
        const lon = JSON.parse(locationValue).longitude;
        getWeather(lat, lon);
    }
}
function getLocation() {
    const position = navigator.geolocation.getCurrentPosition(getLocSuccess, getLocFail)
}


function getLocSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const posObj = {
        latitude,
        longitude
    };
    saveLocation(posObj);
    getWeather(latitude, longitude);
}
function saveLocation(posObj) {
    localStorage.setItem(LOCATION, JSON.stringify(posObj));
}
function getLocFail(err) {
    console.log(`error`);
    todayHeader.innerTEXT = `ERROR ${err.code}`;
}

async function getWeather(lat, lon) {
    const APIcall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const jsonAPI = await APIcall.json();

    const city = jsonAPI.name;
    const mainCloud = jsonAPI.weather[0].main;
    const wind = jsonAPI.wind.speed;
    const temp = jsonAPI.main.temp;
    const tmin = jsonAPI.main.temp_min;
    const tmax = jsonAPI.main.temp_max;
    const feelslike = jsonAPI.main.feels_like;
    const humi = jsonAPI.main.humidity;
    const srise = jsonAPI.sys.sunrise;
    const sset = jsonAPI.sys.sunset;

    changeTime(srise, sset);

    CITYNAME.innerHTML = city;
    MAIN.innerHTML = `${mainCloud}`;
    TEMP.innerHTML = `Temp  ${temp}°C `;
    FEELS.innerHTML = `Feels like  ${feelslike}°C`;
    HUMIDITY.innerHTML = `Humidity  ${humi}%`;
    WINDSPEED.innerHTML = `Wind Speed  ${wind}m/s`;
    tempMIN.innerHTML = `Temp Min  ${tmin}°C `;
    tempMAX.innerHTML = `Temp Max  ${tmax}°C `;

}
function changeTime(SRsec, SSsec) {
    const SR_date = new Date(SRsec * 1000);
    const SR_hour = SR_date.getHours();
    const SR_minute = SR_date.getMinutes();

    const SS_date = new Date(SSsec * 1000);
    const SS_hour = SS_date.getHours();
    const SS_minute = SS_date.getMinutes();

    SUNRISE.innerHTML = `Sunrise  ${SR_hour < 10 ? `0${SR_hour}` : `${SR_hour}`} : ${SR_minute < 10 ? `0${SR_minute}` : `${SR_minute}`}`;
    SUNSET.innerHTML = `Sunrise  ${SS_hour < 10 ? `0${SS_hour}` : `${SS_hour}`} : ${SS_minute < 10 ? `0${SS_minute}` : `${SS_minute}`}`;
}

function weatherBTNclick() {
    console.log("weather")
    const weatherCN = weatherID.className;
    if (weatherCN !== "none") {
        weatherID.className = "none";
    } else {
        weatherID.className = "weather";
    }
}


function init() {
    loadCoords();
    weatherMenu.addEventListener("click", weatherBTNclick);
}
init();