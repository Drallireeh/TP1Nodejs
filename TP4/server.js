const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());

require('./routes')(app);
require('./handlers/users')(app);
app.listen(3000);