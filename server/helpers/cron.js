const cron = require('cron'),
      CronJob = require('cron').CronJob,
      ShoeBidding = require('../models/shoeBidding.model')
      ShoeSell = require('../models/shoeSellProduct.model')

const removingExpiredBid = new CronJob({
  cronTime: '* 0 24 * * *',
  onTick: function() {
      ShoeBidding.find()
      .exec()
      .then(data => {
        const checkBidding = data.reduce((result, each) => {
          if (each.timeDestroy.getTime() < new Date().getTime()){
            if (each.status === 'active') {
              result.push(each._id)
              return result
            }
          }
        }, [])
        if (ShoeBidding.length > 0) {
          ShoeBidding.update({'_id': {
            $in: checkBidding
          }},{status: 'inactive'},{multi: true},
          function (err, result){
            console.log(result)
          })
        } else {
          console.log(`Nothing to de-activate`)
        }
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

const removingExpiredAsk = new CronJob ({
  cronTime: '* 0 24 * * *',
  onTick: function() {
    ShoeSell.find()
    .exec()
    .then(data => {
      let hasil = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].timeDestroy.getTime() < new Date().getTime()){
          hasil.push(data[i]._id)
        }
      }
      if (hasil.length > 0) {
        ShoeSell.update({'_id': {$in: hasil}},
        {status: 'inactive'},{multi: true},
        function (err, result){
          console.log(result)
        })
      } else {
        console.log(`Nothing to de-activate`)
      }
    })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

module.exports = {
  removingExpiredBid, removingExpiredAsk
}