const express = require('express');
const router = express();

const { signIn, signUp, logout, fileUpload, getUserData, editProfile, isAuthenticated, createPost, getUserPosts, getPostData, deletePost, getAllPosts, checkUserAuthenticate, savePost, discardSavePost, getSavedPost } = require('../controller/user.js');

/* users router. */
router.post('/signup', signUp);
router.post('/login', checkUserAuthenticate, signIn);
router.get('/userdata', isAuthenticated, getUserData)
router.get('/logout',isAuthenticated, logout);
// router.post('/fileupload', isAuthenticated, upload.single("profileImage"), fileUpload);
router.post('/fileupload', isAuthenticated, fileUpload);
router.put('/editProfile', isAuthenticated, editProfile);
// router.post('/createPost', isAuthenticated, upload.single("postImg"), createPost);
router.post('/createPost', isAuthenticated, createPost);
router.post('/savePost', isAuthenticated, savePost);
router.post('/deSavePost', isAuthenticated, discardSavePost);
router.get('/getPosts', isAuthenticated, getUserPosts);
router.get('/getSavedPosts', isAuthenticated, getSavedPost);
router.delete('/deletePost/:cardid', isAuthenticated, deletePost);
router.get('/getPost/:cardid', isAuthenticated, getPostData);
router.get('/getAllPosts', isAuthenticated, getAllPosts);

module.exports = router;