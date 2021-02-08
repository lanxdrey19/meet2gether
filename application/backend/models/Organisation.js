const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    startTime: {
        type:String,
        required:true
    },
    endTime: {
        type:String,
        required:true
    },
    backGroundColor: {
        type:String,
        default:"#5300AF"
    },
    outlineColor: {
        type:String,
        default:"#5300AF"
    }
});

const MemberSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    events: [EventSchema]

});

const orgEventSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    startTime: {
        type:String,
        required:true
    },
    endTime: {
        type:String,
        required:true
    },
    backGroundColor: {
        type:String,
        required:true
    },
    outlineColor: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    unavailableMembers: [MemberSchema]

});


const OrgSchema = mongoose.Schema({
    orgEvents: [orgEventSchema],
    members: [MemberSchema]

});


module.exports = mongoose.model('OrgEvent',OrgSchema);