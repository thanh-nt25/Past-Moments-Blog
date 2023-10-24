import express from 'express';
import { getPosts, getPostsBySearch, createPost,updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// dinh tuyen dia chi goc + '/', nhu localhost:5000/
router.get('/', getPosts);
router.get('/search', getPostsBySearch)
router.post('/', auth, createPost);
router.patch('/:id', auth,  updatePost);
router.delete('/:id', auth, deletePost); 
router.patch('/:id/likePost', auth, likePost);

export default router;