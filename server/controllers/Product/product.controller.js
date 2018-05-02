const ShoeSize = require('../../models/shoeSize.model')
const ShoeImage = require('../../models/shoeImage.model')
const ShoeProduct = require('../../models/shoeProduct.model')
const Brand = require('../../models/brand.model')
const ShoeSellProduct = require('../../models/shoeSellProduct.model')
const ShoeBidding = require('../../models/shoeBidding.model')
const ShoeTransaction = require('../../models/shoeTransaction.model')
const User = require('../../models/user.model')

const jwt = require('jsonwebtoken')

// Helper Function
const findTheOld = (value) => {
  let count = 0
  let index;
  for (let i = 0; i < value.length; i++) {
    if (count === 0) {
      index = i
      count++
    } else {
      let before = Date.parse(value[index].created)
      let current = Date.parse(value[i].created)
      if (before > current) {
        index = i
      }
    }
  }
  return value[index]
}

// End Point
const submitaskform = async (req, res) => {
  const { productid, sizeid, price, duration, token } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    let datenow = new Date()
    let expired = datenow.setDate(datenow.getDate() + duration)
    // Create New ShoeSell
    const newShoeSellProduct = new ShoeSellProduct({
      shoeProduct: productid, size: sizeid, price, duration, timeDestroy: expired, user: data.id, status: 'active'
    })
    newShoeSellProduct.save()
    .then(newShoeSellProductData => {
      // Update User by ShoeSellId
      User.update({'_id': data.id},
        {'$push': {shoeSellProduct: newShoeSellProductData._id}},
      function (err, result){
        if (!err) {
          // UpdateShoeProduct ShoeSellId
          ShoeProduct.update({'_id': productid},
            {'$push': {shoeSellProduct: newShoeSellProductData._id}},
          function (err, result){
            if (!err) {
              console.log(result)
              res.status(200).json({
                message: `Successfull set your ask`,
                product: newShoeSellProduct,
                productid: productid
              })
            } else {
              console.log('errorrrr')
              res.status(503).json({message: 'Error in update shoe product'})
            }
          })
        } else {
          res.status(502).json({message: 'Error in update user product'})
        }
      })
    }).catch(err => {
      res.status(501).json(err)
    })
  }
}

const submitbidform = async (req, res) => {
  const { productid, sizeid, price, duration, token } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    let datenow = new Date()
    let expired = datenow.setDate(datenow.getDate() + duration)
    // Create newBidding
    const newShoeBidding = new ShoeBidding({
      user: data.id, size: sizeid, shoeProduct: productid, bidding: price, duration, timeDestroy: expired, status: 'active'
    })
    const newShoeBiddingData = await newShoeBidding.save()
    if (newShoeBiddingData) {
      const userUpdate = await User.update({'_id': data.id},
      {'$push': {shoeBidding: newShoeBiddingData._id}})
      if (userUpdate) {
        const updateShoe = await ShoeProduct.update({'_id': productid},
        {'$push': {shoeBidding: newShoeBiddingData._id}})
        if (updateShoe) {
          res.status(200).json({
            message: `Successfull set your bid`,
            product: newShoeBiddingData,
            productid: productid
          })
        } else {
          res.status(503).json({message: 'Error in update shoe product'})
        }
      } else {
        res.status(502).json({message: 'Error in update user product'})
      }
    }
  }
}

