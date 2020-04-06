const getTimeInIsrael = (dateString) => {
    console.log("dateString - ",dateString);
    var newDate = new Date(new Date(dateString).toLocaleString("he-IL", {timeZone: "Asia/Jerusalem"}));
    console.log("newDate - ",newDate);
    return newDate;
}

module.exports.getTimeInIsrael = getTimeInIsrael;