// routes database
// tệp cấu hình định tuyến (routing)
import express from 'express';
import { getPosts, createPost,updatePost } from '../controllers/posts.js';
// import getPosts from '../controllers/posts.js';

const router = express.Router();

// dinh tuyen dia chi goc + '/', nhu localhost:5000/
router.get('/', getPosts);
router.post('/', createPost);
// update
router.patch('/:id', updatePost);

export default router;