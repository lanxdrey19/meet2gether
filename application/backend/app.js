const express= require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const organisationRoute = require('./routes/Organisation');

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('connected')
});

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use('/organisation',organisationRoute);

app.listen(3001);
