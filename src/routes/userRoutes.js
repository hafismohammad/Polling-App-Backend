const router = require('express').Router(); 
const userController= require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.signUpUser)
router.post('/login', userController.loginUser)
router.get('/', authMiddleware ,userController.getUser)

module.exports = router

