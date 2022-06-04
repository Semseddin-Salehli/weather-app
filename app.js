const url = 'https://api.openweathermap.org/data/2.5/';
const key = '3af8b15ae2a474a089a32be577e9aa82';

let search = document.getElementById('searchInp');
let btn = document.querySelectorAll('.search-btn')[0];

const setQuery = (e) => {
    if (e.code == 'Enter') getWeather(search.value);
}

const event = search.addEventListener("keypress", setQuery);

function getWeather(city) {
    let query = `${url}weather?q=${city}&appid=${key}&units=metric&lang=tr`;

    fetch(query)
        .then(weather => {
            return weather.json();
        })
        .then(writeInfo)
        .catch(e => {
            alert('Lütfen düzgün şehir yazın!');
        });
}

function writeInfo(response) {
    let city = document.getElementsByClassName('city-text')[0];
    city.innerText = `${response.name}, ${response.sys.country}`;

    let temp = document.getElementsByClassName('temp-text')[0];
    temp.innerText = `${Math.round(response.main.temp)}°C`;

    let desc = document.getElementsByClassName('desc-text')[0];
    desc.innerText = response.weather[0].description;

    let minmax = document.getElementsByClassName('minmax-text')[0];
    minmax.innerText = `
    ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C
    `;

    if(search != '') search.value = '';
}

async function getAndWriteInformation() {
    let city = await getCity();
    getWeather(city);
}

async function getCity() {
    const request = await fetch("https://ipinfo.io/json?token=4ce24c4729ce4e")
    const json = await request.json();

    return json.city;
}

getAndWriteInformation();