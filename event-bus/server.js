import express from "express";
import axios from "axios";

const app = express()
app.use(express.json())

const events = []

app.post('/events',async (req,res)=>{
    const event = req.body;
    events.push(event)
    //echoing event to all services
     try {
    await axios.post('http://posts-clusterip-srv:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);
    await axios.post('http://query-srv:4002/events', event);
    await axios.post('http://moderation-srv:4003/events', event);

    res.send({ status: 'OK' });
  } catch (error) {
    console.log("error in event bus", error);
    res.status(500).send({ error: "Failed to deliver event2" });
  }
})

app.get('/events',(req,res)=>{
    res.send(events)

})



app.listen(4005,()=>{
  console.log("VERSION 2 RUNNING");
    console.log("event bus running on 4005")
})