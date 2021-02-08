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

module.exports = mongoose.model('UserEvent',EventSchema);