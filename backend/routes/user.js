
const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const Authentication = require('../authentication/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google',UserController.loginThroughGmail)
router.post('/check-company', UserController.checkCompany)

router.put('/update', Authentication.auth, UserController.updateUser)
router.get('/user/:id', UserController.getProfileByID)
router.post('/logout', Authentication.auth, UserController.logout)


router.get('/self', Authentication.auth,(req,res)=>{
    return res.status(200).json({ user:req.user })
})

router.get('/findUser', Authentication.auth, UserController.findUser)
router.post('/sendFriendReq', Authentication.auth, UserController.sendFriendRequest)
router.post('/acceptFriendReq', Authentication.auth, UserController.acceptFriendRequest)
router.get('/friendList', Authentication.auth, UserController.getFriendList)
router.get('/pendingFriendList', Authentication.auth, UserController.getPendingFriendList)
router.delete('/removeFriend/:friendId', Authentication.auth, UserController.removeFriend)

module.exports = router;