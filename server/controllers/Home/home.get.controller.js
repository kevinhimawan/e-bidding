const ShoeProduct = require('../../models/shoeProduct.model')
const ShoeImage = require('../../models/shoeImage.model')
const ShoeSize = require('../../models/shoeSize.model')
const Brand = require('../../models/brand.model')
const ShoeSellProduct = require('../../models/shoeSellProduct.model')
const ShoeBidding = require('../../models/shoeBidding.model')
const ShoeTransaction = require('../../models/shoeTransaction.model')
const { sneaksmostpopular } = require('../../helpers/redis/home.redis')

const getMostPopular = async (req, res) => {
  const data = await ShoeProduct.find()
  .populate('images')
  .populate({
    path: 'shoeSellProduct',
    match: { status: 'active' }
  })
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(500).json({message: `Server error`})
  }
}

const getSpecificProduct = async (req, res) => {
  const productid = req.params.id
  const data = await ShoeProduct.findOne({'_id': productid})
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
  data ? res.status(200).json(data) : res.status(500).json('server error')
}

const searchProduct = async (req, res) => {
  const key = req.headers.searchkey
  const data = await ShoeProduct.find()
  .populate('images')
  .populate({
    path: 'shoeSellProduct',
    match: { status: 'active' }
  })
  .populate('brand')
  if (data) {
    const getFilter = data.filter((each, i) => {
      if (each.name.toLowerCase().indexOf(key) !== -1 || each.style.toLowerCase().indexOf(key) !== -1 || each.brand.name.toLowerCase().indexOf(key) !== -1) {
        return each
      }
    })
    res.status(200).json({
      products: getFilter
    })
  } else {
    res.status(500).json(err)
  }
}

module.exports = {
  getMostPopular,
  getSpecificProduct,
  searchProduct
}