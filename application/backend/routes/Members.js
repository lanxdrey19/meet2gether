const express= require('express');
const router = express.Router();
const Member = require('../models/Member');
const UserEvent = require('../models/UserEvent');



router.get('/allmembers',async (req,res) => {
    try {
        const members= await Member.find();
    res.status(200).json(members);
    } catch (err) {
        res.status(400).json({message: err});
    }

   });

router.post('/newuser',async (req,res) => {
    
    //const length = req.body.events.length;
    var allEvents = [];
    /*
    for (var i = 0;i< length ;i++) {

        allEvents.push(new UserEvent ({
            title: req.body.events[i].title,
            startTime: req.body.events[i].startTime,
            endTime: req.body.events[i].endTime }));
    }
*/
    const member = new Member({
        name: req.body.name,
        events: allEvents
    });
    try {
        const savedMember = await member.save();
        res.status(200).json(savedMember);
    } catch (err) {
        res.status(400).json({message: err});
    }

});

module.exports = router;


