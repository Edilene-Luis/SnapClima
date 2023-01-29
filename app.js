alert('Programa Feito Por Edilene Luís,Prima Ok para Continuar');

//Interação
const citySearchInput=document.getElementById('city-search-input');
const citySearchButton=document.getElementById('city-Search-button');

//Exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('wheather-icon');
const weatherDescription = document.getElementById('wheather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const api_key = "fdf8d875c0f034fb44906d0815c77f31";


citySearchButton.addEventListener("click", ()=>{
    let cityName=citySearchInput.value
    getCityWeather(cityName)
})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}

navigator.geolocation.getCurrentPosition
((position)=>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    console.log(position)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((Response)=>Response.json())
    .then((data)=>displayWeather(data))
},
(err)=>{
    if(err.code ==1){
        alert('Como não permitiu os serviços de localização do seu navegador,terá de pesquisar manualmente prezado senhor')
    }
    else{
        console.log(err)
    }
    
    
}
)


function getCityWeather(cityName){

    weatherIcon.src=`./assets/loading-icon.svg`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((Response)=>Response.json())
    .then((data)=>displayWeather(data))
}

function displayWeather(data){
    let {
        dt,
        name,
        weather:[{icon, description}],
        main: {temp, feels_like, humidity},
        wind: {speed},
        sys: {sunrise, sunset}
    } = data

    currentDate.textContent = formatDate(dt) ;
    cityName.textContent = name;

    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}ºC`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}Km/h`;;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}ºC`;
    currentHumidity.textContent =`${humidity}%`;0
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
    weatherIcon.src=`./assets/${icon}.svg`;

    

}


function formatDate(epochTime){
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-br',{month:"long",day:'numeric'})
    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime){
    let date = new Date(epochTime * 1000)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}h${minutes}`
}

