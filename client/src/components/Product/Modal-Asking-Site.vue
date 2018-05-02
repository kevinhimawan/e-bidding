<template>
  <div id="Modal-Asking-Site" class="modal" tabindex="-1" role="dialog" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ask Site</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body col-lg-12">
        <!-- Left Side -->
          <div class="left-site col-lg-2">
            <img class="card-img-top" :src="homespecificproduct.images[0].path" :alt="homespecificproduct.images[0].name">
          </div>
        <!-- ssMiddle Side -->
          <div class="middle-site col-lg-7">
            <div class="product-title">
              <h4 class="product-title-font">{{homespecificproduct.name}}</h4>
            </div>
            <div class="product-style">
              <h5 class="product-style-font">{{homespecificproduct.style}}</h5>
            </div>
            <div class="bid-ask-info">
              <span v-if="highestbid" class="bid-ask-info-font">highest bid: Rp {{highestbid.toLocaleString()}}k</span>
              <span v-else class="bid-ask-info-font">highest bid: -</span>
              <span class="seperator">|</span>
              <span v-if="lowestask" class="bid-ask-info-font">lowest ask: Rp {{lowestask.toLocaleString()}}k</span>
              <span v-else class="bid-ask-info-font">lowest ask: -</span>
            </div>
            <div v-if="price !== ''" class="asking-feedback">
              <h6 v-if="price <= highestbid" class="asking-feedback-font good">You're about to sell at the highest Bid price</h6>
              <h6 v-else-if="price < lowestask" class="asking-feedback-font good">You're about to be the lowest Ask</h6>
              <h6 v-else-if="price === lowestask" class="asking-feedback-font warning">You're about to match the lowest Ask. Their Ask will be accepted before yours</h6>
              <h6 v-else-if="price > lowestask" class="asking-feedback-font warning">You're not the lowest Ask</h6>
              <h6 v-else-if="lowestask === undefined" class="asking-feedback-font good">You're about to be the lowest Ask</h6>
            </div>
          </div>
        <!-- Right Side -->
          <div class="right-site col-lg-3">
          <!-- Top Side -->
            <div class="right-top-site col-lg-12">
            <!-- Select Size -->
              <div class="select-size-dropdown col-lg-5">
                <h6 class="select-title">Size</h6>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{size}}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div v-for="(size, i) in homespecificproduct.sizeNew" @click="pickSize(size.eu, size.HighestBid, size.LowestAsk, size._id)" :key="i" class="dropdown-item col-lg-12">
                      <div class="size-site col-lg-4">
                        <h6 class="size-site-font">{{size.eu}}</h6>
                      </div>
                      <div class="market-info col-lg-8">
                        <div class="bid-site-info">
                          <h6 v-if="size.HighestBid" class="bidAsk-site-info-font">Highest Bid IDR {{size.HighestBid.toLocaleString()}}K</h6>
                          <h6 v-else class="bidAsk-site-info-font">Highest Bid -</h6>
                        </div>
                        <div class="ask-site-info">
                          <h6 v-if="size.LowestAsk" class="bidAsk-site-info-font">Lowest Ask IDR {{size.LowestAsk.toLocaleString()}}K</h6>
                          <h6 v-else class="bidAsk-site-info-font">Lowest Ask -</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- Select Duration -->
              <div class="select-expired dropdown col-lg-6">
                <h6 class="select-title">Duration</h6>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{duration}}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item duration" @click="chooseDuration('1 Day')">1 Day</a>
                    <a class="dropdown-item duration" @click="chooseDuration('3 Days')">3 Days</a>
                    <a class="dropdown-item duration" @click="chooseDuration('7 Days')">7 Days</a>
                    <a class="dropdown-item duration" @click="chooseDuration('14 Days')">14 Days</a>
                    <a class="dropdown-item duration" @click="chooseDuration('30 Days')">30 Days</a>
                    <a class="dropdown-item duration" @click="chooseDuration('60 Days')">60 Days</a>
                  </div>
                </div>
              </div>
            </div>
          <!-- Ask Site -->
            <div class="right-ask-site col-lg-12">
              <h6 class="right-ask-title">Ask</h6>
              <div class="right-ask-input-nest">
                <input :disabled="select === 0" v-model="price" placeholder="IDR" type="number" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="submitAsk" class="btn submit-button">Place New Ask</button>
          <small v-if="errorSize === 1" class="unselect-size">Please select desire size</small>
          <small v-if="errorPrice === 1" class="unselect-size">Please set your ask price</small>
          <small class="expired-info">Expired in {{duration}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      highestbid: '',
      lowestask: '',
      size: 'All',
      duration: '1 Day',
      price: '',
      select: 0,
      errorSize: 0,
      errorPrice: 0,
      sizeid: ''
    }
  },
  methods: {
    ...mapActions([
      'submitaskingform', 'transactionproceedask'
    ]),
    pickSize (name, highest, lowest, sizeid) {
      if (this.errorSize === 1) {
        this.errorSize = 2
      }
      this.errorSize = 2
      this.size = name
      this.lowestask = lowest
      this.highestbid = highest
      this.select = 1
      this.sizeid = sizeid
    },
    chooseDuration (duration) {
      this.duration = duration
    },
    submitAsk () {
      let kepingan = localStorage.getItem('kepingan')
      if (this.errorSize !== 2) {
        this.errorSize = 1
      } else if (this.errorPrice !== 2) {
        this.errorPrice = 1 
      } else {
        if (kepingan) {
          let formCreateAsk = {
            productid: this.homespecificproduct._id,
            sizeid: this.sizeid,
            price: Number(this.price),
            duration: Number(this.duration.split(' ')[0]),
            token: kepingan,
          }
          if (this.highestbid >= this.price) {
            let formTransaction = {
              productid: this.homespecificproduct._id,
              sizeid: this.sizeid,
              price: Number(this.highestbid),
              token: kepingan,
              duration: Number(this.duration.split(' ')[0]),
            }
            this.transactionproceedask(formTransaction)
          } else {
            $('#Modal-Asking-Site').modal('hide')
            this.submitaskingform(formCreateAsk)
          }
        } else {
          $('#Modal-Asking-Site').modal('hide')
          $('#Modal-Login-Site').modal('show')
        }
      }
    }
  },
  mounted () {
    this.highestbid = this.homespecificproduct.highestBid
    this.lowestask = this.homespecificproduct.lowestAsk
  },
  watch: {
    price () {
      let numbPrice = Number(this.price)
      if (numbPrice === 0) {
        this.price = ''
        this.errorPrice = 1
      }  else {
        this.errorPrice = 2
        this.price = numbPrice
      }
    }
  },
  computed: {
    ...mapState([
      'homespecificproduct'
    ]),
  }
}
</script>

