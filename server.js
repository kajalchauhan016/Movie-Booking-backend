const express = require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const DbConnection=require("./utils/db")
const UserRoutes=require("./routes/UserRoutes")
const MovieRoutes=require('./routes/MovieRoutes')

dotenv.config()

const app= express()
app.use(express.json())

app.use(cors())

const PORT=process.env.PORT || 5050

app.use("/api/v1",UserRoutes,MovieRoutes)


app.listen(PORT,(req,res)=>{
    console.log(`server listen at ${PORT}`)
})
