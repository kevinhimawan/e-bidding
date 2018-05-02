const ShoeSize = require('../../models/shoeSize.model')
const ShoeImage = require('../../models/shoeImage.model')
const ShoeProduct = require('../../models/shoeProduct.model')
const Brand = require('../../models/brand.model')
const ShoeSellProduct = require('../../models/shoeSellProduct.model')
const ShoeBidding = require('../../models/shoeBidding.model')
const ShoeTransaction = require('../../models/shoeTransaction.model')
const User = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const saltRounds = 10

// Add Supplier
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
      res.status(500).json(err)
    }
  } 
}

module.exports = {
  addBrand (req, res) {
    const {name} = req.body
    const newBrand = new Brand({name})
    newBrand.save()
    .then(newBrandData => {
      res.status(200).json(newBrandData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  getAllBrand (req, res) {
    Brand.find()
    .exec()
    .then(brandData => {
      res.status(200).json(brandData)
    })
  },
  addProduct (req, res) {
    const { name, brand, description, style, color, retail, release} = req.body
    ShoeProduct.findOne({name: name})
    .exec()
    .then(newShoeProductData => {
      if (newShoeProductData) {
        res.status(500).json('Double')
      } else {
        const newShoeProduct = new ShoeProduct({
          name, brand, description, style, color, retail, release
        })
        // Create New Product
        newShoeProduct.save()
        .then(newShoeProductData=>{
          const uploadImage = req.files.map(file=>{
            // Promise All
            return new Promise ((resolve,reject)=>{
              const newImage = new ShoeImage({
                name: file.originalname, path: file.cloudStoragePublicUrl, product: newShoeProductData._id
              })
              // Create New Image
              newImage.save()
              .then(newImageData=>{
                // Update Image of new product
                ShoeProduct.update({'_id': newShoeProductData._id},
                  {'$push': {images: newImageData._id}},
                (err,result)=>{
                  resolve(result)
                })
              })
            })
          })
          Promise.all(uploadImage).then(resolve=>{
            ShoeProduct.findOne({'_id': newShoeProductData._id})
            .populate('size')
            .populate('images')
            .exec()
            .then(shoe => {
              Brand.update({'_id': brand},
                {'$push': {shoeProduct: newShoeProductData._id}},
              function (err, result){
                if (!err) {
                  res.status(200).json(shoe)
                } else {
                  res.status(500).json(err)
                }
              })
            })
          }).catch(err => {
            res.status(500).json(`Error saving picture`)
          })
        })
        .catch(err => {
          res.status(500).json('Error saving data')
        })
      }
    })
  },
  getallshoes (req, res) {
    ShoeProduct.find()
    .populate('size')
    .populate('images')
    .exec()
    .then(allShoesData=>{
        res.status(200).json(allShoesData)
    })
  },
  addProductSize (req, res) {
    const { product, eu, uk, us, footlength, description } = req.body
    const newShoeSize = new ShoeSize({
        product, eu, uk, us, footlength, description
    })
    newShoeSize.save()
    .then(newShoeSizeData=>{
      ShoeProduct.update({'_id': product},
        {'$push': {size: newShoeSizeData._id}},
      (err,result)=>{
        if(!err){
          ShoeProduct.findOne({'_id': product})
          .populate('size')
          .populate('images')
          .exec()
          .then(shoe => {
            res.status(200).json(shoe)
          })
        }else{
          res.status(409).json(err)
        }
      })
    })
  },
  getBrandProductSpecific (req, res) {
    const brandid = req.headers.brandid
    Brand.findOne({'_id': brandid})
    .populate({
      path: 'shoeProduct',
      populate: [{
        path: 'images',
      },
      {
        path: 'shoeSellProduct'
      },
      {
        path: 'shoeBidding'
      },
      {
        path: 'transaction'
      }],
      
    })
    .exec()
    .then(brandData => {
      res.status(200).json(brandData)
    })
  },
  getShoeSpecific (req, res) {
    const shoeid = req.headers.shoeid
    ShoeProduct.findOne({'_id': shoeid})
    .populate('images')
    .populate('shoeSellProduct')
    .populate('shoeBidding')
    .populate('transaction')
    .populate('brand')
    .populate('size')
    .exec()
    .then(shoeData => {
      res.status(200).json(shoeData)
    })
  },
  changeShoeSpecific (req, res) {
    const {name, brand, description, style, color, retail, release, _id } = req.body
    ShoeProduct.findOne({'_id': _id})
    .exec()
    .then(shoe => {
      const prevbrandid = shoe.brand
      ShoeProduct.update({'_id': _id},
        {'$set':{name: name,brand: brand, description: description, style: style, color: color, retail: retail, release: release}},
      function (err, result){
        // Update prev brand
        if (!err) {
          Brand.update({'_id': prevbrandid},
            {'$pull': {shoeProduct: _id}},
          function (err, result){
            if (!err) {
              Brand.update({'_id': brand},
                {'$push': {shoeProduct: _id}},
              function (err, result){
                if (!err) {
                  Brand.find()
                  .exec()
                  .then(brandData => {
                    res.status(200).json(brandData)
                  })
                } else {
                  res.status(500).json('Error in push update')
                }
              })
            } else {
              res.status(500).json('Error in pull update')
            }
          })
        } else {
          res.status(500).json('Error in update shoe')
        }
      }) 
    })
  },
  changeShoeImage (req, res) {
    const files = req.files
    const {removedphoto, shoeid} = req.body
    if (files.length > 0) {
      const uploadImage = files.map(file => {
        return new Promise ((resolve, reject) => {
          // Create new Image
          const newImage = new ShoeImage({
            name: file.originalname, path: file.cloudStoragePublicUrl, product: shoeid
          })
          newImage.save()
          .then(newImageData => {
            // Update Product New Images
            ShoeProduct.update({'_id': shoeid},
              {'$push': {images: newImageData._id}},
            function (err, result){
              if (!err) {
                resolve(result)
              } else {
                reject (err)
              }
            })
          })
        })
      })

      Promise.all(uploadImage).then(result => {
        if (removedphoto) {
          if (typeof removedphoto === 'string') {
            // Remove images
            ShoeImage.deleteOne({'_id': removedphoto})
            .then(result => {
              // Pull ShoeProduct
              ShoeProduct.update({'_id': shoeid},
                {'$pull': {images: removedphoto}},
              function (err, result){
                if (!err) {
                  res.status(200).json(result)
                }
              })
            })
          } else if (removedphoto.length > 1) {
            const removeImage = removedphoto.map(photo => {
              return new Promise ((resolve, reject) => {
                ShoeImage.deleteOne({'_id': photo})
                .then(result => {
                  ShoeProduct.update({'_id': shoeid},
                    {'$pull': {images: photo}},
                  function (err, result2){
                    if (!err) {
                      resolve(result2)
                    }
                  })
                })
              })
            })
            Promise.all(removeImage).then(result => {
              res.status(200).json(result)
            })
          }
        } else {
          res.status(200).json(result)
        }
      })
    } else {
      if (removedphoto) {
        if (typeof removedphoto === 'string') {
          // Remove images
          ShoeImage.deleteOne({'_id': removedphoto})
          .then(result => {
            // Pull ShoeProduct
            ShoeProduct.update({'_id': shoeid},
              {'$pull': {images: removedphoto}},
            function (err, result){
              if (!err) {
                res.status(200).json(result)
              }
            })
          })
        } else if (removedphoto.length > 1) {
          const removeImage = removedphoto.map(photo => {
            return new Promise ((resolve, reject) => {
              ShoeImage.deleteOne({'_id': photo})
              .then(result => {
                ShoeProduct.update({'_id': shoeid},
                  {'$pull': {images: photo}},
                function (err, result2){
                  if (!err) {
                    resolve(result2)
                  }
                })
              })
            })
          })
          Promise.all(removeImage).then(result => {
            res.status(200).json(result)
          })
        }
      } else {
        res.status(200).json(result)
      }
    }
  },
  changeShoeSize (req, res) {
    const {_id, eu, uk, us, footlength} = req.body
    ShoeSize.update({'_id': _id},
      {'$set':{eu:eu, uk:uk, us:uk, footlength: footlength}},
    function (err, result){
      if (!err) {
        res.status(200).json('Done')
      }
    })
  },
  removeSizeShoe (req, res) {
    const {shoeid, sizeid} = req.params
    // Remove In ShoeSize
    ShoeSize.remove({'_id': sizeid})
    .then(result => {
      // Pull in ShoeProduct
      ShoeProduct.update({'_id': shoeid},
        {'$pull': {size: sizeid}},
      function (err, result){
        if (!err) {
          res.status(200).json(result)
        }
      })
    })
  },
  addSupplier
}

