const mongoose = require('mongoose')
const Schema = mongoose.Schema
const addressSchema = new Schema({
  name: String,
  receiver: String,
  receiverPhone: String,
  city: String,
  province: String,
  zipCode: String,
  address: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String
})
const Address = mongoose.model('Address', addressSchema)
module.exports = Address