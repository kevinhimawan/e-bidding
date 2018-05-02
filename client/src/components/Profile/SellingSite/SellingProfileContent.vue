<template>
  <div class="content col-lg-10">
    <SellingActive
      v-bind:activeData="user.active"></SellingActive>
    <SellingNonActive
      v-bind:passiveData="user.passive"></SellingNonActive>
      <SellingHistory
      v-bind:historyData="user.parseTransaction"></SellingHistory>
  </div>
</template>

<script>
import router from '@/router'
import SellingHistory from './SellingHistory'
import SellingNonActive from './SellingNonActive'
import SellingActive from './SellingActive'
import  { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    SellingActive, SellingNonActive, SellingHistory
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    if (this.userstatus !== 'Supplier') {
      router.push({
        name: 'Profile'
      })
    }
  },
  methods: {
    ...mapActions([
      'getUserBuying'
    ]),
    parseActive (parseShoeSell) {
      let hasil = []
      for (let i = 0; i < parseShoeSell.length; i++) {
        if (parseShoeSell[i].status === 'active') {
          let active = {...parseShoeSell[i]}
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
    parsePassive (parseShoeSell) {
      let hasil = []
      for (let i = 0; i < parseShoeSell.length; i++) {
        if (parseShoeSell[i].status === 'inactive') {
          let active = {...parseShoeSell[i]}
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
    userdata () {
      if (typeof this.userdata.shoeSellProduct[0] === 'string') {
        this.getUserSelling(this.userdata._id)
      } else {
        let parseShoeSell = [...this.userdata.shoeSellProduct]
        let active =  this.parseActive(parseShoeSell)
        let passive = this.parsePassive(parseShoeSell)
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