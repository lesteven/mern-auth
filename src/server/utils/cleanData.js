function sanitize(data) {
    
    for (var value in data) {
        data[value] = data[value].replace(/\$/g,'');
    }
}

function cleanData(req, res, next) {
    sanitize(req.body);
    next();
}


module.exports = cleanData;
