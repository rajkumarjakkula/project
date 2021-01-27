const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model('Post')
router.get('/adminposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(Posts=>{
        res.json({Posts})
    })
    .catch(err=>{
        res.json(err)
    })
})

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(Posts=>{
        res.json({Posts:Posts})
    })
    .catch(err=>{
        res.json(err)
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body
    console.log(req.body)
    if(!title || !body || !pic){
        return res.status(422).json({error:"please fill all the fields"})
    }
    const post = new Post({
        title,
        photo:pic,
        body,
        time:new Date().getTime(),
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router