const askFormSuccess = async (req, res) => {
  const { productid, sizeid, price, token, duration } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    // Find The all the bid
    const findBidding = await ShoeBidding.find({
      $and: [
        {shoeProduct: productid},
        {size: sizeid},
        {bidding: price},
        {status: 'active'}
      ]})
    if (findBidding) {
      // Find The Oldest
      let findOld = findTheOld(findBidding)
      // Create Ask
      let datenow = new Date()
      let expired = datenow.setDate(datenow.getDate() + duration)
      const newShoeSellProduct = new ShoeSellProduct({
        user: data.id, shoeProduct: productid, size: sizeid, price: price, duration: duration, timeDestroy: expired, status: 'Success'
      })
      const addingShoeSell = await newShoeSellProduct.save()
      if (addingShoeSell) {
        // Update ShoeBidding status
        const shoeBiddingUpdate = await ShoeBidding.update({'_id': findOld._id},{$set: {status: 'Success'}})
        if (shoeBiddingUpdate) {
          // Create Transaction
          const newTransaction = new ShoeTransaction({
            seller: data.id, buyer: findOld.user, bidding: findOld._id, ask: addingShoeSell._id, nominal: price, productid: productid
          })
          const addingTransaction = await newTransaction.save()
          if (addingTransaction) {
            // Update ShoeProuct Transnction & ShoeSell Id Push
            const updateShoeProductTransaction = await ShoeProduct.update(
              {'_id': addingTransaction.productid},
              {$push:{
                transaction: addingTransaction._id, 
                shoeSellProduct: addingShoeSell._id
              }})
            if (updateShoeProductTransaction) {
              // Update User Seller
              const userSellerUpdate = await User.update(
                {'_id': data.id},
                {$push:{
                  shoeSellProduct: addingShoeSell._id,
                  shoeTransaction: addingTransaction._id}})
              if (userSellerUpdate) {
                // Update User Buyer
                const userBuyerUpdate = await User.update(
                  {'_id':findOld.user},
                  {$push: {
                    shoeTransaction: addingTransaction._id
                  }})
                if (userBuyerUpdate) {
                  res.status(200).json({
                    transaction: addingTransaction,
                    productid: productid
                  })
                } else {
                  console.log(`Error edit user buyer`)
                  res.status(500).json('err')
                }
              } else {
                console.log(`Error edit User Seller`)
                res.status(500).json('err')
              }
            } else {
              console.log('error edit shoe product')
              res.status(500).json('err')
            }
          } else {
            console.log('error adding transaction')
            res.status(500).json('err')
          }
        } else {
          console.log('error shoebidding update')
          res.status(500).json('err')
        }
      } else {
        console.log('error create new ShoeSell')
        res.status(500).json('err')
      }
    } else {
      console.log('error find all the bids')
      res.status(500).json('err')
    }
  }
}

const bidFormSuccess = async (req, res) => { 
  const { productid, sizeid, price, token, duration } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    const findAsking = await ShoeSellProduct.find({
      $and: [
        {shoeProduct: productid},
        {size: sizeid},
        {price: price},
        {status: 'active'}
      ]
    })
    if (findAsking) {
      let findOld = findTheOld(findAsking)
      // Create Bid
      let datenow = new Date()
      let expired = datenow.setDate(datenow.getDate() + duration)
      const newShoeBidding = new ShoeBidding ({
        user: data.id, size: sizeid, shoeProduct: productid, bidding: price, duration, status: 'Success', timeDestroy: expired
      })
      const addingShoeBidding = await newShoeBidding.save()
      if (addingShoeBidding) {
        // Update ShoeSell Status
        const updateShoeSell = await ShoeSellProduct.update({'_id': findOld._id},{$set: {status: 'Success'}})
        if (updateShoeSell) {
          // Create Transaction
          const newTransaction = new ShoeTransaction({
            seller: findOld.user, buyer: data.id, bidding: addingShoeBidding._id, ask: findOld._id, productid: productid, nominal: price
          })
          const addNewTransaction = await newTransaction.save()
          if (addNewTransaction) {
            // Update Shoe Product
            const updateShoeProduct = await ShoeProduct.update(
              {'_id': addNewTransaction.productid},
              {$push: {
                shoeBidding: addingShoeBidding._id,
                transaction: addNewTransaction._id
              }})
            if (updateShoeProduct) {
              // Update Seller
              const updateSeller = await User.update(
                {'_id': findOld.user},
                {$push: {
                  shoeTransaction: addNewTransaction._id
                }})
              if (updateSeller) {
                // Update Buyer
                const updateBuyer = await User.update(
                  {'_id': data.id},
                  {$push: {
                    shoeTransaction: addNewTransaction._id,
                    shoeBidding: addingShoeBidding._id
                  }})
                if (updateBuyer) {
                  res.status(200).json({
                    transaction: addNewTransaction,
                    productid: productid
                  })
                } else {
                  console.log(`Error Update Buyer`)
                  res.status(500).json(`Error`)
                }
              } else {
                console.log(`Error update Seller`)
                res.status(500).json(`Error`)
              }
            } else {
              console.log(`Error update Shoe Product`)
              res.status(500).json(`Error`)
            }
          } else {
            console.log(`Error create transaction`)
            res.status(500).json(`Error`)
          }
        } else {
          console.log(`Error update shoeSellProduct`)
          res.status(500).json(`Error`)
        }
      } else {
        console.log(`Error creating Shoe Bidding`)
        res.status(500).json(`Error`)
      }
    }
  }
}