<style scoped>
.form-control:focus {
  border-color: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
/* Header */
  .modal-dialog {
    max-width: 1000px;
  }

  .modal-content {
    border: none
  }

  .modal-header {
    background-color: #ff5a5f
  }

  .modal-title {
    color: white
  }

/* Body */
  .modal-body {
    display: flex;
  }
  .left-site, .middle-site, .right-site{
    padding: 0 8px
  }

  .middle-site {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .product-style {
    margin-bottom: 10px
  }

  .product-style-font {
    font-weight: 300;
  }

  .bid-ask-info {
    display: flex;
  }
  
  .seperator {
    margin: 0 10px;
    color: grey;
  }

  .bid-ask-info-font {
    font-weight: 500;
    text-transform: uppercase;
  }

/* Right Site */

  .right-top-site {
    display: flex;
    padding: 0
  }

  .select-size-dropdown,.select-expired {
    padding: 0;
  }
  
  .select-size-dropdown {
    margin-right: 10px;
  }

  .select-title {
    margin-bottom: 5px;
    text-align: left;
  }

  .form-control {
    border-radius: 0px;
    padding: .375em .5em;
    min-height: 50px;
    font-size: 1.2em
  }

  *:focus {
    outline: none !important;
  }

  .right-ask-title {
    font-weight: 500;
    color: #ff5a5f;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .right-ask-site {
    margin-top: 20px;
    padding: 10px;
    text-align: left;
    border: 1px solid #ababab;
  }

  .asking-feedback {
    margin-top: 20px
  }

  .good {
    color: #41ad33
  }

  .warning{
    color: #ff5a5f
  }

  input:disabled {
    background: white !important;
  }

  .modal-footer {
    flex-direction: column;
    align-items: flex-end;
  }

  .submit-button {
    margin-bottom: 10px;
    background-color: #ff5a5f;
    color: white;
    font-weight: 500;
  }

  .expired-info {
    font-size: .9em;
    font-weight: 500;
  }

  .unselect-size {
    font-size: .9em;
    font-weight: 500;
    color: #f72f2f
  }
  /* DropDown Size */
    .dropdown-menu {
      padding: 0
    }

    .dropdown-toggle {
      width: 100%
    }

    .dropdown-menu {
      min-width: 5em !important;
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

    .duration {
      min-width: 100px !important;
      padding: 5px 18px;
      border: none;
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
</style>
