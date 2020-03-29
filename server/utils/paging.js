const pageDetails = {
    volunteers : {
        pageSize: 30
    },
    doctors: {
        pageSize: 30
    }
}

const _getPagingDbData = (page, type) => {
    var size = pageDetails[type].pageSize;

    var result = {
        from: page * size,
        to : page * size + size
    }

    return result;
}

module.exports.getPagingDbData = _getPagingDbData;