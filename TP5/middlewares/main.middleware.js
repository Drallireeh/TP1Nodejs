const showDate = function (req, res, next) {
    console.log(new Date());
    next();
}

const addHeaderEcv = function (req, res, next) {
    req.headers["Application-name"] = "ecv-digital";
    next();
}

const checkAuthorizationHeader = function (req, res, next) {
    if (req.headers["Authorization"] === undefined) res.status(403);
    next();
}

module.exports = {
    showDate,
    addHeaderEcv,
    checkAuthorizationHeader,
}