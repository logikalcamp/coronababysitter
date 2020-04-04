const getTimeInIsrael = (dateString) => {
    return new Date(new Date(dateString).toLocaleString("he-IL", {timeZone: "Asia/Jerusalem"}));
}

module.exports.getTimeInIsrael = getTimeInIsrael;