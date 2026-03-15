import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(comments[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  console.log("post id", postId);
  const id = randomBytes(4).toString("hex");
  const comment = {
    id,
    content,
    status: "pending",
  };
  const postComments = comments[postId] || [];
  console.log("post comments", postComments);
  postComments.push(comment);
  comments[postId] = postComments;
  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id,
        content,
        postId,
        status: "pending",
      },
    });

    res.status(201).send(comments[postId]);
  } catch (error) {
    console.log("error in comment", error);
  }
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const postComments = comments[data.postId];
    const comment = postComments.find((comment) => comment.id === data.id);
    comment.status = data.status;

    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          ...data,
        },
      });
    } catch (error) {}
  }

  res.send("got it from post");
});

app.listen(4001, () => {
  console.log("PORT 4001");
});
