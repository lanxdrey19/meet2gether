const express= require('express');
const router = express.Router();
const Organisation = require('../models/Organisation');



router.get('/',(req,res) => {
    res.send('on org');
   });

   router.post('/',(req,res) => {
    console.log(request.body);
   });

module.exports = router

