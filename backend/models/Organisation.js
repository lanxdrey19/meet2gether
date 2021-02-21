const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    start: {
        type:String,
        required:true
    },
    end: {
        type:String,
        required:true
    },
    backgroundColor: {
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
    start: {
        type:String,
        required:true
    },
    end: {
        type:String,
        required:true
    },
    backgroundColor: {
        type:String,
        default:"#009CBD"
    },
    outlineColor: {
        type:String,
        default:"#009CBD"
    }

});


const OrgSchema = mongoose.Schema({
    orgEvents: [orgEventSchema],
    members: [MemberSchema]

});


module.exports = mongoose.model('Organisation',OrgSchema);