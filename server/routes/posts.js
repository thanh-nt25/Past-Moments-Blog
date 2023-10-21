// routes database
// tệp cấu hình định tuyến (routing)
import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
// import getPosts from '../controllers/posts.js';

const router = express.Router();

// dinh tuyen dia chi goc + '/', nhu localhost:5000/
router.get('/', getPosts);
router.post('/', createPost);

export default router;