
const router = require('express').Router();

// internal imports
const {register, login, getUser, updateUser, deleteUser} = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
