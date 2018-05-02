<template>
  <div class="passive-buying row">
    <SellingDetailInactive
     v-bind:data="detail"></SellingDetailInactive>
    <div class="title-site col-lg-12">
      <h4 class="title-site-font">Selling Non-Active</h4>
    </div>
    <div class="active-buying-content col-lg-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="th-name">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Sell Amount</th>
            <th scope="col">Sell End</th>
            <th scope="col">Lowest Ask</th>
            <th scope="col">Highest Bid</th>
          </tr>
        </thead>
        <tbody v-if="passiveData && passiveData.length > 0">
          <tr data-toggle="modal" data-target="#Modal-Selling-Inactive-Detail" v-on:click="showDetail(i)" v-for="(bid, i) in passiveData" :key="i">
            <td class="table-name">{{bid.shoeProduct.name}}</td>
            <td class="table-size">{{bid.size.eu}}</td>
            <td>IDR {{bid.price.toLocaleString()}}k</td>
            <td>{{bid.parseDestroy}}</td>
            <td v-if="bid.lowestAsk === null">No Seller</td>
            <td v-else-if="bid.lowestAsk === 'noneislowest'">You the lowest</td>
            <td v-else>{{bid.lowestAsk}}</td>
            <td v-if="bid.highestBid === null">No Bidder</td>
            <td v-else>{{bid.highestBid}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <h6 class="no-result">No result</h6>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SellingDetailInactive from './SellingDetail/SellingDetailInactive'
export default {
  components: {
    SellingDetailInactive
  },
  props: ['passiveData'],
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    showDetail (index) {
      this.detail = this.passiveData[index]
    }
  }
}
</script>

<style scoped>
.col-lg-12 {
  padding: 0
}

.passive-buying{
  width: 100%;
  margin: 0 !important;
  margin-bottom: 20px !important;
}
.title-site {
  margin-bottom: 20px;
  text-align: left;
}

td {
  max-width: 25%;
  height: 73px;
  overflow: hidden;
}

.th-name {
  text-align: left;
}

.table-name {
  text-align: left;
  width: 30% !important;
}

.table-size {
  width: 10% !important;
}

.no-result {
  margin: 0;
  margin-top: 10px;
  text-align: left;
  font-weight: 300;
  font-style: oblique;
}

.table thead th {
  font-size: .9em !important;
} 

.table td {
  font-size: .9em !important;
}

tbody tr:hover {
  background-color: #efefef;
  cursor: pointer;
}
</style>