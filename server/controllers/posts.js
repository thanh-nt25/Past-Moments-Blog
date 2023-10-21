// handle for routes
// giam thieu code tai routes di, xu ly tai day

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try{
        // this is async action because find() take time
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    }catch(error){
        res.status(404).json({ message: error.message}); 
    }
};

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message}); 
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

    // await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


// export default getPosts;