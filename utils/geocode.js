const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic2hhYW5nb250aWEiLCJhIjoiY2s5OWt4OGo0MDVhYzNucnc1bTRraGJnaSJ9.Lee-DjTXOi4v4TlWHNZi7w&limit=1";

    request({url: url, json:true}, (err, {body} = {}) => {
        if (err) {
            callback("Unable to connect to location service");
        } else if(body.features.length === 0) {
            callback("Please enter a valid location")
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            callback(undefined, {
                'longitude' : longitude,
                'laltitude': latitude,
                'location' : body.features[0].place_name
            });
        }
    }
)};

module.exports = geocode;