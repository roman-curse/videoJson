const request = require('postman-request')

const mapboxToken = "pk.eyJ1Ijoicm9tYW4tY3Vyc2UiLCJhIjoiY2tjaXllNHdhMThrbTMxbHBqeWFtenN6byJ9.b8rS0a4_2Ew40qDBo4HfeQ"

const geocode = (address, callback) => {

    address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxToken}&limit=1`
    
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!')
            return
        }

        if(body.features.lenth === 0) {
            callback('Unable to find location. Try another search.', undefined)
            return
        }

        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode