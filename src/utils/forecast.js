const request = require("request")


const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3894988d9e50da2051c5d6df4098d292&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined)
    }
    else if (body.error) {
      callback("Unable to find location", undefined)
    }
    else {
      const { weather_descriptions, temperature, feelslike } = body.current
      callback(undefined, weather_descriptions.join() + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.")
    }
  })
}

module.exports = forecast;