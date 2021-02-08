const express= require('express');
const router = express.Router();
const Member = require('../models/Member');
const UserEvent = require('../models/UserEvent');


router.get('/:id',async (req,res) => {
    try {
        const member= await Member.findById(req.params.id);
    res.status(200).json(member);
    } catch (err) {
        res.status(400).json({message: err});
    }

   });

router.get('/',async (req,res) => {
    try {
        const members= await Member.find();
    res.status(200).json(members);
    } catch (err) {

        res.status(400).json({message: err});
   
    }

   });

router.post('/new',async (req,res) => {
    
    //const length = req.body.events.length;
    var allEvents = [];
    

    const member = new Member({
        name: req.body.name,
        events: allEvents
    });
    try {

    const members= await Member.find();
    for (var i = 0;i< members.length ;i++) {

        if (members[i].name === req.body.name) {
            throw new Error('Name already exists');
        }
    /*
        allEvents.push(new UserEvent ({
            title: req.body.events[i].title,
            startTime: req.body.events[i].startTime,
            endTime: req.body.events[i].endTime }));
            */
    }
        const savedMember = await member.save();
        res.status(200).json(savedMember);
    } catch (err) {
        res.status(400).json({message: err});
    }

});

module.exports = router;


