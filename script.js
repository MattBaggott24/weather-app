let unitArr = ["F", "C"];

let weather = {
    apiKey: "fbced54f0bc1e9c84611024f01eb58f0",
    unit: "metric",
    fetchWeather: function (city, unit) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + this.apiKey).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        console.log(name, icon, description, temp, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°" + getUnit();
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value, this.unit);
    }
};

document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

function getUnit() {
    document.querySelector(".toggle").addEventListener("click", () => {
        [unitArr[0], unitArr[1]] = [unitArr[1], unitArr[0]]; //swaps array around
        document.querySelector(".toggle").textContent = unitArr[0];
        weather.displayWeather(data);
    });
    return document.querySelector(".toggle").textContent = unitArr[0];

}

weather.fetchWeather("London");