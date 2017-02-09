// global variables
var weather_ids = ["clear sky", "few clouds", "scattered clouds", "broken clouds", "shower rain", "rain", "thunderstorm", "snow", "mist"];
var weather_icons_day = ["wi-day-sunny", "wi-day-cloudy", "wi-day-cloudy", "wi-day-cloudy", "wi-day-rain", "wi-day-rain", "wi-day-thunderstorm", "wi-day-snow", "wi-day-fog"];
var weather_icons_night = ["wi-night-clear", "wi-night-partly-cloudy", "wi-night-alt-cloudy", "wi-night-alt-cloudy", "wi-night-alt-showers" ,"wi-night-showers", "wi-night-thunderstorm", "wi-night-alt-snow", "wi-night-alt-cloudy-gusts"];
var today = new Date();

return_description_image = function (day) {
    var daytime = (new Date()).getHours() > 16 ? false : true;
    var index = weather_ids.indexOf(day["weather"][0]["description"]);
    return daytime ? weather_icons_day[index] : weather_icons_night[index];
}

var api = 'c2bcd1c3e60c65c85e8a2e95da3f9075';
navigator.geolocation.getCurrentPosition(function (position) {
    // code for the current weather
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c2bcd1c3e60c65c85e8a2e95da3f9075`, function (data) {
        console.log(data);
        document.getElementById("current_date").innerHTML = (today.getMonth() + 1) + "/" + today.getDate();
        document.getElementById("city_name").innerHTML = data.name;
        document.getElementById("weather_icon").className = "wi " + return_description_image(data);
        document.getElementById("weather_description").innerHTML = weather_ids[weather_ids.indexOf(data["weather"][0]["description"])];
    });

    // code for the daily forecast
    $.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=10&appid=c2bcd1c3e60c65c85e8a2e95da3f9075&units=imperial`, function (data) {
        console.log(data);
        var i = 1;
        // scroll through the 10 day forecast 10 times
        while (i < 100) {
            setTimeout( function ( index ) {
                document.getElementById("forecast_date").innerHTML = (today.getMonth() + 1) + "/" + (today.getDate() + (index % 10));
                // try catch here because sometimes `List` is capitalized and sometimes it is just `list`
                try {
                    document.getElementById("forecast_max").innerHTML = "Max Temp: " + data["list"][index % 10]["temp"]["max"] + "°";
                    document.getElementById("forecast_min").innerHTML = "Min Temp: " + data["list"][index % 10]["temp"]["min"] + "°";
                    document.getElementById("forecast_description").innerHTML = data["list"][index % 10]["weather"][0]["description"];
                    document.getElementById("forecast_image").className = "wi " + return_description_image(data["list"][index % 10]);
                } catch (e) {
                    document.getElementById("forecast_max").innerHTML = "Max Temp: " + data["List"][index % 10]["temp"]["max"] + "°";
                    document.getElementById("forecast_min").innerHTML = "Min Temp: " + data["List"][index % 10]["temp"]["min"] + "°";
                    document.getElementById("forecast_description").innerHTML = data["List"][index % 10]["weather"][0]["description"];
                    document.getElementById("forecast_image").className = "wi " + return_description_image(data["List"][index % 10]);
                }
            }, i * 2500 - 2500, i);
            // delay is subtracted by 2500 so the forecast shows up immediately because i starts at 1
            i += 1;
        }
    });
});