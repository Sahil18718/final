const express=require("express")
const { PostModel } = require("../models/post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{

    const post=await PostModel.find()
    res.status(200).send(post)
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const post=new PostModel(payload)
    await post.save()
    res.status(200).send(" post has been created")
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const{postID}=req.params
    const payload=req.body
    try {
        await PostModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send("Updated")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params
    try {
        await PostModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
   
})

module.exports={
    postRouter
}