const express = require('express');
const router = express.Router();

// Redis
const { getkepingan } = require('../middleware/redis/user.redis')

// Controller
const { getUser, getUserSell, getUserBuying, resetPassword, changeBasicProfile, addAdress, getUserSetting, changeAddress, updateBiddingDetail, updateBidding } = require('../controllers/user.controller')
const { usersignup, userlogin } = require('../controllers/User/User.login.controller')
const { userstatus } = require('../controllers/User/User.personal.controller')

// User Registration
router.post('/signup', usersignup)
router.post('/login', userlogin)

// User Get Status
router.get('/getstatus', getkepingan)

router.get('/getuser', getUser)
router.get('/getuserselling', getUserSell)
router.get('/getuserbuying', getUserBuying)
router.post('/resetpassword', resetPassword)
router.post('/changebasicprofile', changeBasicProfile)
router.get('/getusersetting', getUserSetting)
router.post('/addaddress', addAdress)
router.post('/changeaddress', changeAddress)
router.post('/updatebiddingdetail', updateBiddingDetail)
router.post('/updatebidding', updateBidding)
module.exports = router;
