<template>
  <div class="content col-lg-10">
    <BiddingActive
      v-bind:activeData="user.active"></BiddingActive>
    <BiddingNonActive
    v-bind:passiveData="user.passive"></BiddingNonActive>
    <BiddingHistory
    v-bind:historyData="user.parseTransaction"></BiddingHistory>
  </div>
</template>

<script>
import router from '@/router'
import BiddingHistory from './BiddingHistory'
import BiddingNonActive from './BiddingNonActive'
import BiddingActive from './BiddingActive'
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    BiddingActive, BiddingNonActive, BiddingHistory
  },
  data () {
    return {
      user: {}
    }
  },
  created() {
    if (this.userstatus !== 'User') {
      router.push({
        name: 'Profile'
      })
    }
  },
  methods: {
    ...mapActions([
      'getUserBuying'
    ]),
    parseActive (parseShoeBidding)  {
      let hasil = []
      for (let i = 0; i < parseShoeBidding.length; i++) {
        if (parseShoeBidding[i].status === 'active') {
          let active = {...parseShoeBidding[i]}
          let splitCreated = active.created.split('-')
          let endCreated = splitCreated[2].split('T')[0]
          let splittimeDestroy = active.timeDestroy.split('-')
          let endTimeToDestroy = splittimeDestroy[2].split('T')[0]

          active['parseCreated'] = `${splitCreated[0]}-${splitCreated[1]}-${endCreated}`
          active['parseDestroy'] = `${splittimeDestroy[0]}-${splittimeDestroy[1]}-${endTimeToDestroy}`
          hasil.push(active)
        }
      }
      return hasil
    },
    parsePassive (parseShoeBidding) {
      let hasil = []
      for (let i = 0; i < parseShoeBidding.length; i++) {
        if (parseShoeBidding[i].status === 'inactive') {
          let active = {...parseShoeBidding[i]}
          let splitCreated = active.created.split('-')
          let endCreated = splitCreated[2].split('T')[0]
          let splittimeDestroy = active.timeDestroy.split('-')
          let endTimeToDestroy = splittimeDestroy[2].split('T')[0]

          active['parseCreated'] = `${splitCreated[0]}-${splitCreated[1]}-${endCreated}`
          active['parseDestroy'] = `${splittimeDestroy[0]}-${splittimeDestroy[1]}-${endTimeToDestroy}`
          hasil.push(active)
        }
      }
      return hasil
    },
    parseSuccess (transaction) {
      for (let i = 0; i < transaction.length; i++) {
        let splitCreated = transaction[i].created.split('-')
        let endCreated = splitCreated[2].split('T')[0]
        transaction[i]['parseCreated'] = `${splitCreated[0]}-${splitCreated[1]}-${endCreated}`
      }
      return transaction
    }
  },
  watch: {
    userdata() {
      if (typeof this.userdata.shoeBidding[0] === 'string') {
        this.getUserBuying(this.userdata._id)
      } else {
        let parseShoeBidding = [...this.userdata.shoeBidding]
        let active =  this.parseActive(parseShoeBidding)
        let passive = this.parsePassive(parseShoeBidding)
        this.userdata['active'] = active
        this.userdata['passive'] = passive
        this.userdata['parseTransaction'] = this.parseSuccess(this.userdata.shoeTransaction)
        this.user = this.userdata
      }
    }
  },
  computed: {
    ...mapState([
      'userdata', 'userstatus'
    ])
  }
}
</script>

<style scoped>
.col-lg-12 {
  padding: 0
}
.content {
  max-width: 80% !important;
  padding: 1.2em 20px;
  display: flex;
  flex-direction: column;
}
</style>