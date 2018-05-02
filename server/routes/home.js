const express = require('express');
const router = express.Router()

// Middleware
const { gethomedata } = require('../middleware/redis/home.redis')
9
// Controller
const { getMostPopular} = require('../controllers/Home/home.get.controller')
const { getSpecificProduct, searchProduct} = require('../controllers/home.controller')

router.get('/', getMostPopular)
router.get('/getspecificproduct/:id', getSpecificProduct)
router.get('/searchproduct', searchProduct)

module.exports = router