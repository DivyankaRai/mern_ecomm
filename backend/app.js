import express from "express";
import cors from "cors"
import data from "./data.js";
const app = express()
app.use(cors())

app.get('/products',(req,res)=>{
    res.send(data)
})

app.listen(8000,()=>{
    console.log("server started")
})