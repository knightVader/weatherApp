const URL_coordinates="https://api.openweathermap.org/geo/1.0/direct?q="
const URL="https://api.openweathermap.org/data/2.5/weather?"

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let search=document.querySelector(".search")
let country=document.getElementById("country")
let dandt=document.getElementById("dandt")
let weather=document.getElementById("weather")
let logo=document.querySelector(".logo")
let temp=document.querySelector(".temp")
let min=document.querySelector("#min")
let max=document.querySelector("#max")
let feel=document.getElementById("value1")
let humidity=document.getElementById("value2")
let wind=document.getElementById("value3")
let pressure=document.getElementById("value4")

let Coordinates=async (city)=>{
    let coordinate=await fetch(`${URL_coordinates}${city}&limit=1&appid=1659440a5f878ad0072aaf971d3c7719`);
    let data=await coordinate.json();

    return data;
}

let weather_data = async (city) => {

    let data=await Coordinates(city)

    let response=await fetch(`${URL}lat=${data[0].lat}&lon=${data[0].lon}&appid=1659440a5f878ad0072aaf971d3c7719`)
    let main_data=await response.json();
    
    return main_data;
}

let changeName=(cityName,data)=>{
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    let Cname=regionNames.of(`${data.sys.country}`);
    let cityn=cityName[0]
    let c=cityn.toUpperCase()+cityName.slice(1,cityName.lenght)
    country.innerText=`${c}, ${Cname}`
}

let changeWeather=(data)=>{
    weather.innerText=`${data.weather[0].main}`
}

let changeTemperature=(data)=>{
    let temperature=data.main.temp-273
    temp.innerHTML=`${temperature.toFixed(2)}&deg;c`
    let mint=data.main.temp_min-273
    let maxt=data.main.temp_max-273
    min.innerHTML=`Min: ${mint.toFixed(2)}&deg;c`
    max.innerHTML=`Max: ${maxt.toFixed(2)}&deg;c`
}

let changeValues=(data)=>{
    let feelt=data.main.feels_like-273
    feel.innerHTML=`${feelt.toFixed(2)}&deg;c`
    wind.innerText=`${data.wind.speed}m/s`
    humidity.innerText=`${data.main.humidity}%`
    pressure.innerText=`${data.main.pressure}hpa`
}

let changeLogo=(data)=>{
    logo.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="height: 50px; width: 50px;">`
}

let changeDate = async (city) => {
    let data=await Coordinates(city)

    let response=await fetch(`https://timeapi.io/api/time/current/coordinate?latitude=${data[0].lat}&longitude=${data[0].lon}`)
    let mainData=await response.json()

    dandt.innerText=`${mainData.day} ${months[mainData.month-1]} ${mainData.year}, ${mainData.time}`
};

let loadValues= async ()=>{
    let data=await weather_data("New delhi")
    country.innerText="New Delhi, India"
    changeWeather(data)
    changeTemperature(data)
    changeValues(data)
    changeLogo(data)
    changeDate("New Delhi")
}

loadValues()

search.addEventListener("submit", async (e)=>{ // here form is used so when enter is presses or we move from form it gets submitted
    e.preventDefault();
    let cityName=document.querySelector("#cityname").value
    let data=await weather_data(cityName)
    changeName(cityName,data)
    changeWeather(data)
    changeTemperature(data)
    changeValues(data)
    changeLogo(data)
    changeDate(cityName)
})