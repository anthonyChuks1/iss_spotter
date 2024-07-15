const { nextISSTimesForMyLocation } = require('./iss_promised');




nextISSTimesForMyLocation()//This function call already passes the passTime when .then is called
  .then((passTimes) => {
    let pushTime = [];
    for (let time of passTimes) {
      let {risetime, duration} = time;
      let date = new Date(risetime * 1000);
      let formattedDate = date.toLocaleDateString("en-US", {
        timeZone: "America/New_York", // EST Time
        weekday: 'long',
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    
      pushTime.push(`Next pass at ${formattedDate} EST for ${duration} seconds!`);
    }

    pushTime.forEach(text => {
      console.log(`${text}`);
    });

  })
  .catch((error) => {
    console.log(`Error -> ${error.message}`);
  });