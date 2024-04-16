require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose') 



// connect to db
mongoose.connect(process.env.MongoURI)
    .then(()=>{console.log("connected to database")})
    .catch((error)=>{
        console.log(error)
    })
// express app
const app = express()


// listnening on local host
app.listen(4000,()=>{
    console.log("welcome")
})

app.get('/home' , (req,res)=>{
    res.send("welcome  to visita")
})

