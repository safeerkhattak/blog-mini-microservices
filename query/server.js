import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[data.id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
     const post = posts[postId]; 
    post.comments.push({id,content})


  }
  console.log("posts in query service",posts)
  res.send({})
});

app.listen(4002, () => {
  console.log("query server listening on 4002");
});
