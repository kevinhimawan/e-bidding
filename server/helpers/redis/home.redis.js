const redis = require("redis");
const client = redis.createClient();

const sneaksmostpopular = (payload) => {
  client.set('hommiedata', JSON.stringify(payload), 'ex', 20)
}

module.exports = {
  sneaksmostpopular
}