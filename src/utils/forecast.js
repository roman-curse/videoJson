const request = require('postman-request')

const serviceUrl = 'http://api.weatherstack.com/current?access_key=3ee107478aea6a570c75224f66450243&query='

function forecast(latitude, longitude, callback) {
    let url = serviceUrl + `${longitude},${latitude}`
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

        let data = ` In ${body.location.name} it is ${body.current.weather_descriptions} ` 
        + `temperature feels like ${body.current.feelslike} degrees, `
        + `there is a ${body.current.humidity}% humidity.'`

        callback(undefined, data)
        }
    })
}

module.exports = forecast