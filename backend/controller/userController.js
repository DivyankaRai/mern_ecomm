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
         res.status(200).json(userData)
         console.log(userData)
        }
     } catch (error) {
         console.log(error)
     }

}