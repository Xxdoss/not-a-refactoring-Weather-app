const cityinput = document.getElementById('search_input')
const search_img = document.getElementById('search_img')
const temp = document.getElementById('temperature')
const city = document.getElementById('location_city')

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '60f72b513cbc3cf6088e6b75d4996370';

tabNow = document.getElementById('tab_now').addEventListener('click', function(){
    tab_now.style.display = 'block'
    details.style.display = 'none'
    forecast.style.display = 'none'
    tab_now.style.background = 'black'
    tab_now.style.color = 'white'
    tab_details.style.background = 'white'
    tab_details.style.color = 'black'
    tab_forecast.style.background = 'white'
    tab_forecast.style.color = 'black'
})

tabDetails = document.getElementById('tab_details').addEventListener('click', function(){
    details.style.display = 'block'
    forecast.style.display = 'none'
    tab_details.style.background = 'black'
    tab_details.style.color = 'white'
    tab_now.style.background = 'white'
    tab_now.style.color = 'black'
    tab_forecast.style.background = 'white'
    tab_forecast.style.color = 'black'
})

tabForecast = document.getElementById('tab_forecast').addEventListener('click', function(){
    forecast.style.display = 'block'
    details.style.display = 'none'
    tab_details.style.background = 'white'
    tab_details.style.color = 'black'
    tab_now.style.background = 'white'
    tab_now.style.color = 'black'
    tab_forecast.style.background = 'black'
    tab_forecast.style.color = 'white'
})

function ds (event) {
    event.preventDefault()
if(event.target === d) {
    const cityName = cityinput.value
    console.log (cityName)
}
    getWeather()
}

var weather

const d = document.getElementById('dd')
d.addEventListener('submit',ds)
search_img.addEventListener('click',ds)

async function getWeather() {
    
    const cityName = cityinput.value.charAt(0).toUpperCase()+ cityinput.value.slice(1)
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
   
    let data = await fetch (url)
        let json = await data.json();
        let citytemp = json.main.temp
            weather = json.weather[0].description
            citytemp = Math.floor(citytemp)
                var feels_like = json.main.feels_like
                feels_like = Math.floor(feels_like)
                    var sunrise = json.sys.sunrise
                    var sunset = json.sys.sunset

    if(data.ok) {
        temp.textContent = citytemp+'°'
        city.textContent = cityName
        document.getElementById('details_city').textContent = cityinput.value.charAt(0).toUpperCase()+ cityinput.value.slice(1)
        details_temperature.textContent = 'Temperature: '+citytemp+'°'
        details_weather.textContent = 'Weather: '+weather
        details_feels.textContent = 'Feels like: '+feels_like+'°'
        add_btn.style.cssText =`
        background: url('img/add.png') 100% 100% no-repeat;
        background-size: cover;`
        start.style.display = "none"
        details_sunrise.textContent = 'Sunrise: '+getTime(sunrise)
        details_sunset.textContent = 'Sunset: '+getTime(sunset)
        
    } 
    else {console.log(`чето не то`)}
   
    return (weather,weathericon())
}

var lastdelete
    var localList = JSON.parse(localStorage.getItem('list'))
        var list = []

list = localList


function add (){

    const namecity = document.querySelector('#location_city')

if (cityinput.value!=''){
    add_btn.style.cssText =`
    background: url('img/add_fill.png') 100% 100% no-repeat;
    background-size: cover;`
        list.push({
        city:namecity.textContent,
    })
}

if (lastdelete === namecity.textContent){
    add_btn.style.cssText =`
    background: url('img/add_fill.png') 100% 100% no-repeat;
    background-size: cover;`
        list.push({
        city:lastdelete
    })
}
    localStorage.setItem('list', JSON.stringify(list))
        localList = JSON.parse(localStorage.getItem('list'))

    console.log(list)
    cityinput.value = ''
    clear()
    render()
   
}

var add_btn = document.querySelector('#add')
    add_btn.addEventListener('click',add)

const detailsCity = document.createElement('h1')
    detailsCity.id = 'details_city'

