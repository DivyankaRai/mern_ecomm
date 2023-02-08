const express = require('express')
const router = require('./routes/router')
require('./db/db')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(8000,()=>{
    console.log("server started")
})
