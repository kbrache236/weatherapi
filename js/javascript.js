// weather api

// create constants for the elements I need access to
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "cc15b26c63fce62f8a3c0bb132b7a91d";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); // prevent page from refreshing

    const city = cityInput.value;

    if (city != "") {
        try {
            const weatherData = await getWeatherData(city); // call the get weather function
            displayWeather(weatherData);                    // call the display weather function
        } catch (error) {
            displayError(error);
        }
    } else {
        displayError("Please Enter a City");
    }

    cityInput.value = "";
    cityInput.focus();

});

async function getWeatherData(city) {
    // generate the API call and store the response
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeather(data) {
    // get data from api call and store it in some variables
    const {name: city,
           main: {temp, humidity},
           weather: [{description, icon}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    // create the html elements
    const cityDisp = document.createElement("p");
    const tempDisp = document.createElement("p");
    const humDisp = document.createElement("p");
    const descDisp = document.createElement("p");
    const emojiDisp = document.createElement("p");

    // load weather data into html elements
    cityDisp.textContent = city;
    tempDisp.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humDisp.textContent = `Humidity: ${humidity}%`;
    descDisp.textContent = description;

    // build weather icon link
    emojiLink = "url('https://openweathermap.org/payload/api/media/file/";
    emojiLink += icon;
    emojiLink += ".png')";

    emojiDisp.style.backgroundImage = emojiLink;

    // add class names
    cityDisp.classList.add("cityDisp");
    tempDisp.classList.add("tempDisp");
    humDisp.classList.add("humDisp");
    descDisp.classList.add("descDisp");
    emojiDisp.classList.add("emojiDisp");

    // append elements
    card.appendChild(cityDisp);
    card.appendChild(tempDisp);
    card.appendChild(humDisp);
    card.appendChild(descDisp);
    card.appendChild(emojiDisp);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisp");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}