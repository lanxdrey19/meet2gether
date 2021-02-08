const express= require('express');
const router = express.Router();
const Member = require('../models/Member');



router.get('/',(req,res) => {
    res.send('on member');
   });

router.post('/',(req,res) => {
    console.log(req.body);
   });

module.exports = router


