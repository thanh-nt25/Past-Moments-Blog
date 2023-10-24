import express from 'express';
import { getPosts, getPost, getPostsBySearch, createPost,updatePost, deletePost, likePost } from '../controllers/posts.js';
const router = express.Router();
import auth from '../middleware/auth.js';

// dinh tuyen dia chi goc + '/', nhu localhost:5000/
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth,  updatePost);
router.delete('/:id', auth, deletePost); 
router.patch('/:id/likePost', auth, likePost);

export default router;