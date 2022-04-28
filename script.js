let unitArr; //array to switch degrees or farenheit

window.onload = function () {
	if (localStorage.getItem("unit") == null) {
		localStorage.setItem("unit", "C");
	}
	unitArr = localStorage.getItem("unit");

	console.log("localstorage on load: " + localStorage.getItem("unit"));

	console.log("unitArr on load:" + unitArr);
	if (unitArr[0] == "C") {
		unitArr = ["C", "F"];
	} else {
		unitArr = ["F", "C"];
	}
	document.querySelector(".toggle").textContent = unitArr[0];

	weather.fetchWeather("London");
};

//creates weather object
let weather = {
	apiKey: "fbced54f0bc1e9c84611024f01eb58f0", //defines the api from my account
	fetchWeather: function (city) {
		//uses the search api with the corresponding values to fetch the data
		console.log("unitArr in object" + unitArr);
		if (localStorage.getItem("unit")[0] == "C") {
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
					city +
					"&units=metric" +
					"&appid=" +
					this.apiKey
			)
				.then((response) => {
					if (!response.ok) {
						alert("No weather found.");
						throw new Error("No weather found.");
					}
					return response.json();
				})
				.then((data) => this.displayWeather(data));
		} else {
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
					city +
					"&units=imperial" +
					"&appid=" +
					this.apiKey
			)
				.then((response) => {
					if (!response.ok) {
						alert("No weather found.");
						throw new Error("No weather found.");
					}
					return response.json();
				})
				.then((data) => this.displayWeather(data));
		}
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src =
			"https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "°" + unitArr[0];
		document.querySelector(".humidity").innerText =
			"Humidity: " + humidity + "%";
		if (unitArr[0] == "C") {
			document.querySelector(".wind").innerText =
				"Wind speed: " + speed + " m/s";
		} else {
			document.querySelector(".wind").innerText =
				"Wind speed: " + speed + " mph";
		}
		document.querySelector(".weather").classList.remove("loading");
		document.body.style.backgroundImage =
			"url('https://source.unsplash.com/1600x900/?" + name + "')";
	},
	search: function () {
		this.fetchWeather(document.querySelector(".search-bar").value); //uses the inputted text to search for the data
	},
};

document.querySelector(".search button").addEventListener("click", () => {
	weather.search(); //searches on button click
});

document
	.querySelector(".search-bar")
	.addEventListener("keyup", function (event) {
		if (event.key == "Enter") {
			//searches on enter keypress
			weather.search();
		}
	});

document.querySelector(".toggle").addEventListener("click", () => {
	document.querySelector(".toggle").textContent = unitArr[1];
	[unitArr[0], unitArr[1]] = [unitArr[1], unitArr[0]]; //swaps array around
	localStorage.setItem("unit", unitArr);
	console.log("on toggle switch:" + unitArr[0]);

	if (document.querySelector(".search-bar").value == "") {
		// document.location.reload();
		weather.fetchWeather("London");
	} else {
		weather.search();
	}
});
