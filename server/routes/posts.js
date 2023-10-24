// routes database
// tệp cấu hình định tuyến (routing)
import express from 'express';
import { getPosts, createPost,updatePost, deletePost, likePost } from '../controllers/posts.js';
// import { acctoken, reftoken } from '../controllers/posts.js';
// import getPosts from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// dinh tuyen dia chi goc + '/', nhu localhost:5000/
router.get('/', getPosts);
router.post('/', auth, createPost);
// update
router.patch('/:id', auth,  updatePost);
router.delete('/:id', auth, deletePost); 
router.patch('/:id/likePost', auth, likePost);
// auth
// router.post('/auth/google', acctoken);
// router.post('/auth/google/refresh-token', reftoken);

export default router;