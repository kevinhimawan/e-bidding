const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10
const ShoeSellProduct = require('../models/shoeSellProduct.model')
const ShoeBidding = require ('../models/shoeBidding.model')
const Address = require('../models/address.model')

const usersignup = (req, res) => {
  const { username, email, password } = req.body
  User.findOne({$or: [
    {email: email}
  ]})
  .exec()
  .then(userData => {
    if (userData) {
      res.status(409).json({
        message: `This ${email} email address has already taken`
      })
    } else {
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(password, salt);
      let newUser;
      if (username === 'admin') {
        newUser = new User ({
          username, email, password: hash, status: 'Admin'
        })
      } else {
        newUser = new User({
          username,email,password: hash
        })
      }
      newUser.save()
      .then(newUserData => {
        const token = jwt.sign({expired: Math.floor(Date.now() / 1000) + (60 * 60), data:{id:newUserData._id, email: newUserData.email, status: newUserData.status}},process.env.secret_key)
        res.status(200).json({
          token, status: newUserData.status})
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  })
}

const userlogin = (req, res) => {
  User.findOne({email: req.body.email})
  .exec()
  .then(user =>{
    if(user){
      let check = bcrypt.compareSync(req.body.password, user.password);
      if(check){
        const token = jwt.sign({expired: Math.floor(Date.now() / 1000) + (60 * 60), data:{id: user._id, email:user.email, status: user.status}},process.env.secret_key)
        res.status(200).json({token,status: user.status})
      }else{
        res.status(500).json('Password Error')    
      }
    }else{
      res.status(404).json('Username not found')
    }
  })
}

const userstatus = (req, res) => {
  const token = req.headers.token
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  if (data) {
    if (data.status === 'Admin') {
      const dateNow = Date.parse(new Date()) / 1000
      if( dateNow > expired) {
        res.status(401).json({message: `Token expired`})  
      } else {
        res.status(200).json(data.status)
      }
    } else {
      res.status(200).json(data.status)
    }
  } else {
    res.status(500).json({message: 'Token error'})
  }
}

const getUser = async (req, res) => {
  const token = req.headers.token
  const decoded = jwt.verify(token, process.env.secret_key)
  if (decoded) {
    const data = decoded.data
    const userid = data.id
    try {
      const getUser = await User.findOne({'_id': userid})
      if (getUser) {
        res.status(200).json(getUser)
      } else {
        res.status(500).json({message: `Unfound`})
      }
    } catch (err) {
      res.status(500).json({message: `Unfound`})
    }
  } else {
    res.status(500).json({message: `Unfound`})
  }
}

const getUserSell = async (req, res) => {
  const userid = req.headers.userid
  try {
    const getData = await User.findOne({'_id': userid})
    .populate({
      path: 'shoeSellProduct',
      populate: [{
        path: 'shoeProduct',
        model: 'ShoeProduct',
        populate: [{
          path: 'shoeBidding',
          model: 'ShoeBidding',
         },
         {
           path: 'shoeSellProduct',
           model: 'ShoeSellProduct'
         }]
      },{
        path: 'size',
        model: 'ShoeSize'
      }]
    })
    .populate({
      path: 'shoeTransaction',
      model: 'ShoeTransaction',
      populate: [{
        path: 'buyer',
        model: 'User'
      },{
        path: 'productid',
        model: 'ShoeProduct'
      },{
        path: 'bidding',
        model: 'ShoeBidding',
        populate: [{
          path: 'size',
          model: 'ShoeSize'
        }]
      },
      {
        path: 'seller',
        model: 'User'
      }]
    })
    if (getData) {
      console.log(getData)
      getLowestAskSelling ({data: getData, res})
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const getLowestAskSelling = async (value) => {
  const { data, res} = value
  const getLowest = data.shoeSellProduct.map ((val, i) => {
    return new Promise ((resolve, reject) => {
      const sizeid = val.size._id
      const shoesid = val.shoeProduct._id
      ShoeSellProduct.find({'size': sizeid, 'shoeProduct': shoesid, 'status': 'active'})
      .exec()
      .then(ShoeList => {
        resolve(ShoeList)
      })
    })
  })
  Promise.all(getLowest).then(getLowest => {
    const checkingAllSell = getLowest.map((val, i) => {
      let price = 0
      let index = 0
      for (let i = 0; i < val.length; i++) {
        if (i === 0) {
          price = val[i].price
          index = i
        } else {
          if (val[i].price < price) {
            price = val[i].price
            index = i
          }
        }
      }
      if (val[index] !== undefined) {
        if (String(val[index].user) === String(data._id)) {
          return 'noneislowest'
        } else {
          return val[index].price
        }
      }
    })
    getHighestBidSelling ({data, checkingAllSell, res})
  })
}

const getHighestBidSelling = async (value) => {
  const { data, checkingAllSell, res} = value
  const getHighestbid = data.shoeSellProduct.map ((val, i) => {
    return new Promise ((resolve, reject) => {
      
      const sizeid = val.size._id
      const shoesid = val.shoeProduct._id
      ShoeBidding.find({'size': sizeid, 'shoeProduct': shoesid, 'status': 'active'})
      .exec()
      .then(ShoeList => {
        resolve(ShoeList)
      })
    })
  })
  Promise.all(getHighestbid).then(getHighest => {
    const checkingAllBid = getHighest.map((val, i) => {
      let bid = 0
      let index = 0
      for (let i = 0; i < val.length; i++) {
        if (i === 0) {
          bid = val[i].bidding
          index = i
        } else {
          if (val[i].bidding > bid) {
            bid = val[i].bidding
            index = i
          }
        }
      }
      if (val[index]) {
        return val[index].bidding
      } else {
        return val[index]
      }
    })
    res.status(200).json({
      data: data,
      lowest: checkingAllSell,
      highest: checkingAllBid
    })
  })
}

const getUserBuying = async (req, res) => {
  const userid = req.headers.userid
  try {
    const getUserData = await User.findOne({'_id': userid})
    .populate({
      path: 'shoeBidding',
      populate: [{
        path: 'shoeProduct',
        model: 'ShoeProduct',
        populate: [{
         path: 'shoeBidding',
         model: 'ShoeBidding',
        },
        {
          path: 'shoeSellProduct',
          model: 'ShoeSellProduct'
        }]
      },{
        path: 'size',
        model: 'ShoeSize'
      }]
    })
    .populate({
      path: 'shoeTransaction',
      model: 'ShoeTransaction',
      populate: [{
        path: 'seller',
        model: 'User'
      },{
        path: 'productid',
        model: 'ShoeProduct'
      },{
        path: 'bidding',
        model: 'ShoeBidding',
        populate: [{
          path: 'size',
          model: 'ShoeSize'
        }]
      }]
    })
    getLowestAsk ({data: getUserData, res})
  } catch(err) {
    res.status(500).json(err)
  }
}

const getLowestAsk = async (value) => {
  const { data, res} = value
  const getLowest = data.shoeBidding.map ((val, i) => {
    return new Promise ((resolve, reject) => {
      const sizeid = val.size._id
      const shoesid = val.shoeProduct._id
      ShoeSellProduct.find({'size': sizeid, 'shoeProduct': shoesid, 'status': 'active'})
      .exec()
      .then(ShoeList => {
        resolve(ShoeList)
      })
    })
  })
  Promise.all(getLowest).then(getLowest => {
    const checkingAllSell = getLowest.map((val, i) => {
      let price = 0
      let index = 0
      for (let i = 0; i < val.length; i++) {
        if (i === 0) {
          price = val[i].price
          index = i
        } else {
          if (val[i].price < price) {
            price = val[i].price
            index = i
          }
        }
      }
      if (val[index]) {
        return val[index].price
      } else {
        return val[index]
      }
    })
    getHighestBid ({data, checkingAllSell, res})
  })
}

const getHighestBid = async (value) => {
  const { data, checkingAllSell, res} = value
  const getHighestbid = data.shoeBidding.map ((val, i) => {
    return new Promise ((resolve, reject) => {
      
      const sizeid = val.size._id
      const shoesid = val.shoeProduct._id
      ShoeBidding.find({'size': sizeid, 'shoeProduct': shoesid, 'status': 'active'})
      .exec()
      .then(ShoeList => {
        resolve(ShoeList)
      })
    })
  })
  Promise.all(getHighestbid).then(getHighest => {
    const checkingAllBid = getHighest.map((val, i) => {
      let bid = 0
      let index = 0
      for (let i = 0; i < val.length; i++) {
        if (i === 0) {
          bid = val[i].bidding
          index = i
        } else {
          if (val[i].bidding > bid) {
            bid = val[i].bidding
            index = i
          }
        }
      }
      if (val[index] !== undefined) {
        if (String(val[index].user) === String(data._id)) {
          return 'noneishighest'
        } else {
          return val[index].bidding
        }
      }
    })
    res.status(200).json({
      data: data,
      lowest: checkingAllSell,
      highest: checkingAllBid
    })
  })
}

const resetPassword = async (req, res) => {
  const { form, user } = req.body
  const { password } = form
  const { _id } = user
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  const updateUser = await User.update({'_id': _id},{$set:{password: hash}})
  if (updateUser) {
    res.status(200).json(updateUser)
  } else {
    res.status(500).json({message: 'error'})
  }
  
}

const changeBasicChildren = async (value) => {
  const { username, email, userid, res } = value
  const updateUser = await User.update({'_id': userid},{$set:{username: username, email: email}})
  if (updateUser) {
    res.status(201).json({message: `Update success`,userid: userid})
  } else {
    console.log('testing')
    res.status(402).json({message: `Update error`})
  }
}

const changeBasicProfile = async (req, res) => {
  const {changing, userid} = req.body
  const { firstname, lastname, email } = changing
  // Finding Double Email
  const checkDouble = await User.findOne({'email': email})
  if (checkDouble) {
    if (String(checkDouble._id) === String(userid)) {
      changeBasicChildren({
        username: `${firstname} ${lastname}`,
        email: email,
        userid: userid,
        res
      })
    } else {
      // Email already registered
      console.log('error')
      console.log(checkDouble._id)
      console.log(userid)
      res.status(401).json({message: `Email user has already used`})
    }
  } else {
    changeBasicChildren({
      username: `${firstname} ${lastname}`,
      email: email,
      userid: userid,
      res
    })
  }
}

const addAdress = async (req, res) => {
  const { name, receiver, receiverPhone, city, province, zipCode, address, notes, token } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  // Create Address
  const newAddress = new Address ({
    name, receiver, receiverPhone, city, province, zipCode, address, user: data.id, notes
  })
  const addNewAddress = await newAddress.save()
  if (addNewAddress) {
    // Update Address
    const updateUserAddress = await User.update({'_id': data.id},{$push: {address: addNewAddress._id}})
    if (updateUserAddress) {
      res.status(200).json({userid: data.id})
    } else {
      res.status(500).json('error')
    }
  } else {
    res.status(500).json('error')
  }
}

const getUserSetting = async (req, res) => {
  const userid = req.headers.userid
  const findUser = await User.findOne({'_id': userid})
  .populate({
    path: 'address',
    model: 'Address'
  })
  if (findUser) {
    res.status(200).json(findUser)
  } else {
    res.status(500).json('error')
  }
}

const changeAddress = async (req, res) => {
  const { form, userid } = req.body
  // Update Address
  const updateAddress = await Address.update({'_id': form._id}, {$set:form})
  if (updateAddress) {
    res.status(200).json({userid: userid})
  } else {
    res.status(500).json('err')
  }
}

const updateBiddingDetail = async (req, res) => {
  const { data, changes } = req.body
  const updateBidding = await ShoeBidding.update({'_id': data._id},{$set: changes})
  if (updateBidding) {
    res.status(200).json({userid: data.user})
  } else {
    res.status(500).json('err')
  }
}

const updateBidding = async (req, res) => {
  const { data, changes } = req.body
  const updateSelling = await ShoeSellProduct.update({'_id': data._id},{$set: changes})
  if (updateSelling) {
    res.status(200).json({userid: data.user})
  } else {
    res.status(500).json('err')
  }
}


module.exports = {
  usersignup,
  userlogin,
  userstatus,
  getUser,
  getUserSell,
  getUserBuying,
  resetPassword,
  changeBasicProfile,
  addAdress,
  getUserSetting,
  changeAddress, 
  updateBiddingDetail,
  updateBidding
}