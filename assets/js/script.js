const APIKey = "bf18cdbcb62244f196c3b93693db628b";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#searchInput");
const SearchBtn = document.querySelector("#button");
const weatherIcons = document.querySelectorAll(".weather-icon");

const savedSearchesContainer = document.querySelector("#saved-searches");
const clearSavedSearchesBtn = document.querySelector("#clear-saved-searches");

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
    const searchEntry = document.createElement("div");
    searchEntry.classList.add("saved-search-entry");

    const searchValueElement = document.createElement("span");
    searchValueElement.textContent = searchValue;
    searchEntry.appendChild(searchValueElement);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "&#10006;";
    removeButton.addEventListener("click", () => {
      removeSavedSearch(searchValue);
    });
    searchEntry.appendChild(removeButton);

    searchEntry.addEventListener("click", () => {
      searchWeather(searchValue);
    });

    savedSearchesContainer.appendChild(searchEntry);
  });
}

function removeSavedSearch(searchValue) {
  const savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
  const updatedSavedSearches = savedSearches.filter(value => value !== searchValue);
  localStorage.setItem("savedSearches", JSON.stringify(updatedSavedSearches));
  displaySavedSearches();
}

function clearSavedSearches() {
  localStorage.removeItem("savedSearches");
  savedSearchesContainer.innerHTML = "";
}

SearchBtn.addEventListener("click", () => {
  saveInputToLocalStorage();
  searchWeather(searchInput.value);
});
clearSavedSearchesBtn.addEventListener("click", clearSavedSearches);

window.addEventListener("DOMContentLoaded", () => {
  displaySavedSearches();
  const savedInputs = JSON.parse(localStorage.getItem("savedSearches")) || [];
  if (savedInputs.length > 0) {
    const lastSavedInput = savedInputs[savedInputs.length - 1];
    searchInput.value = lastSavedInput;
    searchWeather(lastSavedInput);
  }
});

a// ...

async function searchWeather(city) {
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
          
            icon.className = "wi " + weatherIconClass;
          });
          
  
        document.querySelector(".weather").style.display = "block";
      }
    } catch (error) {
      console.error(error);
      // Handle the error or display an appropriate error message
    }
  }
  
  // ...
  

SearchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
