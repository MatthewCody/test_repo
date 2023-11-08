const request = require('request')

const weatherforcast = (place) => {
    
        setInterval( () => {
            map(place)
        }, 2000 )
}

const weather = (lat, long, place) => {

    const url = 'http://api.weatherstack.com/current?access_key=d839c799209c02f4164b42cd8519eb9b&query='+ lat +', '+ long +''

    request({url: url, json: true}, (error, response) => {
        // console.log(response.body.current)
        if(!error){
            const temperature = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            console.log(place +" is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.")
        }
        else
        {
            console.log('Unable to connect to weather system.')
        }
    })
}

const map = (place) => {

    const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ place + ".json?access_token=pk.eyJ1IjoibWF0dGhldzA0MDUyMDE5IiwiYSI6ImNsbmxpc3RvcTF4Y3AybXBkaHk3NzA4NnAifQ.tahJWzzdJs3feIAS39lGvA"

    request({url: mapUrl, json: true}, (error, response) => {

        if(!error)
        {
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            const place = response.body.features[0].place_name
            console.log("Latitude is " + lat + " and Longitude is " + long)
            weather(lat, long, place)
        }
        else
        {
            console.log('Unable to connect to MapBox')
        }
    })
}

weatherforcast('Bacolod City')