const mongoose = require('mongoose')
// const DB = process.env.DATABASE
mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://divyanka:diviirai@mern.e7scgpt.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("db connected")).catch((er)=>console.log(er))