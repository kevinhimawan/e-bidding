const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeTransactionSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  bidding: {
    type: Schema.Types.ObjectId,
    ref: 'ShoeBidding'
  },
  ask: {
    type: Schema.Types.ObjectId,
    ref: 'ShoeSellProduct'
  },
  productid: {
    type: Schema.Types.ObjectId,
    ref: 'ShoeProduct'
  },
  nominal: Number,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

const ShoeTransaction = mongoose.model('ShoeTransaction', shoeTransactionSchema)
module.exports = ShoeTransaction