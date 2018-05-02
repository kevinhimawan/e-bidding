const express = require('express');
const router = express.Router()

// const { submitaskform, submitbidform, askFormSuccess, bidFormSuccess } = require('../controllers/Product/product.direct.controller')
// const { askFormFormProfile, bidFormProfile } = require('../controllers/Product/product.profile.controller')
const { submitaskform, submitbidform, askFormSuccess, bidFormSuccess, askFormFormProfile, bidFormProfile } = require('../controllers/Product/product.controller')

// Direct
router.post('/askform', submitaskform)
router.post('/bidform', submitbidform)
router.post('/askformsucess', askFormSuccess)
router.post('/bidformsuccess', bidFormSuccess)

// User Profile
router.post('/askformformprofile', askFormFormProfile)
router.post('/bidformprofile', bidFormProfile)
module.exports = router;