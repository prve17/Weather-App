var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

dateElement.textContent = new Date().getDate()+", "+ monthNames[new Date().getMonth()];



weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(search.value);
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" +search.value;
    fetch(locationApi).then(response =>{
        response.json().then(data =>{
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                if(data.main === "Haze" || data.main === "Thunderstorm" || data.main === "Rain" || data.main === "Snow" || data.main === "Fog"){
                    weatherIcon.className = "wi wi-day-" + data.main.toLowerCase()
                }else if(data.main === "Clear"){
                    weatherIcon.className = "wi wi-day-sunny"
                }else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    })
})
