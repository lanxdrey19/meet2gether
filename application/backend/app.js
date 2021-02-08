const express= require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const memberRoute = require('./routes/Members');
const organisationRoute = require('./routes/Organisation');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/member', memberRoute);
app.use('/organisation',organisationRoute);

/*
app.get('/',(req,res) => {
 res.send('on home');
});

app.get('/posts',(req,res) => {
    res.send('on posts');
   });
   */

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() => {
    console.log('connected')
})

app.listen(3000);
