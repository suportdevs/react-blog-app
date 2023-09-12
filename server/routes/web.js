// external imports
const router = require('express').Router();

// internal imports
const {getPost, postStore, postUpdate, postDelete, getSinglePost} = require("../controllers/PostController");
const { getCategory, storeCategory, categoryDelete } = require('../controllers/CategoryController');
const { getTag, storeTag, TagDelete } = require('../controllers/TagController');
const upload = require('../utilies/imageUpload');
const AuthenticatedMiddleware = require('../middleware/AuthenticatedMiddleware');

router.get('/category', getCategory);
router.post('/category', AuthenticatedMiddleware, upload.single('image'), storeCategory);
router.delete('/category/:id', categoryDelete);

router.get('/tag', getTag);
router.post('/tag', storeTag);
router.delete('/tag/:id', TagDelete);

router.get('/post', getPost)
router.get('/post/:id', getSinglePost)
router.post('/post', AuthenticatedMiddleware, upload.single('image'), postStore)
router.put('/post/:id', AuthenticatedMiddleware, upload.single('image'), postUpdate)
router.delete('/post/:id', postDelete)

module.exports = router;