const mongoose = require('mongoose');


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


module.exports = mongoose.model('OrgEvent',orgEventSchema);