exports.addContextHeader = function(req, res, next) {
    res.set({"App-Context": "Users"});
    console.log("App-Context : " + res.get("App-Context"));
    next();
}