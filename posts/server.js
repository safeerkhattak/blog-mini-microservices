import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios"

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;

  const id = randomBytes(4).toString("hex");

  const post = {
    id,
    title,
  };

  posts[id] = post;
  try {
    
    await axios.post('http://localhost:4005/events',{
      type:'PostCreated',
      data:{
        id,title
      }
    })
  
    res.status(201).send(posts[id]);
  } catch (error) {
    console.log("error in post",error)
  }

});

app.post("/events",(req,res)=>{
// console.log("recieved",req?.body?.type)
res.send("got it from post")
})


app.listen(4000, () => {
  console.log("PORT 4000");
});