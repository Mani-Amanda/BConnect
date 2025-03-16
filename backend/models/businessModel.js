const mongoose = require('mongoose');

const businessSchema =new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum: ['resturant', 'salon','supermarket','healthcare','education','other'],
        default: 'other',
    },
    description:{
        type: String,
    },
    city:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },

});

module.exports=mongoose.model('business',businessSchema);