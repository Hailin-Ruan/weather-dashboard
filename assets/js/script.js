const APIKey = "bf18cdbcb62244f196c3b93693db628b";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#searchInput");
const SearchBtn = document.querySelector("#button");
const weatherIcons = document.querySelectorAll(".weather-icon");

const savedSearchesContainer = document.querySelector("#saved-searches");

function saveInputToLocalStorage() {
  const inputValue = searchInput.value;
  if (inputValue) {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
    savedSearches.push(inputValue);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    displaySavedSearches();
  }
}

function displaySavedSearches() {
  savedSearchesContainer.innerHTML = "";

  const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];

  savedSearches.forEach(searchValue => {
    const searchEntry = document.createElement("button");
    searchEntry.textContent = searchValue;
    searchEntry.addEventListener("click", () => {
      checkWeather(searchValue);
    });
    savedSearchesContainer.appendChild(searchEntry);
  });
}

SearchBtn.addEventListener("click", saveInputToLocalStorage);

window.addEventListener("DOMContentLoaded", displaySavedSearches);

const savedInputValue = localStorage.getItem("searchInputValue");
if (savedInputValue) {
  searchInput.value = savedInputValue;
}

async function checkWeather(city) {
  try {
    const response = await fetch(APIUrl + city + `&appid=${APIKey}`);
    if (response.status === 404) {
      document.querySelector(".not-found").style.display = "block";
      setTimeout(function () {
        document.querySelector(".not-found").style.display = "none";
      }, 3000);
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".date").innerHTML = dayjs().format("D MMMM YYYY");
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      const weatherMain = data.weather[0].main;

      weatherIcons.forEach(icon => {
        let weatherIconClass = "";

        if (weatherMain === "Clouds") {
          weatherIconClass = "wi-cloudy";
        } else if (weatherMain === "Clear") {
          weatherIconClass = "wi-day-sunny";
        } else if (weatherMain === "Rain") {
          weatherIconClass = "wi-rain";
        } else if (weatherMain === "Drizzle") {
          weatherIconClass = "wi-showers";
        } else if (weatherMain === "Snow") {
          weatherIconClass = "wi-snow";
        } else if (weatherMain === "Thunderstorm") {
          weatherIconClass = "wi-thunderstorm";
        } else {
          weatherIconClass = "wi-na"; // Default icon if weather condition doesn't match any specific condition
        }

        icon.classList.add(weatherIconClass);
      });

      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    console.error(error);
    // Handle the error or display an appropriate error message
  }
}

SearchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
