let unitTemp = localStorage.getItem("unit");
let unitArr; //array to switch degrees or farenheit

window.onload = function () {
    //TODO fix this

    if (localStorage.getItem("unit") == null) {
        unitArr = ["F", "C"];
    }

    console.log(unitTemp);
    if (unitTemp[0] == "C") {
        unitArr = ["C", "F"];
    } else {
        unitArr = ["F", "C"];
    }
};


//creates weather object
let weather = {
    apiKey: "fbced54f0bc1e9c84611024f01eb58f0", //defines the api from my account
    // unit: "imperial",
    unit: function () { //changes the unit that is displayed 
        //TODO: set it to change speed unit
        if (getUnit() == "F") {
            return "imperial";
        } else {
            return "metric";
        }
    },
    fetchWeather: function (city) { //uses the search api with the corresponding values to fetch the data
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + this.unit() + "&appid=" + this.apiKey).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) { //function to display the weather data
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0]; //defines values from the json file that is returned
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        console.log(name, icon, description, temp, speed);
        document.querySelector(".city").innerText = "Weather in " + name; //rewrite the details according to the data recieved
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°" + unitArr[0];
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "m/s";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value); //uses the inputted text to search for the data
    }
};

document.querySelector(".search button").addEventListener("click", () => {
    weather.search(); //searches on button click
    console.log(getUnit());
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") { //searches on enter keypress
        weather.search();
    }
});

document.querySelector(".toggle").addEventListener("click", () => {
    // window.location.reload();
    document.querySelector(".toggle").textContent = unitArr[1];
    [unitArr[0], unitArr[1]] = [unitArr[1], unitArr[0]]; //swaps array around
    localStorage.setItem("unit", unitArr);
    console.log(unitArr[0]);
    // weather.search();
});

function getUnit() {
    return localStorage.getItem("unit");

}

weather.fetchWeather("London");