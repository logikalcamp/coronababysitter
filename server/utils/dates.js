const wasInLast24Hours = (date) => {
    var timeStamp = Math.round(new Date().getTime() / 1000);
    var timeStampTomorrow = timeStamp - (24 * 3600);
    var wasIn24Hours = date > new Date(timeStampTomorrow*1000).getTime();
    return wasIn24Hours;
  }

module.exports.wasInLast24Hours = wasInLast24Hours;