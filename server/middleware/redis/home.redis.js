const redis = require('redis');
const client = redis.createClient()

const gethomedata = (req, res, next) => {
  client.get('hommiedata', (err, reply) => {
    reply ? res.status(200).json(JSON.parse(reply)) : next()
    // reply ? console.log(reply) : next()
    if (err) {
      res.status(500).json('error')
    }
  })
}

module.exports = {
  gethomedata
}