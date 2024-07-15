// iss_promised.js
const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body; // retrieve the body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    });
};


/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;
      const { longitude, latitude } = body;
      return { longitude, latitude };
    });
};

const fetchISSFlyOverTimes = function(coords) {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
    .then((response) => {
      //const response = response.response;
      const body = response.body;
      return body.response;
    });
};

/**
 * Fetches the next ISS flyover times for the user's location.
 * @returns {Promise} A promise that resolves to the next ISS flyover times.
 */
const nextISSTimesForMyLocation = function() {
  //Always return promise
  return fetchMyIP()//call the first function
    .then((ip) => fetchCoordsByIP(ip))//once the function is run take the result (this time it is called 'ip') and pass it to the next function
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passTimes) => {
      return passTimes;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};
