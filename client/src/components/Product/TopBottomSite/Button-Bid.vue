<template>
  <div class="bidding-button-site">
    <!-- Bid Button -->
    <div class="buttons">
      <div class="button-info-bid">
        <div v-bind:class="{padding_off: isActive}" class="button-left-site">
          <h6 v-if="homespecificproduct.highestBid && highestBid !== undefined" class="button-info-price-font">IDR {{highestBid}}</h6>
          <h6 v-else class="button-info-price-font">IDR -</h6>
          <div class="button-info-footer">
            <span class="thousand-params">Highest Bid</span>
          </div>
        </div>
        <div @click="buttonInfoBid" v-if="userstatus === 'User' || userstatus === 'visitor'" class="button-right-site">
          <h6 class="bid-or-ask">BID</h6>
        </div>
      </div>
    </div>
  <!-- Table -->
    <div class="info-detail-table">
      <a @click="openTableBid" data-toggle="modal" class="view-all-font" data-target="#ModalViewAllBid">View All Bids</a>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      modalinfobid: true,
      isActive: true,
      highestBid: '',
    }
  },
  props: ['HighestBid'],
  created () {
    this.highestBid = this.homespecificproduct.highestBid
    if(this.userstatus === 'User' || this.userstatus === 'visitor') {
      this.isActive = false
    } else {
      this.isActive = true
    }
  },
  methods: {
    ...mapMutations([
      'changebiddingstatus', 'changetablebidmodal'
    ]),
    buttonInfoBid () {
      if (this.modalinfobid) {
        this.changebiddingstatus()
        this.modalinfobid = false
        $('#modal-info-bid').modal('show')
      } else {
        $('#Modal-Bidding-Site').modal('show')
        this.changebiddingstatus()
      }
    },
    openTableBid () {
      this.changetablebidmodal()      
    },
  },
  computed: {
    ...mapState([
      'userstatus', 'homespecificproduct'
    ])
  },
  watch: {
    HighestBid () { 
      this.highestBid = this.HighestBid
    },
    homespecificproduct () {
      this.highestBid = this.homespecificproduct.highestBid
    } 
  }
}
</script>

<style scoped>
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

.button-left-site {
  padding-right: 15px;
  justify-content: center;
}

.padding_off {
  padding-right: 0px !important;
}

.button-info-price-font {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
  text-align: center;
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

.button-right-site:hover{
  cursor: pointer;
}

.bid-or-ask {
  color: white;
  font-weight: 500;  
}

.info-detail-table {
  text-align: center;
  margin-top: 5px
}


.view-all-font {
  font-weight: 500;
}

.view-all-font:hover {
  cursor: pointer;
}
</style>