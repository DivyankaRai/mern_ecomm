import express from "express";
import cors from "cors"
import data from "./data.js";
const app = express()
app.use(cors())

app.get('/products',(req,res)=>{
    res.send(data)
})

app.get(`/products/:id`,(req,res)=>{
    const {id} = req.params.id
    console.log(id)
    const product = data.produts.find((e)=>{
        return (
            e.id === 2
        )
    })
    console.log(product)
    if(product){
        res.send(product)
    }
    else{
        res.send("not pro")
    }
    // console.log(data)
    // res.send(product)
})

app.listen(8000,()=>{
    console.log("server started")
})