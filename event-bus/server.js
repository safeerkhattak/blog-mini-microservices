import express from "express";
import axios from "axios";

const app = express()
app.use(express.json())


app.post('/events',(req,res)=>{
    const event = req.body;
    //echoing event to all services
    try {
        
        axios.post('http://localhost:4000/events',event);
        axios.post('http://localhost:4001/events',event);
        axios.post('http://localhost:4002/events',event);
    
        res.send({status:'OK'})
    } catch (error) {
        console.log("error in event buss",error)
    }
})



app.listen(4005,()=>{
    console.log("event bus running on 4005")
})