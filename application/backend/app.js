const express= require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use('/posts', () => {
    console.log("hello");
});

app.get('/',(req,res) => {
 res.send('on home');
});

app.get('/posts',(req,res) => {
    res.send('on posts');
   });

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() => {
    console.log('connected')
})

app.listen(3000);
