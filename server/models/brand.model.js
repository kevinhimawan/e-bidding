const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
  name: {
    type: String,
    unique: [true, `This brand has already existed`]
  },
  shoeProduct: [{
    type: Schema.Types.ObjectId,
    ref: 'ShoeProduct'
  }]
})

const Brand = mongoose.model('Brand', brandSchema)
module.exports = Brand