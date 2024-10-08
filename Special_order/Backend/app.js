const express=require("express");
const mongoose=require("mongoose");

const app=express();
const cors=require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Mohamedarshad:arshad123@atlascluster.d1qd0xc.mongodb.net/notes_db?retryWrites=true&w=majority&appName=AtlasCluster")
.then(()=>console.log("connected to mongodb"))
.then(()=> {
    app.listen(5000);
})
//After successfully connecting to the database, it starts listening for incoming HTTP requests on port 5000. It seems that app is an Express.js application instance.
.catch((err)=> console.log((err)))
//If there is an error during the connection process, it catches the error and logs it to the console.
