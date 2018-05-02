const ShoeSize = require('../../models/shoeSize.model')
const ShoeImage = require('../../rsmodels/shoeImage.model')
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
  askFormFormProfile,
  bidFormProfile
}