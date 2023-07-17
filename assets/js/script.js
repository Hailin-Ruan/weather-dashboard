const APIKey = "bf18cdbcb62244f196c3b93693db628b";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector('#searchInput');
const SearchBtn = document.querySelector('#button');

async function checkWeather(city){
    const response = await fetch(APIUrl + city + `&appid=${APIKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
}

SearchBtn.addEventListener("click", ()=>{
    checkWeather(searchInput.value);
})

// const weatherBox = document.querySelector('#weather-right-side')
// const WeatherCurrent = document.querySelector('.weather-current');
// const weatherDetails = document.querySelector('.weather-details')
// const errorMessage = document.querySelector('.not-found')