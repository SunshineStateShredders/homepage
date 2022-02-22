// ski resort api vars

var resortBtn = document.getElementById("resort-button");

var resortInput = document.getElementById("resort-input");

var skiContainerEl = document.getElementById("ski-container")

// dispo api vars

var cityInputElem = document.getElementById("city-input")

var userFormElem = document.getElementById("city-button")

var weedContainerEl = document.getElementById("weed-container")

var apiKey = "d4b90e8410e1e6340fdef8cb4dc8c977";

// ski fetch

var resortConditions = function(name) {
    fetch("https://ski-resort-forecast.p.rapidapi.com/" + name + "/forecast?units=i&el=top", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "ski-resort-forecast.p.rapidapi.com",
		    "x-rapidapi-key": "cb429a4d48mshbcf268ca98f390fp153e1ajsna46191c3984e"
        }
    })
    .then(response => {
	    console.log(response);
        if (response.ok) {
            response.json().then(function(data){
                console.log("data", data)

                // resort facts
                
                resortName = data.basicInfo.name;
                resortRegion = data.basicInfo.region;
                resortElevation = data.basicInfo.topLiftElevation;
                

                // day 1

                dayOneWeekday = data.forecast5Day[0].dayOfWeek;
                dayOneSnow = data.forecast5Day[0].am.snow;
                dayOneMinTemp = data.forecast5Day[0].am.minTemp;
                

                // day 2

                dayTwoWeekday = data.forecast5Day[1].dayOfWeek;
                dayTwoSnow = data.forecast5Day[1].am.snow;
                dayTwoMinTemp = data.forecast5Day[1].am.minTemp;

                // day 3

                dayThreeWeekday = data.forecast5Day[2].dayOfWeek;
                dayThreeSnow = data.forecast5Day[2].am.snow;
                dayThreeMinTemp = data.forecast5Day[2].am.minTemp;

                // day 4

                dayFourWeekday = data.forecast5Day[3].dayOfWeek;
                dayFourSnow = data.forecast5Day[3].am.snow;
                dayFourMinTemp = data.forecast5Day[3].am.minTemp;

                // day 5

                dayFiveWeekday = data.forecast5Day[4].dayOfWeek;
                dayFiveSnow = data.forecast5Day[4].am.snow;
                dayFiveMinTemp = data.forecast5Day[4].am.minTemp;

                // day 3 summary

                summaryThree = data.summary3Day;

                // day 4-6 summary

                summaryFour = data.summaryDays4to6;

                console.log(dayOneSnow)

                var createContainer = document.createElement("div");
                createContainer.innerHTML = "Resort:" + " " + resortName + "<br/>" + "Region:" + " " + resortRegion + "<br/>" + "Elevation:" + " " + resortElevation;

                var createForecastOne = document.createElement("div");
                createForecastOne.innerHTML = dayOneWeekday + "<br/>" + "Snow:" + " " + dayOneSnow + "<br/>" + "Lowest Temperature:" + " " + dayOneMinTemp

                var createForecastTwo = document.createElement("div");
                createForecastTwo.innerHTML = dayTwoWeekday + "<br/>" + "Snow:" + " " + dayTwoSnow + "<br/>" + "Lowest Temperature:" + " " + dayTwoMinTemp

                var createForecastThree = document.createElement("div");
                createForecastThree.innerHTML = dayThreeWeekday + "<br/>" + "Snow:" + " " + dayThreeSnow + "<br/>" + "Lowest Temperature:" + " " + dayThreeMinTemp

                var createForecastFour = document.createElement("div");
                createForecastFour.innerHTML = dayFourWeekday + "<br/>" + "Snow:" + " " + dayFourSnow + "<br/>" + "Lowest Temperature:" + " " + dayFourMinTemp

                var createForecastFive = document.createElement("div");
                createForecastFive.innerHTML = dayFiveWeekday + "<br/>" + "Snow:" + " " + dayFiveSnow + "<br/>" + "Lowest Temperature:" + " " + dayFiveMinTemp


                skiContainerEl.appendChild(createContainer);
                skiContainerEl.appendChild(createForecastOne);
                skiContainerEl.appendChild(createForecastTwo);
                skiContainerEl.appendChild(createForecastThree);
                skiContainerEl.appendChild(createForecastFour);
                skiContainerEl.appendChild(createForecastFive);
            })
        }   
    })
    .catch(err => {
        console.error(err);
    });
}

var resortSubmit = function(event) {
    event.preventDefault();
    var name = resortInput.value;
    if (name) {
        resortConditions(name);
        resortInput.value = "";
    } else {
        alert("That's not a valid Ski Resort Mama Guevo")
    }
}

resortBtn.addEventListener("click", resortSubmit);

// coordinate fetch

var getCityCoord = function(city, state) {
    console.log("function was called");


    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + "US" + "&limit=" + 5 + "&appid=" + apiKey;
    console.log("function was called");

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log("it works", data);
                    cityLat = data[0].lat;
                    console.log("lat", cityLat);
                    cityLon = data[0].lon;
                    console.log("lon", cityLon);
                    getDispo(cityLat, cityLon);
                    cityName = data[0].name;
                });
            }
        });
}

var getDispo = function (cityLat, cityLon) {
    fetch("https://cannafinder.p.rapidapi.com/shops-in-radius-around-coordinates?lat="+ cityLat + "&lon=" + cityLon + "&radius=1000", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cannafinder.p.rapidapi.com",
            "x-rapidapi-key": "cb429a4d48mshbcf268ca98f390fp153e1ajsna46191c3984e"
        }
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            response.json().then(function(data) {
              console.log("dispo", data);
            })
        }
    })
    .catch(err => {
        console.error(err);
    });
}

var formSubmitListener = function(event) {
    event.preventDefault();
    var city = cityInputElem.value.split(",")[0];
    var state = cityInputElem.value.split(",")[1];
 


    if (city, state) {
        getCityCoord(city, state);
        cityInputElem.value = "";
    } else {
        alert("Please enter valid city name and state code")
    }
    console.log(event);
    console.log(city, state)
};

userFormElem.addEventListener("click", formSubmitListener);