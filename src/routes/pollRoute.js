const router = require('express').Router()
const pollController = require('../controllers/pollController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, pollController.createPoll)
router.get('/', authMiddleware, pollController.fetchPolls)
router.post('/:id', authMiddleware, pollController.addVoteToPoll)
router.delete('/:id', authMiddleware, pollController.deletePoll)
router.put('/:id', authMiddleware, pollController.updateVote)
router.get('/voted-user-list/:poll_id', authMiddleware, pollController.votedUserList)


module.exports = router

