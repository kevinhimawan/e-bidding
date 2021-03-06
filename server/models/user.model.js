const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email:{
      type:String,
      required: {
          type: true,
          message: 'Email is required',
          name: 'emailValidation',
          path: 'email'
      },
      unique: [true,'Email has already taken'],
      trim: true,
      validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  status:{
      type: String,
      default: 'User'
  },
  password:{
      type:String
  },
  shoeSellProduct:[{
      type: Schema.Types.ObjectId,
      ref: 'ShoeSellProduct'
  }],
  shoeBidding:[{
    type: Schema.Types.ObjectId,
    ref: 'ShoeBidding'
  }],
  shoeTransaction: [{
    type: Schema.Types.ObjectId,
    ref: 'ShoeTransaction'
  }],
  address: [{
    type: Schema.Types.ObjectId,
    ref: 'Address'
  }],
  catatan: String,
})

const User = mongoose.model('User',userSchema)
module.exports = User