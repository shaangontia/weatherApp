const path = require('path');
const express = require("express");
const hbs = require('hbs');

const app = express();
const forcast = require('../utils/forecast');
const geocode = require('../utils/geocode');

const port = process.env.PORT || 3000;

//define paths for express config
const PUBLIC_DIR = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(PUBLIC_DIR));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'shaan' 
    }); 
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shaan',
        help: 'If you need help then I am there'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shaan' 
    }); 
});


app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404 Incorrect Help Page',
        name: 'Shaan',
        errorMessage: 'Help Article not found'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    let weatherObject = {};
    if (!address) {
        return res.send({
            error: 'Please send the address'
        })
    } 
    geocode(address, (err, {laltitude, longitude, location} = {}) => {
        if (err) {
            console.log('error: ' + err); 
            weatherObject.error = err;
            return res.send(weatherObject);
        } 
        weatherObject.location = location;
        forcast(laltitude, longitude, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                weatherObject = {
                    location,
                    forecastData: data,
                    address
                };
                // console.log(data); 
                res.send(weatherObject);
            }
        });
        
    });

    console.log(req.query.address);
    
});
//Must be kept it at last as this is a wild card match and only when all the above matches fail this will trigger
app.get('*', (req, res) => {
    res.render('errorPage', {
        title: '404 Incorrect Page',
        name: 'Shaan',
        errorMessage: 'Page not found'
    });
});

app.listen(port,  () => {
    console.log('server is up on port ' + port);
});