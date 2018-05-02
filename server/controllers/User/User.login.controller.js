const User = require('../../models/user.model')
const { setkepingan } = require('../../helpers/redis/user.redis')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10
const Address = require('../../models/address.model')

const usersignup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body
  const findUser = await User.findOne({email: email})
  if (findUser) {
    res.status(409).json({
      message: email
    })
  } else {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    let newUser;
    if (username === 'admin') {
      newUser = new User ({
        username, email, password: hash, status: 'Admin', firstname, lastname, username
      })
    } else {
      newUser = new User({
        username, email, password: hash, firstname, lastname, username
      })
    }
    const newUserData = await newUser.save()
    if (newUserData) {
      const token = jwt.sign({
      expired: Math.floor(Date.now() / 1000) + (60 * 60), 
      data:{
        id:newUserData._id, 
        email: newUserData.email, 
        status: newUserData.status}
      },process.env.secret_key)
      res.status(200).json({
      token, status: newUserData.status})
    } else {
      res.status(500).json({
        message: `Create failure`
      })
    }
  }
}

const userlogin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email: req.body.email})
  if (user) {
    let check = bcrypt.compareSync(req.body.password, user.password)
    if(check){
      const token = jwt.sign({
        expired: Math.floor(Date.now() / 1000) + (60 * 60), 
        data:{
          id: user._id,
          email:user.email,
          status: user.status
        }},process.env.secret_key)
        setkepingan(token)
      res.status(200).json({message: `Login success`})
    }else{
      res.status(500).json({message: `Password error`})    
    }
  } else {
    res.status(404).json({message: `Username not found`})
  }
}

module.exports = {
  usersignup,
  userlogin,
}