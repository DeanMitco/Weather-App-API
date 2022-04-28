let mediaBig = window.matchMedia("(min-width: 2160px)");
let mediaMedium = window.matchMedia("(min-width: 1080px)");
let mediaSmall = window.matchMedia("(max-width: 1080px)");

let weather = {
    "apikey": "API-KEY",
    fetchWeather: function(city) {                      // async probieren
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data), (data) => this.setbackground(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    },
    setbackground: function(data, mediaBig, mediaMedium, mediaSmall){
        const { name } = data;
        if(mediaBig.matches){
        document.body.style.backgroundImage = "url('https://source.unsplash.com/2700x1400/?" + name + "')"
        }else if (mediaMedium.matches){
            document.body.style.backgroundImage = "url('https://source.unsplash.com/2000x1000/?" + name + "')"
        } else if (mediaSmall.matches){
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        } else {
            document.body.style.backgroundImage = "url('https://source.unsplash.com/700x400/?" + name + "')"
        }
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather("Denver");
weather.setbackground(mediaBig, mediaMedium, mediaSmall);