const askFormFormProfile = async (req, res) => {
  const { productid, sizeid, highestBid, token, sellid } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    const findBidding = await ShoeBidding.find({
      $and: [
        {shoeProduct: productid},
        {size: sizeid},
        {bidding: highestBid},
        {status: 'active'}
      ]
    })
    if (findBidding) {
      let findOld = findTheOld(findBidding)
      // Update ShoeBidding status
      const shoeBiddingUpdate = await ShoeBidding.update({'_id': findOld._id},{$set: {status: 'Success'}})
      if (shoeBiddingUpdate) {
        // Create Transaction
        const newTransaction = new ShoeTransaction({
          seller: data.id, buyer: findOld.user, bidding: findOld._id, ask: sellid, nominal: highestBid, productid: productid
        })
        const addingTransaction = await newTransaction.save()
        if (addingTransaction) {
          // Update ShoeProuct Transnction Push
          const updateShoeProductTransaction = await ShoeProduct.update(
            {'_id': addingTransaction.productid},
            {$push:{
              transaction: addingTransaction._id, 
            }})
          if (updateShoeProductTransaction) {
            // Update User Seller
            const userSellerUpdate = await User.update(
              {'_id': data.id},
              {$push:{
                shoeTransaction: addingTransaction._id}})
            if (userSellerUpdate) {
              // Update User Buyer
              const userBuyerUpdate = await User.update(
                {'_id':findOld.user},
                {$push: {
                  shoeTransaction: addingTransaction._id
                }})
              if (userBuyerUpdate) {
                // Update Shoe Sell
                const updateShoeSell = await ShoeSellProduct.update({'_id':sellid},{$set: {price: highestBid, status: 'Success'}})
                if (updateShoeSell) {
                  res.status(200).json({
                    userid: data.id
                  })
                }
              } else {
                console.log(`Error edit user buyer`)
                res.status(500).json('err')
              }
            } else {
              console.log(`Error edit User Seller`)
              res.status(500).json('err')
            }
          } else {
            console.log('error edit shoe product')
            res.status(500).json('err')
          }
        } else {
          console.log('error adding transaction')
          res.status(500).json('err')
        }
      } else {
        console.log('error shoebidding update')
        res.status(500).json('err')
      }
    }
  }
}

const bidFormProfile = async (req, res) => {
  const { productid, sizeid, lowestAsk, token, bidid } = req.body
  const {expired, data} = jwt.verify(token, process.env.secret_key)
  const now = (new Date())/1000
  if (expired <= now) {
    res.status(401).send()
  } else {
    // Find Oldest Ask
    const findSell = await ShoeSellProduct.find({
      $and: [
        {shoeProduct: productid},
        {size: sizeid},
        {price: lowestAsk},
        {status: 'active'}
      ]
    })
    if (findSell) {
      let findOld = findTheOld(findSell)
      // Update ShoeSell
      const shoeSellUpdate = await ShoeSellProduct.update({'_id': findOld._id},{$set: {status: 'Success'}})
      if (shoeSellUpdate) {
        // Update ShoeBidding
        const shoeBiddingUpdate = await ShoeBidding.update({'_id': bidid},{$set:{status: 'Success', bid: lowestAsk}})
        if (shoeBiddingUpdate) {
          // Create Transaction
          const newTransaction = new ShoeTransaction ({
            seller: findOld.user, buyer: data.id, bidding: bidid, ask: findOld._id, nominal: lowestAsk, productid: productid
          })
          const addTransaction = await newTransaction.save()
          if (addTransaction) {
            // Shoe Product Update Push
            const shoeProductUpdate = await ShoeProduct.update({'_id': productid},{$push:{shoeTransaction: addTransaction._id}})
            if (shoeProductUpdate) {
              // Buyer Update
              const buyerUpdate = await User.update({'_id': data.id},{$push: {shoeTransaction: addTransaction._id}})
              if (buyerUpdate) {
                // Seller Update
                const sellUpdate = await User.update({'_id': findOld.user},{$push:{shoeTransaction: addTransaction._id}})
                if (sellUpdate) {
                  res.status(200).json({
                    userid: data.id
                  })
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  submitaskform,
  submitbidform,
  askFormSuccess,
  bidFormSuccess,
  askFormFormProfile,
  bidFormProfile
}