const express = require('express');
const router = express.Router();
const multer  = require('multer')
const uploadToGCS = require('../middleware/upload-gcs')

// Multer
const uploadDisk = multer({
  storage: multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

// const { getallshoes, getAllBrand, getBrandProductSpecific, getShoeSpecific } = require('../controllers/Admin/admin.get.controller')
// const { addProduct, addProductSize, addBrand, addSupplier } = require('../controllers/Admin/admin.post.controller')
// const { changeShoeSpecific, changeShoeImage, changeShoeSize, removeSizeShoe } = require('../controllers/Admin/admin.edit.controller')

const { getallshoes, getAllBrand, getBrandProductSpecific, getShoeSpecific, addProduct, addProductSize, addBrand, addSupplier, changeShoeSpecific, changeShoeImage, changeShoeSize, removeSizeShoe } = require('../controllers/Admin/admin.controller')


// Get Stuff
router.get('/getshoes', getallshoes)
router.get('/allbrand', getAllBrand)
router.get('/brandproductspecific', getBrandProductSpecific)
router.get('/getshoespecific', getShoeSpecific)

// Add Stuff
router.post('/addproduct', uploadDisk.array('image', 6), uploadToGCS.sendUploadToGCS, addProduct)
router.post('/addsizeproduct', addProductSize)
router.post('/addbrand', addBrand)
router.post('/addsupplier', addSupplier)

// Edit Stuff
router.post('/changeshoespecific', changeShoeSpecific)
router.post('/changeshoeimage', uploadDisk.array('image', 6), uploadToGCS.sendUploadToGCS, changeShoeImage)
router.post('/changeshoesize', changeShoeSize)
router.delete('/removesizeshoe/:sizeid/:shoeid', removeSizeShoe)




module.exports = router;
