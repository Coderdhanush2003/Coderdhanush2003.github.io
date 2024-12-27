const express = require('express');
const app = express();

const dotenv = require('dotenv')

dotenv.config()

const mongoose = require('mongoose')
const URI = process.env.MONGO_URL

const cors = require('cors');



const user = require('./routes/user')
const cart = require('./routes/cart')
const favourite = require('./routes/Favourite')

PORT = process.env.PORT || 2500;

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use('/',user)
app.use('/',cart)
app.use('/',favourite)


async function start(){
    try {
       if(await mongoose.connect(URI)){
        app.listen(PORT,()=>{
            console.log("Database Connected Successfully")
            console.log("Server is Running")
        })  
       }
    } catch (error) {
        console.log(error)
    }
}
start()
