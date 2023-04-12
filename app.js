const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weatheBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const input = document.querySelector(".search-box input");
const button = document.querySelector(".search-box button");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});

search.addEventListener("click", () => {
  const APIKey = "5b3a7ee710c3e8726e141c6a109be8b6";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.cod === "404") {
        container.style.height = "425px";
        weatheBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./images/clear.png";
          break;
        case "Clouds":
          image.src = "./images/cloud.png";
          break;
        case "Haze":
          image.src = "./images/mist.png";
          break;
        case "Rain":
          image.src = "./images/rain.png";
          break;
        case "Snow":
          image.src = "./images/snow.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/hr`;

      weatheBox.style.display = "";
      weatheBox.classList.add("fadeIn");
      weatherDetails.style.display = "";
      weatherDetails.classList.add("fadeIn");
      container.style.height = "550px";
    });
});
