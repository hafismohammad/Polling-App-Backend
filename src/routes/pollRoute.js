const router = require('express').Router()
const pollController = require('../controllers/pollController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, pollController.createPoll)
router.get('/', authMiddleware, pollController.getAllPolls)
router.post('/:id', authMiddleware, pollController.addVote)
router.delete('/:id', authMiddleware, pollController.deletePoll)


module.exports = router

