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

router.get('/getuserbyname/:orgId',async (req,res) => {
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
/*
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
*/

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

/*

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

*/

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
                startTime: req.body.startTime,
                endTime: req.body.endTime,
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
        startTime: req.body.startTime,
        endTime: req.body.endTime,
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
                        
                        memberEventStartTime = memberEvents[j].startTime;
                        memberEventEndTime = memberEvents[j].endTime;
                        
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

        if ( (existingOrgEvents[k].startTime.toString().toLowerCase().trim() === memberEventStartTime.toString().toLowerCase().trim() ) 
        
        &&  (existingOrgEvents[k].endTime.toString().toLowerCase().trim() === memberEventEndTime.toString().toLowerCase().trim() ) 
        
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

        
       //res.status(200).status(tempOrganisation);
    } catch (err) {
        res.status(400).json({message: err});
    }


});
/*

router.patch('/addorgvent/:id',async(req,res) => {

    var emptyArray = [];

    try {
            
    const newEvent =  new OrgEvent ({
                title: req.body.events[0].title,
                startTime: req.body.events[0].startTime,
                endTime: req.body.events[0].endTime,
                backgroundColor: req.body.events[0].backgroundColor ,
                outlineColor: req.body.events[0].outlineColor,
                description: req.body.events[0].description,
                unavailableMembers: emptyArray
    });


        const organisation = await Organisation.updateOne(
            {_id: req.params.id},
            {$addToSet: {orgEvents: newEvent} });
        res.status(200).json(organisation);
    } catch (err) {
        res.status(400).json({message: err});
    }


});

router.patch('/deleteorgvent/:id',async(req,res) => {

   
try {
        
    const tempOrganisation= await Organisation.findById(req.body._id);
    var newEvents = []
    var allEvents = tempOrganisation.orgEvents;
    const eventsLength = allEvents.length;
    var didDelete = false;
    for(var i = 0;i < eventsLength ; i++) {

            if (allEvents[i]._id.toString() === req.params.id.toString()) {

                didDelete = true;
            } else {
                newEvents.push(allEvents[i]);
            }

    }

    if (!didDelete) {
        throw new Error('could not find event');
    }
    

    const organisation = await Organisation.updateOne(
        {_id: req.body._id},
        {$set: {orgEvents: newEvents} });
    res.status(200).json(organisation);
} catch (err) {
    res.status(400).json({message: err});
}


});
*/

module.exports = router;


