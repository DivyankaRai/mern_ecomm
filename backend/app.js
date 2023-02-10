const express = require('express')
const router = require('./routes/router')
const cors = require('cors')
const dotenv = require('dotenv')
require('./db/db')

const app = express()
dotenv.config({path:".env"})

app.use(express.json())
app.use(cors())
app.use(router)


app.listen(8000,()=>{
    console.log("server started")
})
