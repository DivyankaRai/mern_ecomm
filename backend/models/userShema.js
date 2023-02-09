const mongoose = require('mongoose')

const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail]
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    }
})

const users = new mongoose.model('ecom_user', userSchema)
module.exports = users