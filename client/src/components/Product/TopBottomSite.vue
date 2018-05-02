<template>
  <div class="top-bottom-site col-lg-12">    
  <ModalViewAllAsk
    v-bind:sizeNum="selectSize"></ModalViewAllAsk>
  <ModalViewAllBid
    v-bind:sizeNum="selectSize"></ModalViewAllBid>
    <!-- Left Site -->
    <div class="pick-size col-lg-1">
      <h5 class="pick-size-font">Size</h5>
      <div class="dropdown">
        <button class="btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="select-size-font">{{selectSize}}</span>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div v-for="(size, i) in homespecificproduct.sizeNew" @click="pickSize(size.eu, size.HighestBid, size.LowestAsk, size._id)" :key="i" class="dropdown-item col-lg-12">
            <div class="size-site col-lg-4">
              <h6 class="size-site-font">{{size.eu}}</h6>
            </div>
            <div class="market-info col-lg-8">
              <div class="bid-site-info">
                <h6 v-if="size.HighestBid" class="bidAsk-site-info-font">Highest Bid Rp {{size.HighestBid.toLocaleString()}}k</h6>
                <h6 v-else class="bidAsk-site-info-font">Highest Bid -</h6>
              </div>
              <div class="ask-site-info">
                <h6 v-if="size.LowestAsk" class="bidAsk-site-info-font">Lowest Ask Rp {{size.LowestAsk.toLocaleString()}}k</h6>
                <h6 v-else class="bidAsk-site-info-font">Lowest Ask -</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="size-information col-lg-10">
      <ButtonBid
        v-bind:HighestBid="changeHighestBid"></ButtonBid>
      <ButtonAsk
        v-bind:LowestAsk="changeLowestAsk"></ButtonAsk>
    </div>
  </div>
</template>

<script>
import ModalViewAllBid from '@/components/Product/TopBottomSite/Modal-View-All-Bid'
import ModalViewAllAsk from '@/components/Product/TopBottomSite/Modal-View-All-Ask'
import ButtonAsk from '@/components/Product/TopBottomSite/Button-Ask'
import ButtonBid from '@/components/Product/TopBottomSite/Button-Bid'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
    ButtonBid, ButtonAsk, ModalViewAllBid, ModalViewAllAsk
  },
  data () {
    return {
      selectSize: 'All',
      modalinfoask: true,
      changeHighestBid: '',
      changeLowestAsk: '' 
    }
  },
  methods: {
    ...mapMutations([
      'pickSizeNumber', 
    ]),
    pickSize (size,bid,ask, sizeid ) {
      this.selectSize = size
      this.changeHighestBid = bid
      this.changeLowestAsk = ask
      this.pickSizeNumber(sizeid)
    },
  },
  computed: {
    ...mapState([
      'homespecificproduct', 'userstatus'
    ])
  }
}
</script>

<style scoped>

.top-bottom-site {
  display: flex;
  padding: 0;
  margin-bottom: 20px;
}

.pick-size {
  padding: 0;
  min-width: 100px;
  border-right: 1px solid #ccc;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.select-size-font {
  font-size: 1.5em;
  font-weight: 500;
}

.pick-size-font {
  text-align: center;
  margin-bottom: 2px;
}

.btn-secondary {
  color: #6c757d !important;
  background-color: white !important;
  border: none !important;
}
.btn-secondary:focus{
  outline: none !important;
  border: none !important
}

.dropdown-toggle {
  color: #6c757d !important;
  background-color: white !important;
  border: none !important;
}

.dropdown-toggle:focus{
  outline: none !important;
  border: none !important
}

.btn-secondary:hover {
  cursor: pointer;
  background-color: white !important;
  border: none !important;
}

.dropdown-toggle:hover {
  cursor: pointer;
  background-color: white !important;
  border: none !important;
}

.dropdown-toggle {
  min-width: 78px;
}

.size-site-font {
  margin: 0;
  font-weight: 400;
  font-size: .9em
}

.size-site {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-item:hover{
  cursor: pointer;
}

.dropdown-item {
  padding: 7px 5px;
  min-width: 240px;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
}

.market-info {
  display: flex;
  flex-direction: column;
  padding: 0
}

.bidAsk-site-info-font {
  font-size: .8em;
}

.bid-site-info {
  margin-bottom: 5px;
}

.size-information {
  padding-left: 20px;
  display: flex;
}

.buttons {
  margin-bottom: 5px;
}

.button-info-bid {
  padding: 5px 20px;
  display: flex;
  background: #28a745;  
  border-radius: 5px;
  min-width: 140px;
  justify-content: center;
  align-items: center;
}

.bidding-button-site {
  margin-right: 40px;
}

.button-info-ask {
  background: #ff5a5f;
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  min-width: 140px;
  justify-content: center;
  align-items: center;
}

.button-info-price-font {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
}

.button-info-footer {
  display: flex;
  justify-content: center;
}

.thousand-params{
  font-size: 1em;
  color: #c6e6c2;
  font-weight: 500;
}

.button-right-site {
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid white;
}

.bid-or-ask {
  color: white;
  font-weight: 500;  
}

.info-detail-table {
  text-align: center;
}

.view-all-font {
  font-weight: 500;
}

.view-all-font:hover {
  cursor: pointer;
}
</style>
