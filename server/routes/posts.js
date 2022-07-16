import express from "express";
import {commentPost, getPost, getPostBySearch, getposts, createPost, updatePost, deletePost, likePost  } from "../controllers/posts.js";
import auth from "../Middleware/auth.js";
const router = express.Router();

router.get('/search', getPostBySearch );
router.get('/', getposts );
router.get('/:id', getPost)
router.post('/', auth, createPost );
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)


export default router;
