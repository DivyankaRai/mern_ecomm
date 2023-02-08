const product = require('../models/productSchema')

exports.postProduct = async  (req,res)=> {
    
    const {name,description,price,rating,images,category,stock}=req.body

        try {
            const data = new product({name,description,price,rating,images,category,stock})
            await data.save()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }


}

exports.getProducts = (req,res)=> {
    res.status(200).json({message:"route is working"})
}