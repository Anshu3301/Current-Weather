let search = document.getElementById("search");
let input = document.querySelector("input");
let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function UnixToDate(unixTimestamp) {
    const dateObj = new Date(unixTimestamp*1000);
    
    let month = `${dateObj.getMonth()+1}`;
    let day = `${dateObj.getDate()}`;
  
    if(day.length==1){
      day='0'+day;
    }
    if(month.length==1){
      month='0'+month;
    }
  
    return `${day}/${month}`;
}

function UnixToTime(unixTimestamp) {
    const dateObj = new Date(unixTimestamp*1000);
    
    let hour = `${dateObj.getHours()}`;
    let minute = `${dateObj.getMinutes()}`;

    if(hour.length==1){
        hour='0'+hour;
    }
    if(minute.length==1){
        minute='0'+minute;
    }
    
    return ` ${hour}:${minute}`;
}

function select_description(x){
    if(x=='01d' || x=='01n'){
        return 'Clear Sky';
    }
    else if(x=='02d' || x=='02n'){
        return 'Partly Sunny';
    }
    else if(x=='03d' || x=='03n'){
        return 'Partly Cloudy';
    }
    else if(x=='04d' || x=='04n'){
        return 'Cloudy';
    }
    else if(x=='09d' || x=='09n' || x=='10d' || x=='10n'){
        return 'Rain';
    }
    else if(x=='11d' || x=='11n'){
        return 'Thunderstorm';
    }
    else if(x=='13d' || x=='13n'){
        return 'Snow';
    }
    else{
        return 'Haze';
    }
}



const apiKey1 = "5dfd872886a5b16a99c8581a7f89f13d";

function getWeatherByLocation(city){
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}`, {origin: "cros" })
     .then((response) => response.json() )
     .then((response) => {

       // console.log(response);

        if(response.cod == 200){     //i.e. if city is found
            cityName.innerHTML = response.name;
            country.innerHTML = response.sys.country;
            day.innerHTML = weekdays[Math.floor((response.dt/86400) + 4) % 7];
            date.innerHTML = UnixToDate(response.dt);
            temp.innerHTML = Math.floor(response.main.temp - 273.15);
            min_temp.innerHTML = Math.floor(response.main.temp_min - 273.15)-3;
            max_temp.innerHTML = Math.floor(response.main.temp_max - 273.15)+2;
            sunrise.innerHTML = UnixToTime(response.sys.sunrise);
            sunset.innerHTML = UnixToTime(response.sys.sunset);
            humidity.innerHTML = response.main.humidity;
            windspeed.innerHTML = Math.floor(response.wind.speed)+1;
            visibility.innerHTML = Math.floor(response.visibility/1000);
            pressure.innerHTML = response.main.pressure;
        
            weather_description_text.innerHTML = select_description(response['weather']['0']['icon']);
            icon.innerHTML = `<h1><img src="https://openweathermap.org/img/wn/${response['weather']['0']['icon'].replace('n','d')}@4x.png" /></h1>`;
        }
        else{
            alert("City not Found!");
            input.value="";
        }
     })
     .catch((err)=>console.log(err))        
};


input.addEventListener('keypress',(e)=>{
    // console.log(e.key);
    if(e.key == "Enter"){
        if(input.value.trim()){
            getWeatherByLocation(input.value);
            input.value="";
        }
        else{
            alert("Enter a Location");
        } 
    }
})

search.addEventListener('click',()=>{
    if(input.value.trim()){
        getWeatherByLocation(input.value);
        input.value="";
    }
    else{
        alert("Enter a Location");
    }
})

getWeatherByLocation("Kolkata");