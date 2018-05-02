const redis = require('redis');
const client = redis.createClient()
const jwt = require('jsonwebtoken')

const getkepingan = (req, res, next) => {
  client.get('kepingan', (err, reply) => {
    if (reply) {
      const token = JSON.parse(reply)
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
    } else {
      res.status(400).json({message: 'Token expired'})
    }
    if (err) {
      res.status(500).json('error')
    }
  })
}

module.exports = {
  getkepingan
}