function render (){

    list.forEach(elem => {

        const newLi = document.createElement('li')
            newLi.id = 'add_item'
            newLi.textContent = elem.city
            added_locations_li.appendChild(newLi)
                newLi.addEventListener('click',tabrender)

        const del = document.createElement ('div')
            del.id = 'del_item'
            newLi.appendChild(del)
                del.addEventListener('click',deleteli)

    async function tabrender (){

        foreclear()
        coloradd()

        const cityName = newLi.textContent
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
       
        let data = await fetch (url)
        let json = await data.json();
        let citytemp = json.main.temp
            weather = json.weather[0].description
            citytemp = Math.floor(citytemp)
                var feels_like = json.main.feels_like
                feels_like = Math.floor(feels_like)
                    var sunrise = json.sys.sunrise
                    var sunset = json.sys.sunset

        if(data.ok) {
            temp.textContent = citytemp+'°'
            city.textContent = cityName
            document.getElementById('details_city').textContent = newLi.textContent 
            details_temperature.textContent = 'Temperature: '+citytemp+'°'
            details_weather.textContent = 'Weather: '+weather
            details_feels.textContent = 'Feels like: '+feels_like+'°'
            start.style.display = "none"
            details_sunrise.textContent = 'Sunrise: '+getTime(sunrise)
            details_sunset.textContent = 'Sunset: '+getTime(sunset)
    }   
        else {console.log(`чето не то`)}

    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast`
        const urlForecast = `${forecastUrl}?q=${cityName}&appid=${apiKey}&units=metric`
            let dataf = await fetch (urlForecast)
            let jsonf = await dataf.json()
                var i=3
            for (jsonf.list[i];i<8;i++){

                detailsCity.textContent = cityName

                const forecastBlock = document.createElement('div')
                    forecastBlock.id = 'forecast_block'

                const forecastData = document.createElement('span')
                    forecastData.id = 'forecast_data'
                    fdata = jsonf.list[i].dt_txt
                    fdata = fdata.slice(0,-9)
                    forecastData.textContent = fdata

                const forecastTime = document.createElement('span')
                    forecastTime.id = 'forecast_time'
                    ftime = jsonf.list[i].dt_txt
                    ftime = ftime.slice(11,-3)
                    forecastTime.textContent = ftime

                const forecastTemperature = document.createElement('div')
                    forecastTemperature.id = 'forecast_temperature'
                    let forecasttemp = jsonf.list[i].main.temp
                    forecastTemperature.textContent = 'Temperature: '+Math.floor(forecasttemp)+"°"
        
                const forecastFeels = document.createElement('span')
                    forecastFeels.id = 'forecast_feels'
                    let forecastfeels = jsonf.list[i].main.feels_like
                    forecastFeels.textContent = 'Feels like: '+Math.floor(forecastfeels)+"°"

                const forecastImg = document.createElement('div')
                    forecastImg.id = 'forecast_img'
                    forecastWeather = jsonf.list[i].weather[0].description

                if (i==3) {forecast.appendChild(detailsCity)}
                forecast.appendChild(forecastBlock)

                    forecastBlock.appendChild(forecastData)
                    forecastBlock.appendChild(forecastTime)
                    forecastBlock.appendChild(forecastTemperature)
                    forecastBlock.appendChild(forecastFeels)
                    forecastBlock.appendChild(forecastImg)

                 if (forecastWeather==='clear sky'){
                        forecastImg.style.cssText=`
                        background: url('img/sun.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='moderate rain'||forecastWeather==='light rain'){
                        forecastImg.style.cssText=`
                        background: url('img/a_bit_rainy.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='few clouds'||forecastWeather==='broken clouds'||forecastWeather==='scattered clouds'){
                        forecastImg.style.cssText=`
                        background: url('img/clear_sky.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='overcast clouds'){
                        forecastImg.style.cssText=`
                        background: url('img/overacst_clouds.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='mist'||forecastWeather==='fog'){
                        forecastImg.style.cssText=`
                        background: url('img/mist.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='light intensity shower rain'){
                        forecastImg.style.cssText=`
                        background: url('img/light_shower_rain.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='drizzle'){
                        forecastImg.style.cssText=`
                        background: url('img/drizzle.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
                    if (forecastWeather==='light snow'){
                        forecastImg.style.cssText=`
                        background: url('img/light_snow.png') 100% 100% no-repeat;
                        background-size: cover;`
                    }
            }

        
    localStorage.setItem('list', JSON.stringify(list));
        return (weather,weathericon())
}

function coloradd(){

    add_btn.style.cssText =`
        background: url('img/add_fill.png') 100% 100% no-repeat;
        background-size: cover;`
        
}
    function deleteli(){

        var searchName = elem.city
            lastdelete = elem.city

        var index = list.findIndex(el => el.city === searchName)
            list.splice(index,1)
                newLi.remove()

        add_btn.style.cssText =`
            background: url('img/add.png') 100% 100% no-repeat;
            background-size: cover;`

    localList = JSON.parse(localStorage.getItem('list'));
        return lastdelete 
        }
    })
}

function clear (){
    document.querySelectorAll('#add_item').forEach(function(){
        var elem = document.getElementById("add_item");
            elem.parentNode.removeChild(elem);
    })  
}
function foreclear() {
    document.querySelectorAll('#forecast_block').forEach(function(){
        var elem = document.getElementById("forecast_block");
            elem.parentNode.removeChild(elem);
    })  
}

function weathericon(){
    if (weather==='clear sky'){
        weather_now.style.cssText=`
        background: url('img/sun.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='moderate rain'||weather==='light rain'){
        weather_now.style.cssText=`
        background: url('img/a_bit_rainy.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='few clouds'||weather==='broken clouds'||weather==='scattered clouds'){
        weather_now.style.cssText=`
        background: url('img/clear_sky.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='overcast clouds'){
        weather_now.style.cssText=`
        background: url('img/overacst_clouds.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='mist'||weather==='fog'){
        weather_now.style.cssText=`
        background: url('img/mist.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='light intensity shower rain'){
        weather_now.style.cssText=`
        background: url('img/light_shower_rain.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='drizzle'){
        weather_now.style.cssText=`
        background: url('img/drizzle.png') 100% 100% no-repeat;
        background-size: cover;`
    }
    if (weather==='light snow'){
        weather_now.style.cssText=`
        background: url('img/light_snow.png') 100% 100% no-repeat;
        background-size: cover;`
    }
}

function getTime(unix) {
    let date = new Date(unix * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = hours + ":" + minutes;
    return time;
}

render()