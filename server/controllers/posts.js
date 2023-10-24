// handle for routes
// giam thieu code tai routes di, xu ly tai day
import express from 'express';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { OAuth2Client } from 'google-auth-library';

import PostMessage from '../models/postMessage.js';
// import user from '../models/user.js';
// dotenv.config();
const router = express.Router();


export const getPosts = async (req, res) => {
    const { page } = req.query;
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        // this is async action because find() take time
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
    }catch(error){
        res.status(404).json({ message: error.message}); 
    }
};

export const getPostsBySearch = async(req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message}); 
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    // const post = req.body;
    // check valid id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    // const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, {new: true});

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

//delete
export const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post delete Successfully'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({ message: 'Unable to do it!' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);
}

export default router;

//auth
// app.post('/auth/google', 
// export const acctoken = async (req, res) => {
//     // auth
//     const oAuth2Client = new OAuth2Client(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         'postmessage',
//     );

//     const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//     console.log(tokens);
    
//     res.json(tokens);
// };
// app.post('/auth/google/refresh-token', 
// export const reftoken = async (req, res) => {

//     const oAuth2Client = new OAuth2Client(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         'postmessage',
//     );

//     const user = new UserRefreshClient(
//         clientId,
//         clientSecret,
//         req.body.refreshToken,
//     );
//     const { credentials } = await user.refreshAccessToken(); // optain new tokens
//     res.json(credentials);
// };
// export default getPosts;