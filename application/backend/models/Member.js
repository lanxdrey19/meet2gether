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
        required:true,
        minlength: 4,
         maxlength: 255
    
    },
    events: [EventSchema]

});



module.exports = mongoose.model('Member',MemberSchema);