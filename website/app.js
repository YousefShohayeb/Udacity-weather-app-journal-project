/* Global Variables */
const apiKey = '&appid=f90b1fc3af73a87cd60538e11a90f616&units=metric'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = Number(d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//add event listener to existing generate button
document.getElementById('generate').addEventListener('click',getWeather);

function getWeather (){
    const zipCode = document.getElementById('zip').value
    if(Number(zipCode)>=501 && Number(zipCode)<=99950 && zipCode.length === 5){
        getTemperature(baseURL,zipCode,apiKey)
        .then (function (temperature){
            if(temperature != undefined){
            postInfo('/add', {date: newDate, temp: temperature, content: document.getElementById('feelings').value});
            updater();
            } else{
                alert('Please input a valid Zip Code') 
            }
        });
    } else{
        alert('Please input a valid Zip Code')
    }
}


//GET data
const getTemperature = async (base,zip,api)=>{
    try{   
        const req = await fetch(base+zip+api)
        const res = await req.json();
        const temperature = res.main.temp;
        return temperature;
    } catch (error) {
        console.log("error", error)
    }
}

//POST data
const postInfo = async (url = '', allData = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(allData)
    });
    try{
        const info = await res.json()
        return info
    }catch {
        console.log('error',error)
    }
}

//update UI
const updater = async () => {
    try{
        const res = await fetch('/all')
        const response = await res.json();
        const length = response.length
        document.getElementById('date').innerHTML = `Date: ${response[length-1].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${response[length-1].temp}`;
        document.getElementById('content').innerHTML = `Your feelings: ${response[length-1].content}`;
    }catch (error) {
        console.log('error',error);
    }
}