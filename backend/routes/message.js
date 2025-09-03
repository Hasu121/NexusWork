const express = require('express')
const router = express.Router()
const Authentication = require('../authentication/auth')
const MessageController = require('../controller/message')

router.post('/', Authentication.auth, MessageController.sendMessage)
router.get('/:conversationId', Authentication.auth, MessageController.getMessage)
router.put('/:id', Authentication.auth, MessageController.editMessage)
router.delete('/:id', Authentication.auth, MessageController.deleteMessage)

module.exports = router;