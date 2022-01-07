const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());

require('./handlers/userRoutes')(app);
require('./handlers/roleRoutes')(app);
require('./handlers/postRoutes')(app);
require('./handlers/commentRoutes')(app);
app.listen(3000);