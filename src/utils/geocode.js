const request = require('request')

const geocode = (address, callback) => {

    
   
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidW5pdmVyc2VkZWNvZGVyIiwiYSI6ImNraXZ6cnB1ZDNla20ydnFqcDVicG95eWwifQ.EMUiFXkeRehvJoGP324Ocg&limit=1`

    request({url, json: true}, (err, {body}= {}) => {
      
        if(err){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length == 0){
            callback('Unable to find a location or API is not correct', undefined)
        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0] 
           callback(undefined, {
               latitude: latitude,
               longitude: longitude 
           })
        }

    })
             
}


module.exports = {
    geocode: geocode
}