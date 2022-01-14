const bodyParser = require("body-parser");
const express = require("express");

const userRoutes = require('./routes/user.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const rolesRoutes = require('./routes/roles.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');

const app = express();
app.use(bodyParser.json());

const showDate = function (req, res, next) {
    console.log(new Date());
    next()
}

const addHeaderEcv = function (req, res, next) {
    req.headers["Application-name"] = "ecv-digital";
    console.log(JSON.stringify(req.headers));
    next();
}

const checkAuthorizationHeader = function (req, res, next) {
    if (req.headers["Authorization"] === undefined) res.status(403);
    next();
}

app.use(showDate);
app.use(addHeaderEcv);
app.use(checkAuthorizationHeader);

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/roles', rolesRoutes);
app.use('/comments', commentsRoutes);

app.listen(3000);