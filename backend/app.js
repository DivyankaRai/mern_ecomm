import express from "express";
import cors from "cors"
import data from "./data.js";
const app = express()
app.use(cors())


app.listen(8000,()=>{
    console.log("server started")
})