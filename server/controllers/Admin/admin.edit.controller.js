const ShoeSize = require('../models/shoeSize.model')
const ShoeImage = require('../models/shoeImage.model')
const ShoeProduct = require('../models/shoeProduct.model')
const Brand = require('../models/brand.model')
const ShoeSellProduct = require('../models/shoeSellProduct.model')
const ShoeBidding = require('../models/shoeBidding.model')
const ShoeTransaction = require('../models/shoeTransaction.model')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const saltRounds = 10

const changeShoeSpecific = async (req, res) => {
  const {name, brand, description, style, color, retail, release, _id } = req.body
  const shoe = await ShoeProduct.findOne({'_id': _id})
  if (shoe) {
    const prevbrandid = shoe.brand
    const updateShoeProduct = await ShoeProduct.update({'_id': _id},
    {'$set':{name: name,brand: brand, description: description, style: style, color: color, retail: retail, release: release}})
    if (updateShoeProduct) {
      const brandUpdate = await Brand.update({'_id': prevbrandid},
      {'$pull': {shoeProduct: _id}})
      if (brandUpdate) {
        const brandUpdatePush = await Brand.update({'_id': brand},
        {'$push': {shoeProduct: _id}})
        if (brandUpdatePush) {
          const brandall = await Brand.find()
          brandall ? res.status(200).json(brandData) : res.status(500).json('Error find brand')
        } else {
          res.status(500).json('Error in pull update')  
        }
      } else {
        res.status(500).json('Error in push update')
      }
    } else {
      res.status(500).json('Error in update shoe')
    }
  }
}

const changeShoeImage =  (req, res) => {
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
}

const changeShoeSize = (req, res) => {
  const {_id, eu, uk, us, footlength} = req.body
  const shoeUpdate = await ShoeSize.update({'_id': _id},
  {'$set':{eu:eu, uk:uk, us:uk, footlength: footlength}})
  shoeUpdate ? res.status(200).json('Done') : res.status(500).json('err')
}

const removeSizeShoe = (req, res) => {
  const {shoeid, sizeid} = req.params
  // Remove In ShoeSize
  const removeShoeSize = await ShoeSize.remove({'_id': sizeid})
  if (removeShoeSize) {
    const shoeProductEdit = await ShoeProduct.update({'_id': shoeid},
    {'$pull': {size: sizeid}})
    shoeProductEdit ? res.status(200).json(shoeProductEdit) : res.status(500).json('err')
  }
}



module.exports = {
  changeShoeSpecific,
  changeShoeImage,
  changeShoeSize,
  removeSizeShoe
}