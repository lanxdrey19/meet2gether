const express= require('express');
const router = express.Router();
const Member = require('../models/Member');



router.get('/',(req,res) => {
    res.send('on member');
   });

router.post('/',(req,res) => {
    const member = new Member({
        name: req.body.name,
        events: req.body.events 
    });
    member.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });

});

module.exports = router;


