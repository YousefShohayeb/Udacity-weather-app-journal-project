// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8888;

const server = app.listen(port, listener);
function listener(){
    console.log('Server works');
    console.log(`Port number: ${port}`)
}

let allData = []

//add GET route using /all
app.get('/all', function (req,res){
    res.send(allData);
});

//POST route
app.post('/add', addWeatherData);

function addWeatherData(req,res){
    weatherData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }

    allData.push(weatherData);
    res.send(allData);
    console.log(allData);
}