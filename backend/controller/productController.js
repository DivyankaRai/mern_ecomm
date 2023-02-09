const product = require('../models/productSchema')
class ApiQuery{
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }
}

//  post Product (Admin Only)
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

//  get Product
exports.getProducts = async(req,res)=> {

    // const search = req.query.search || ""
    const category = req.query.category || ""
    const sort = req.query.sort || ""

    const query = {
        // name:{
        //     $regex:search, $options:"i"
        // }
    }
    if(category !== "All"){
        query.category = category
    }


    try {
        const data = await product.find()
        // (query).sort({price:sort === "desc" ? -1 : 1})
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
    console.log("giiii")
}

//  update Product (Admin Only)
exports.updateProduct = async(req,res)=> {

    const {id} = req.params
    console.log(id)
    const {name,description,price,rating,images,category,stock}=req.body
    
    try {
        const updateData = await product.findByIdAndUpdate({_id:id},{
            name,description,price,rating,images,category,stock
        },{
            new:true
        })
        await updateData.save
        res.status(200).json(updateData)
    } catch (error) {
        console.log(error)
    }
}

//  update Product (Admin Only)
exports.deleteProduct = async(req,res) => {

    const {id} = req.params 

    try {
        await product.findByIdAndDelete({_id:id})
        res.status(200).json("sucessfully deleted")
    } catch (error) {
        console.log(error)
    }

}