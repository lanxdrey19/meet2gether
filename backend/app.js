const express= require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001
require('dotenv/config');

const organisationRoute = require('./routes/Organisation');

mongoose.connect( process.env.MONGODB_URI || process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log('connected')
});

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use('/organisation',organisationRoute);

if (process.env.NODE_ENV === 'production' ) {

    app.use(express.static('../application/build'));

}

app.listen(PORT , console.log(`Server is starting at ${PORT}`));