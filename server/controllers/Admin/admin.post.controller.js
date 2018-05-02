const ShoeImage = require('../../models/shoeImage.model')
const ShoeProduct = require('../../models/shoeProduct.model')
const Brand = require('../../models/brand.model')
const User = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const saltRounds = 10

const addProduct = async (req, res) => {
  const newShoeProductData = await ShoeProduct.findOne({name: name})
  newShoeProductData ? res.status(500).json('Double') : createProduct({req,res})
}

const createProduct = async (value) => {
  const { req, res } = value
  const { name, brand, description, style, color, retail, release} = req.body
  const newShoeProduct = new ShoeProduct({
    name, brand, description, style, color, retail, release
  })
  const newShoeProductData = await newShoeProduct.save()
  add ? uploadImage({req, res, newShoeProductData, brand}) : res.status(500).json('error creating new product')
}

const uploadImage = async (value) => {
  const { newShoeProductData, req, res, brand } = value.newShoeProductData
  const uploading = req.files.map(file => {
    // Bulk Create Image and Update
    return new Promise ((resolve,reject)=>{
      const newImage = new ShoeImage({
        name: file.originalname, path: file.cloudStoragePublicUrl, product: newShoeProductData._id
      })
      // Create New Image
      const addImage = await newImage.save()
      if (addImage) {
        // Update Image of new product
        const updateShoeProduct = await ShoeProduct.update({'_id': newShoeProductData._id},
        {'$push': {images: newImageData._id}})
        updateShoeProduct ? resolve(updateShoeProduct) : reject('error update image')
      } else {
        reject('error creating image')
      }
    })
  })
  Promise.all(uploading).then(resolve=>{
    const shoe = await ShoeProduct.findOne({'_id': newShoeProductData._id})
    .populate('size')
    .populate('images')
    if (shoe) {
      const brandUpdate = await Brand.update({'_id': brand},
      {'$push': {shoeProduct: newShoeProductData._id}})
      brandUpdate ? res.status(200).json(shoe) : res.status(500).json('fail to brand update')
    } else {
      res.status(500).json('failt to find new shoe')
    }
  })
}

const addProductSize = async (req, res) => {
  const { product, eu, uk, us, footlength, description } = req.body
  const newShoeSize = new ShoeSize({
      product, eu, uk, us, footlength, description
  })
  const newSize = newShoeSize.save()
  if (newSize) {
    const updateShoes = await ShoeProduct.update({'_id': product},
    {'$push': {size: newSize._id}})
    if (updateShoes) {
      const shoe = await ShoeProduct.findOne({'_id': product})
      .populate('size')
      .populate('images')
      shoe ? res.status(200).json(shoe) : res.status(409).json('err')
    }
  }
}

const addBrand = async (req, res) => {
  const { name } = req.body
  const newBrand = new Brand({name})
  const newBrandData = newBrand.save()
  newBrandData ? res.status(200).json(newBrandData) : res.status(500).json('err')
}

const addSupplier = async (req, res) => {
  const { username, street, kelurahan, kecamatan, kota, provinsi, kodepos, number, phoneNumber, catatan, email, country } = req.body
  const findDouble = await User.findOne({'email': email})
  if (findDouble) {
    res.status(401).json('Found double')
  } else {
    const password = `${username.split(' ')[0].toLowerCase()}12345`
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);

    const newSupplier = new User({
      username, street, kelurahan, kecamatan, kota, provinsi, kodepos, number, phoneNumber, catatan, email, password: hash, country, status: 'Supplier'
    })
    const addNewSupplier = await newSupplier.save()
    if (addNewSupplier) {
      res.status(200).json({
        message: 'Success',
        newSupplier: newSupplier
      })
    } else {
      res.status(500).json('err')
    }
  } 
}

module.exports = {
  addProduct,
  addProductSize,
  addBrand,
  addSupplier
}