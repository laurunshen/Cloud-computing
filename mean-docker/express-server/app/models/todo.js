var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        default: ''
    },

    value: {
        type: String,
        default: ''
    },
    account:{
        type:String,
        default:""
    },
    password:{
        type:String,
        default:""
    }
});
