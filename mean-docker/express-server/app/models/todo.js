var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Todo', {
    name: {
        type:String,
        default:""
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
