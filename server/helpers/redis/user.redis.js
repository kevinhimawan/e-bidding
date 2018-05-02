const redis = require("redis");
const client = redis.createClient();

const setkepingan = (payload) => {
  client.set('kepingan', JSON.stringify(payload), 'ex', 1800)
}

module.exports = {
  setkepingan
}