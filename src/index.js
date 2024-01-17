import dotenv from 'dotenv';
dotenv.config({ path: './env' });
import connectDB from "./db/db.js";
dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })

    app.on("error", (error)=>{
        console.log("ERROR: ", error)
        throw error
    })
})
.catch((err) => {
    console.log('MongoDB connection falied.')
})










// import express from 'express';
// const { Express } = express;

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

/*

(async ()=>{
try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error)=>{
        console.log("ERROR: ", error)
        throw error
    })

    app.listen(process.env.PORT, ()=> {
        console.log(`App is listening to port ${process.env.PORT}`);
    })

}catch(error){
    console.log("ERROR: ", error)
    throw error
}
})()

*/