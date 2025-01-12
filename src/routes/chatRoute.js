const router = require('express').Router()
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/',authMiddleware, chatController.findAllMessages)
router.get('/notifications', authMiddleware, chatController.findAllNotifications)
router.delete('/clearNotifications', authMiddleware, chatController.clearNotifications)



module.exports = router
