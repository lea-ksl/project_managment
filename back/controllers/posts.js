
const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
     
        req.io.emit('UPDATE', posts);
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const post = new Post(req.body)
        const savedPost = post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

module.exports = postsRouter;