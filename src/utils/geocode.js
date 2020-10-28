const request = require("request")
const chalk = require("chalk")


const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiMXVyamExIiwiYSI6ImNrZ2xxYXFqaTBkb3MyeW8xaHowa3IzM2cifQ.e67lLu1jVivGSCpICuSP_A&limit=1`

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined)
    }
    else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined)
    }
    else {
      callback(undefined, {
        description: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      })
    }
  })
}


module.exports = geocode