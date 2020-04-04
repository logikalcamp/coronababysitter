const getTimeInIsrael = (dateString) => {
    var newDate = new Date(new Date(dateString).toLocaleString("he-IL", {timeZone: "Asia/Jerusalem"}));
    console.log("Old",dateString,"New", newDate);
    return newDate;
}

module.exports.getTimeInIsrael = getTimeInIsrael;