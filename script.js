let weather = {
  // API key
  apiKey: "756053e632227770ce1ffaa8ec3e8bf0",

  // Fetch weather data
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        ",NP&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Weather data not found for " + city);
          throw new Error("No weather data found");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  // Display weather data
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name + ", Nepal";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText =
      description.charAt(0).toUpperCase() + description.slice(1);
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },

  // Get weather for the searched city
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// Event listener for search button click
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Event listener for Enter key in search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Default weather for Kathmandu, Nepal
weather.fetchWeather("Kathmandu");
