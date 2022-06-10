const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    // console.log(url);
    request({url,json:true},(error,{body})=>{
        // console.log(body.main);
        if(error){
            callback("Can't fetch the data from weather map api", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location.", undefined)
        }
        else {
            callback(undefined, {
                main: body.weather[0].main,
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
                // abc: true
            })
        }    
    });
    // console.log(url);
    // callback(true);
}

module.exports = weatherData;