const getTimeInIsrael = (dateString) => {
    var newDate = new Date(new Date(dateString).toLocaleString("he-IL", {timeZone: "Asia/Jerusalem"}));
    return newDate;
}

module.exports.getTimeInIsrael = getTimeInIsrael;