const bodyParser = require("body-parser");
const express = require("express");

const userRoutes = require('./routes/user.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const rolesRoutes = require('./routes/roles.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');
const middlewares = require('./middlewares/main.middleware.js');

const app = express();

const errorHandler = require('./middlewares/error-handler.middleware');
const joiErrorHandler = require('./middlewares/joi-error-handler.middleware');

app.use(bodyParser.json());

app.use(middlewares.showDate);
app.use(middlewares.addHeaderEcv);
app.use(middlewares.checkAuthorizationHeader);

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);
app.use('/roles', rolesRoutes);
app.use('/comments', commentsRoutes);

app.use(joiErrorHandler);
app.use(errorHandler);

app.listen(3000);