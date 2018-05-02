const ShoeProduct = require('../../models/shoeProduct.model')
const Brand = require('../../models/brand.model')

const getallshoes = async (req, res) => {
  const shoes = await ShoeProduct.find()
  .populate('size')
  .populate('images')
  shoes ? res.status(200).json(shoes) : res.status(500).json('err')
}

const getAllBrand = async (req, res) => {
  const brandData = await Brand.find()
  brandData ? res.status(200).json(brandData) : res.status(500).json('err')
}

const getBrandProductSpecific = async (req, res) => {
  const brandid = req.headers.brandid
  const brand = await Brand.findOne({'_id': brandid})
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
  brand ? res.status(200).json(brandData) : res.status(500).json('error')
}

const getShoeSpecific = async (req, res) => {
  const shoesid = req.headers.shoeid
  const shoeData = await ShoeProduct.findOne({'_id': shoeid})
  .populate('images')
  .populate('shoeSellProduct')
  .populate('shoeBidding')
  .populate('transaction')
  .populate('brand')
  .populate('size')
  shoeData ? res.status(200).json(shoeData) : res.status(500).json('error')
}

module.exports = {
  getallshoes,
  getAllBrand,
  getBrandProductSpecific,
  getShoeSpecific
}