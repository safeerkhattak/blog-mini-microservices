import express from "express";
import axios from "axios";

const app = express()
app.use(express.json())


app.post('/events',async (req,res)=>{
    const event = req.body;
    //echoing event to all services
     try {
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
  } catch (error) {
    console.log("error in event bus", error.message);
    res.status(500).send({ error: "Failed to deliver event" });
  }
})



app.listen(4005,()=>{
    console.log("event bus running on 4005")
})