const express = require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const DbConnection=require("./utils/db")
const UserRoutes=require("./routes/UserRoutes")
const MovieRoutes=require('./routes/MovieRoutes')

dotenv.config()

const app= express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())


const PORT=process.env.PORT || 9090

app.get("/health-check", (req,res)=>{
    res.status(200).json({message: "API is running....", status: "success"})
})

app.use("/api/v1", UserRoutes);
app.use("/api/v1", MovieRoutes);

app.listen(PORT,(req,res)=>{
    console.log(`server listen at ${PORT}`)
})
