const {fetchMyIP,/*fetchISSFlyOverTimes,fetchCoordsByIP*/} =  require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('Returned IP:' , ip);
  
  return ip;
});

// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('Returned location:' , data);
//   return data;
// });

// fetchISSFlyOverTimes ({ latitude: 45.2736841, longitude: -75.7372019 }, (error, data) =>{
//   if (error){
//     console.log(error);
//     return;
//   }

//   console.log('Response', data);
// })