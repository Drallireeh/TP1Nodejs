const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());

require('./handlers/userRoutes')(app);
require('./handlers/roleRoutes')(app);
app.listen(3000);