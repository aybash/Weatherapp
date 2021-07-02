
const hamburger = document.querySelector(".hamburger");
const menu =  document.querySelector(".menu")

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(){
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
}

const navLink = document.querySelectorAll("nav-link");
navLink.forEach(n => n.addEventListener ("click", closeMenu));

function closeMenu(){
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}

//Selcetion of Element

const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature");
const locationElement = document.querySelector("#city");
const descElement = document.querySelector(".weather-description");
const humiElement = document.querySelector(".weather-info p .humidity");
const pressureElement = document.querySelector(".weather-info p .pressure");
const windElement = document.querySelector(".weather-info p .wind");
const lonElement = document.querySelector("#lon");
const latElement= document.querySelector(" #lat")


//innerElement selection

const weather ={};

weather.temperature ={
    unit:"celsius"
}

//geolocation setting

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display ="block";
    notificationElement.innerHTML = "<p>Browser does not support geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;

    let longitude = position.coords.longitude;
    
    getWeather(latitude,longitude);

}

    function showError(error){
        notificationElement.style.display ="block";
        notificationElement.innerHTML=`<p> $ {Error,Geolocation is uknown}</p>`;
    }


function displayWeather() {
        iconElement.innerHTML =`<img src="./dist/icons/solid-white/png/128x128/${weather.iconId}.png"/>`;
        
        tempElement.innerHTML =`${weather.temperature.value}<sup>0</sup>C`;
        
        descElement.innerHTML = weather.description;
        
        locationElement.innerHTML = `${weather.city}`;
        
        humiElement.innerHTML = `${weather.humidity}`;
        
        pressureElement.innerHTML =`${weather.pressure}`

        windElement.innerHTML=`${weather.wind}`;

        latElement.innerHTML = `${weather.lat}`;
    
        lonElement.innerHTML= `${weather.lon}`;
      }

//Api provider

const KELVIN = 273;
const key = "4f352d962bfb50b1dd3da0ed0f2e8dbc";

function getWeather(latitude,longitude){
   let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

fetch(api) 
    .then(function(response){
    let data =response.json();
    return data;
})

    .then(function(data){
     weather.temperature.value =Math.floor(data.main.temp - KELVIN);
     weather.description = data.weather[0].description;
     weather.iconId = data.weather[0].icon;
     weather.city =data.name;
     weather.humidity = data.main.humidity;
     weather.pressure = data.main.pressure;
     weather.wind = data.wind.speed;
     weather.lat = data.coord.lat;
     weather.lon = data.coord.lon;
})

.then(function(){
    displayWeather();
});
}


