const searchInput = document.querySelector('#input')
const searchBtn = document.querySelector('#btn')
const APIKEY = 'f059e97382550e9236b64f813cc84dd6'
const mainContainer = document.querySelector('#main-container')


async function fetchData(query) {
    try{
        if (!query) {
            return null
        }
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${APIKEY}&units=metric`)

        if (!response.ok) {
            throw new Error('Failed to fetch')
        }
        const data = await response.json()
       
        return data
    } catch(err){
        console.log(err)
        return null
    }
    
}


function generateWeather (weatherData) {
    if (weatherData || weatherData.weather || weatherData.main || weatherData.wind) {
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
    document.getElementById('city-name').textContent = `${weatherData.name}`;
    document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${weatherData.wind.speed} km/h`;
    }
     else {
        document.getElementById('city-name').textContent = 'Weather data is incomplete';
        return;
     }
}

searchBtn.addEventListener('click', async function(){
    const query = searchInput.value
    const weatherData = await fetchData(query)
    if (weatherData) {
        generateWeather(weatherData)
    } else {
        document.getElementById('city-name').innerHTML = 'City has not been found'
    }
})