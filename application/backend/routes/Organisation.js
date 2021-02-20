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

router.post('/getuserbyname/:orgId',async (req,res) => {
    try{
      
    
        const tempOrganisation= await Organisation.findById(req.params.orgId);
        var existingMembers = tempOrganisation.members;
        const memberLength = existingMembers.length;
        var didGet = false;
        var finalMember;
        
        for(var i = 0;i < memberLength ; i++) {
    
            if (existingMembers[i].name.toString().toLowerCase().trim() === req.body.name.toString().toLowerCase().trim() && !didGet ) {
    
                
                var finalMember = existingMembers[i];
                didGet = true;
            
            } 
    
        }



        if (!didGet) {
            throw new Error('Could not find the member');
        }

        res.status(200).json(finalMember);
    
       
        }catch (err) {
        res.status(400).json({message:err});
        }
            
    });

router.patch('/changename/:orgId',async (req,res) => {
try {
    var tempMembersArray = [];

    const tempOrganisation= await Organisation.findById(req.params.orgId);
    var existingMembers = tempOrganisation.members;
    const memberLength = existingMembers.length;
    var didChange = false;
    
    for(var i = 0;i < memberLength ; i++) {

        if (existingMembers[i]._id.toString().toLowerCase().trim() === req.body.memberId.toString().toLowerCase().trim() && !didChange) {

            didChange = true;
            existingMembers[i].name = req.body.name;
        
        } 

        tempMembersArray.push(existingMembers[i]);

    }

    if (!didChange) {

        throw new Error('Could not find the member');

    }

    const organisation = await Organisation.updateOne(
        {_id: req.params.orgId},
        {$set: {members: tempMembersArray} });
        res.status(200).json(organisation);
    }catch (err) {
    res.status(400).json({message:err});
}
        
});


router.patch('/addmember/:orgId',async(req,res) => {

    try {

        const tempOrganisation= await Organisation.findById(req.params.orgId);
        var existingMembers = tempOrganisation.members;
        const memberLength = existingMembers.length;
        for(var i = 0;i < memberLength ; i++) {

                if (existingMembers[i].name.toString().toLowerCase().trim() === req.body.name.toString().toLowerCase().trim()) {
                    throw new Error('The user: ' + req.body.name + ' already exists...');
                }

        }
        
        
    var allEvents = [];
    const member = new Member({
        name: req.body.name.toString().toLowerCase().trim(),
        events: allEvents
    });
    const organisation = await Organisation.updateOne(
        {_id: req.params.orgId},
        {$addToSet: {members: member} });
    res.status(200).json(organisation);
    } catch (err) {
        res.status(400).json({message:err});
    }

});



router.patch('/deletemember/:memberId',async(req,res) => {


    try {
        
        const tempOrganisation= await Organisation.findById(req.body._id);
        var newMembers = []
        var allMembers = tempOrganisation.members;
        const memberLength = allMembers.length;
        var didDelete = false;
        for(var i = 0;i < memberLength ; i++) {

                if (allMembers[i]._id.toString().toLowerCase().trim() === req.params.memberId.toString().toLowerCase().trim()) {

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

router.patch('/addevent/:orgId',async(req,res) => {

    var tempMembersArray = [];
    var memberName;


    try {

    const tempOrganisation= await Organisation.findById(req.params.orgId);

            
    const newEvent =  new UserEvent ({
                title: req.body.title,
                start: req.body.start,
                end: req.body.end,
    });

    

    
    var tempEventsArray = tempOrganisation.orgEvents;

    


    var existingMembers = tempOrganisation.members;
    const memberLength = existingMembers.length;
    
    for(var i = 0;i < memberLength ; i++) {

            if (existingMembers[i]._id.toString().toLowerCase().trim() === req.body.memberId.toString().toLowerCase().trim()) {
                existingMembers[i].events.push(newEvent);
                memberName = existingMembers[i].name;
            }

            tempMembersArray.push(existingMembers[i]);

    }
    
    const newOrgEvent =  new OrgEvent ({
        title: memberName,
        start: req.body.start,
        end: req.body.end,
    });

    tempEventsArray.push(newOrgEvent);


        const organisation = await Organisation.updateOne(
            {_id: req.params.orgId},
            {$set: {members: tempMembersArray,orgEvents: tempEventsArray} }
            );


        res.status(200).json(organisation);
        
    } catch (err) {
        res.status(400).json({message: err});
    }


});

router.patch('/deleteevent/:orgId',async(req,res) => {

    var tempOrgEventsArray = [];
    var tempEventsArray = [];
    var tempMembersArray = [];

    try {
        

    const tempOrganisation= await Organisation.findById(req.params.orgId);
    var existingOrgEvents = tempOrganisation.orgEvents;
    var existingOrgEventsLength = existingOrgEvents.length;
    var existingMembers = tempOrganisation.members;
    var memberEventStartTime;
    var memberEventEndTime;
    const memberLength = existingMembers.length;
    
    for(var i = 0;i < memberLength ; i++) {

            if (existingMembers[i]._id.toString().toLowerCase().trim() === req.body.memberId.toString().toLowerCase().trim()) {

                var memberEvents = existingMembers[i].events;
                const memberEventsLength = memberEvents.length;

                var didDelete = false;

                
                for(var j = 0;j < memberEventsLength ; j++) {

                    if (memberEvents[j]._id.toString().toLowerCase().trim() === req.body.memberEventId.toString().toLowerCase().trim() && !didDelete) {

                        didDelete = true;
                        
                        memberEventStartTime = memberEvents[j].start;
                        memberEventEndTime = memberEvents[j].end;
                        
                    } else {

                        tempEventsArray.push(memberEvents[j]);

                    }

                }

                if (!didDelete) {
                    throw new Error('could not find member event');
                }

                existingMembers[i].events = tempEventsArray;
                
                

            }

            tempMembersArray.push(existingMembers[i]);

    }
    

    var didDelete2 = false;

    for (var k = 0 ; k < existingOrgEventsLength ; k++ ) {

        if ( (existingOrgEvents[k].start.toString().toLowerCase().trim() === memberEventStartTime.toString().toLowerCase().trim() ) 
        
        &&  (existingOrgEvents[k].end.toString().toLowerCase().trim() === memberEventEndTime.toString().toLowerCase().trim() ) 
        
        && !didDelete2 ) {

            didDelete2 = true;

        } else {

            tempOrgEventsArray.push(existingOrgEvents[k]);

        }

    }

    if (!didDelete2) {
        throw new Error('could not find organisation event');
    }


    
        
        const organisation = await Organisation.updateOne(
            {_id: req.params.orgId},
            {$set: {members: tempMembersArray, orgEvents: tempOrgEventsArray} });
        res.status(200).json(organisation);

    
    } catch (err) {
        res.status(400).json({message: err});
    }


});

module.exports = router;


