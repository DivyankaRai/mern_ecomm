const users = require('../models/userShema')

// register 
exports.registerUser = async(req,res)=>{
    const file = req.file.filename;
    const {name,email,password}=req.body 

    try {
        const peruser = await users.findOne({email:email})
        if(peruser){
         res.status(401).json("User already exists")
        }
        else{
         const userData = new users({
             name,email,password,profile:file
         })
         await userData.save()
         const token = userData.getJWTToken()
         res.status(200).json(token)
         console.log(token)
        }
     } catch (error) {
         console.log(error)
     }
}

//  Login User
exports.loginUser = async(req,res)=>{
    const {email,password}=req.body 
    console.log(email)

    const user = await users.findOne({email})

    if(!user){
        res.status(401).json("User doesn't exists here")
    }
    else{
        const passwordMatch = await user.comparePassword(password)

        if(!passwordMatch){
            res.status(401).json("User doesn't exists")
        }

        const token = user.getJWTToken()
        res.status(200).json(token)
        console.log(token)

    }
}