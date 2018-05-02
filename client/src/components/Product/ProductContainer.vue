<template>
  <div v-if="homespecificproduct.images" class="content row">
    <ModalInfoBid></ModalInfoBid>
    <ModalInfoAsk></ModalInfoAsk>
    <ModalAskingSite></ModalAskingSite>
    <ModalBiddingSite></ModalBiddingSite>
    <ModalLoginSite></ModalLoginSite>
    <div class="top-site col-lg-12">
      <div class="brand-name">
        <h5 class="brand-name-font">{{homespecificproduct.brand.name}}</h5>
      </div>
      <div class="product-name">
        <h1 class="product-name-font">{{homespecificproduct.name}}</h1>
      </div>
      <div class="basic-info">
      <div class="basic-info-content">
        <span class="basic-info-content-each">Seller:</span>
          <a class="basic-info-content-number">{{homespecificproduct.shoeSellProduct.length}}</a>
        </div>
        <span class="divider-pipe">|</span>
        <div class="basic-info-content">
          <span class="basic-info-content-each">Bidder:</span>
          <a class="basic-info-content-number">{{homespecificproduct.shoeBidding.length}}</a>
        </div>
        <span class="divider-pipe">|</span>
        <div class="basic-info-content">
          <span class="basic-info-content-each">Sold:</span>
          <a class="basic-info-content-number">{{homespecificproduct.transaction.length}}</a>
        </div>
      </div>
      <TopBottomSite></TopBottomSite>
    </div>
    <div class="middle-site col-lg-12">
      <div class="col-lg-2 left-middle-site">
        <img v @click="changeImage(i)" class="card-img-top left-image" v-for="(img, i) in homespecificproduct.images" :key="i" :src="img.path" alt="">
      </div>
      <div class="col-lg-8 middle-middle-site">
        <img class="card-img-top" :src="images" alt="">
      </div>
    </div>
    <div class="bottom-site col-lg-12">
      <div class="left-bottom-site col-lg-4">
        <div v-if="prop !== 'size' && prop !== 'images' 
        && prop !== 'shoeSellProduct' && prop !== 'shoeBidding' 
        && prop !== 'transaction' && prop !== '_id' 
        && prop !== 'description' && prop !== 'brand'
        && prop !== 'retail' && prop !== 'Retail'
        && prop !== 'name' && prop !== '__v' && prop !== 'release'
        && prop !== 'sizeNew' && prop !== 'highestBid' && prop !== 'lowestAsk'" 
        v-for="(content, prop) in homespecificproduct" :key="prop" class="shoe-info-content">
          <h6 class="shoe-info-content-key">{{prop}}</h6> 
          <h6 class="shoe-info-content-desc">{{content}}</h6>
        </div>
        <div v-else-if="prop === 'Retail'" class="shoe-info-content">
          <h6 class="shoe-info-content-key">{{prop}}</h6>
          <h6 class="shoe-info-content-desc">IDR {{content}}k</h6>
        </div>
      </div>
      <div class="right-bottom-site col-lg-8">
        <div v-html="homespecificproduct.description" class="description-site" v-bind:class="{ setheight: isActive }"></div>
        <a v-if="isActive" @click="openCloseDesc" class="read-more">Read More</a>
        <a v-if="!isActive" @click="openCloseDesc" class="read-more">Show Less</a>
      </div>
    </div>
  </div>
</template>
<script>
import ModalInfoBid from '@/components/Product/Modal-Info-Bid'
import ModalInfoAsk from '@/components/Product/Modal-Info-Ask'
import ModalAskingSite from '@/components/Product/Modal-Asking-Site'
import ModalBiddingSite from '@/components/Product/Modal-Bidding-Site'
import TopBottomSite from '@/components/Product/TopBottomSite'
import ModalLoginSite from '@/components/Product/Modal-Login-Site'
import {mapState} from 'vuex'
export default {
  components: {
    TopBottomSite, ModalInfoBid, ModalInfoAsk, ModalAskingSite, ModalBiddingSite, ModalLoginSite
  },
  data () {
    return {
      images: '',
      index: 0,
      isActive: true,
      triggerImage: 0
    }
  },
  methods: {
    changeImage (index) {
      this.images = this.homespecificproduct.images[index].path
      this.index = index
    },
    openCloseDesc () {
      if (this.isActive) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    }
  },
  props: ['id'],
  updated () {
    if (this.homespecificproduct.images && this.triggerImage === 0) {
      this.images = this.homespecificproduct.images[0].path
      this.triggerImage++
    }
  },
  created () {
    if (this.homespecificproduct.images) {
      this.images = this.homespecificproduct.images[0].path
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
h1,h2,h3,h4,h5,h6{
  margin: 0
}

.row {
  margin: 0;
  padding: 20px 70px;
}

.top-site,.middle-site,.bottom-site,.left-middle-site, .left-bottom-site, .right-bottom-site{
  padding: 0;
}

.top-site {
  text-align: left;
}

.brand-name-font {
  color: #0066c0;
}

.brand-name-font:hover{
  cursor: pointer;
}

.basic-info{
  display: flex;
  margin-bottom: 20px;
  margin-top: 5px;
}
.basic-info-content{
  display: flex;
}

.basic-info-content-each{
  margin-right: 8px;
  font-size: 1.2em;
  font-weight: 400;
  color: #999;
}
.basic-info-content-number{
  font-size: 1.2em;
  font-weight: 500;
}
.divider-pipe{
  font-weight: 600;
  padding: 0 40px;
}

.middle-site{
  display: flex;
}

.left-image {
  margin-bottom: 10px;
}

.left-image:hover{
  cursor: pointer;
}

.left-middle-site {
  max-width: 11%;
}

.middle-middle-site {
  margin-left: 78px  
}

.bottom-site {
  display: flex;
  text-align: left;
}

.shoe-info-content {
  display: flex;
}

.shoe-info-content{
  margin-bottom: 10px;
}

.shoe-info-content-key {
  text-transform: uppercase;
  margin-right: 10px;
  letter-spacing: 1px;
}
.shoe-info-content-desc {
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.description-site{
  margin-bottom: 10px;
}
.setheight {
  height: 124px;
  overflow: hidden;
}
.read-more {
  color: #007bff !important;
}
.read-more:hover{
  text-decoration: none;
  cursor: pointer;
}
</style>
