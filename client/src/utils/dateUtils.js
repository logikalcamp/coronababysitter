const calculateAge = (birthday) => { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const isIn24Hours = (date) => {
    var timeStamp = Math.round(new Date().getTime() / 1000);
    var timeStampTomorrow = timeStamp + (24 * 3600);
    var is24 = date <= new Date(timeStampTomorrow*1000).getTime();
    return is24;
  }

export {
    calculateAge,
    isIn24Hours
}