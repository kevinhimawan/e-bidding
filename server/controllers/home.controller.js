const ShoeProduct = require('../models/shoeProduct.model')
const ShoeImage = require('../models/shoeImage.model')
const ShoeSize = require('../models/shoeSize.model')
const Brand = require('../models/brand.model')
const ShoeSellProduct = require('../models/shoeSellProduct.model')
const ShoeBidding = require('../models/shoeBidding.model')
const ShoeTransaction = require('../models/shoeTransaction.model')


module.exports = {
  getInitialize (req, res) {
    ShoeProduct.find()
    .populate('images')
    .populate({
      path: 'shoeSellProduct',
      match: { status: 'active' }
    })
    .exec()
    .then(data => {
      res.status(200).json(data)
    })
  },
  getSpecificProduct (req, res) {
    const productid = req.params.id
    console.log('hehe')
    ShoeProduct.findOne({'_id': productid})
    .populate('images')
    .populate('transaction')
    .populate({
      path: 'shoeSellProduct',
      match: { status: 'active' },
      populate: {
        path: 'size',
        model: 'ShoeSize'
      }
    })
    .populate('brand')
    .populate('size')
    .populate({
      path: 'shoeBidding',
      match: { status: 'active' },
      populate: {
       path: 'size' ,
       model: 'ShoeSize'
      }
    })
    .exec()
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
  },
  searchProduct (req, res) {
    const key = req.headers.searchkey
    ShoeProduct.find()
    .populate('images')
    .populate({
      path: 'shoeSellProduct',
      match: { status: 'active' }
    })
    .populate('brand')
    .exec()
    .then(data => {
      const getFilter = data.filter((each, i) => {
        if (each.name.toLowerCase().indexOf(key) !== -1 || each.style.toLowerCase().indexOf(key) !== -1 || each.brand.name.toLowerCase().indexOf(key) !== -1) {
          return each
        }
      })
      res.status(200).json({
        products: getFilter
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}