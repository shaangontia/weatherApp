const request = require('request');

const forcast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ac7dfd6c63510c2b669e06f4e9a3fb79&query='+ lat + ',' + long;
    request({url, json:true}, (err, {body}) => {
        if (err) {
            callback('Unable to get the weather service');
        } else {
            if (body.error) {
                callback(body.error.info);
            } else {
                const current = body.current;
                callback(undefined, current.weather_descriptions[0] + ', It is currently ' + current.temperature + ' degrees outside and it feels like ' + current.feelslike);
            }
        }

    });
};

module.exports = forcast;