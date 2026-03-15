import express from "express"
import axios from "axios"

const app = express()
app.use(express.json())


app.post("/events",async( req,res)=>{
    const {type,data} = req.body
    console.log("data in moderation event ",data )
    if(type === "CommentCreated"){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        try {
            
            await axios.post('http://localhost:4005/events',{
                type:'CommentModerated',
                data:{
                    id:data.id,
                    postId:data.postId,
                    status,
                    content:data.content
                }
            })
        } catch (error) {
            console.log("error ib moderation")
        }
    }

})


app.listen(4003,()=>{
    console.log("moderation is listening on 4003")
})