<template>
  <div class="history-buying row">
    <div class="title-site">
      <h4 class="title-site-font">Bidding History</h4>
    </div>
    <div class="active-buying-content col-lg-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="table-name">Name</th>
            <th scope="col" class="table-size">Size</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Price</th>
            <th scope="col">Seller</th>
          </tr>
        </thead>
        <tbody v-if="historyData">
          <tr v-for="(data, i) in historyData" :key="i">

            <td class="table-name">{{data.productid.name}}</td>
            <td class="table-size">{{data.bidding.size.eu}}</td>
            <td>{{data.parseCreated}}</td>
            <td>IDR {{data.nominal.toLocaleString()}}k</td>
            <td>{{data.seller.username}}</td>
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
export default {
  props: ['historyData']
}
</script>

<style scoped>
.col-lg-12 {
  padding: 0
}

.history-buying{
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
  width: 26% !important;
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
</style>