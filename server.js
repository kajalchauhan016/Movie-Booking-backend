const express = require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const DbConnection=require("./utils/db")

dotenv.config()

const app= express()
app.use(express.json())

app.use(cors())

const PORT=process.env.PORT || 5050

app.listen(PORT,(req,res)=>{
    console.log(`server listen at ${PORT}`)
})
