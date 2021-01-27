const request = require('request')

const forecast = (lat, long, callback) => {

    console.log(`$ Lat and long ${lat} + ${long}`);

    const url = `http://api.weatherstack.com/current?access_key=b2c9ed2037f7887757b10722930c9d1e&query=${lat},${long}`

    console.log(url);
    request({url, json: true}, (err, {body} = {}) => {

        if(err){
                   callback('Unable to connect to weather service', undefined);
                }
                else if(body.err){
                    callback('Unable to find a location', undefined);
                }
                else {
                    const weatherDesc = body.current.weather_descriptions[0]
                    const temp = body.current.temperature
                    const precip = body.current.precip
                    callback(undefined, {
                        temp: temp,
                        precip: precip,
                        weatherDesc: weatherDesc 
                    })
                }
    })

    
}
module.exports = {
    forecast: forecast
}