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
      const { weather_descriptions, observation_time, temperature, humidity, feelslike } = body.current
      callback(undefined, weather_descriptions.join() + ". As per the observation at " + observation_time + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out. The Humidity is " + humidity + "%.")
    }
  })
}

module.exports = forecast;