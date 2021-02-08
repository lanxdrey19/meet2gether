const express= require('express');
const router = express.Router();
const Organisation = require('../models/Organisation');
const OrgEvent = require('../models/OrgEvent');
const Member = require('../models/Member');
const UserEvent = require('../models/UserEvent');



router.get('/',async (req,res) => {
    try {
        const organisations = await Organisation.find();
    res.status(200).json(organisations);
    } catch (err) {
        res.status(400).json({message: err});
    }

   });

router.post('/new',async (req,res) => {
    
    var emptyArray = [];


    const organisation = new Organisation({
        orgEvents: emptyArray,
        members: emptyArray
    });
try {
    const savedOrg = await organisation.save();
    res.status(200).json(savedOrg);
} catch (err) {
    res.status(400).json({message: err});

}
});

router.patch('/addmember/:id',async(req,res) => {

    

    try {
        const newMember= await Member.findById(req.params.id);
        const organisation = await Organisation.updateOne(
            {_id: req.body._id},
            {$addToSet: {members: newMember} });
        res.status(200).json(organisation);
    } catch (err) {
        res.status(400).json({message: err});
    }


});

router.patch('/deletemember/:id',async(req,res) => {


    try {
        
        const tempOrganisation= await Organisation.findById(req.body._id);
        var newMembers = []
        var allMembers = tempOrganisation.members;
        const memberLength = allMembers.length;
        var didDelete = false;
        for(var i = 0;i < memberLength ; i++) {

                if (allMembers[i]._id.toString() === req.params.id.toString()) {

                    didDelete = true;
                } else {
                    newMembers.push(allMembers[i]);
                }

        }

        if (!didDelete) {
            throw new Error('could not find member');
        }
        

        const organisation = await Organisation.updateOne(
            {_id: req.body._id},
            {$set: {members: newMembers} });
        res.status(200).json(organisation);
    } catch (err) {
        res.status(400).json({message: err});
    }


});

module.exports = router;


