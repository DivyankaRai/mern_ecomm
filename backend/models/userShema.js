const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }
    else{
        this.password = await bcrypt.hash(this.password,10)
    }
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function(epassword){
    return await bcrypt.compare(epassword, this.password)
}

const users = new mongoose.model('ecom_user', userSchema)
module.exports = users