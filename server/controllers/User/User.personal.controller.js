const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')

const userstatus = (req, res) => {
  console.log('hehe')
  const token = req.headers.token
  if (!token) {res.status(500).json({message: 'No token'})}
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

module.exports = {
  userstatus
}