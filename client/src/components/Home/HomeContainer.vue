<template>
  <div class="content row">
    <div v-for="(product, i) in homeproductlist" :key="i" class="col-lg-3">
      <div class="card">
        <img class="card-img-top" :src="product.images[0].path">
        <div class="card-body">
          <router-link :to="{name: 'Product', params: {id: product._id}}"><h5 class="card-title">{{product.name}}</h5></router-link>
          <div class="lowest-ask-site">
            <div class="lowest-ask-price">
              <h6 v-if="product.lowestAsk" class="lowest-ask-price-font">IDR {{product.lowestAsk}}k</h6>
              <h6 v-else class="lowest-ask-price-font-none">IDR -</h6>
              <span class="thousand-params">Lowest Ask</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  created () {
    this.getinitializedata()
  },
  methods: {
    ...mapActions([
      'getinitializedata', 'getspecificproduct'
    ]),
  },
  computed: {
    ...mapState([
      'homeproductlist'
    ])
  }
}
</script>

<style scoped>
h1,h2,h3,h4,h5,h6{
  margin: 0
}

.row {
  margin: 0;
  padding: 40px;
}
.card{
  padding: 1em;
}
.card-body{
  padding: 0;
  margin-top: 5px;
  text-align: center;
}

.card-title{
  margin-bottom: .75rem;
  font-size: 1em;
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 7px !important;
  letter-spacing: -0.5px;
  color: #343a40;
}

.card-title:hover{
  cursor: pointer;
  font-style: oblique;
  font-weight: 600;
  text-decoration: none;
}

a:hover{
  text-decoration: none
}

.lowest-ask-font{
  letter-spacing: -0.5px;
  font-size: .9em;
  font-weight: 700;
  text-transform: uppercase
}

.lowest-ask-price-font {
  font-size: .9em;
  font-weight: 500;
  margin-bottom: -2px;
}

.lowest-ask-price-font-none {
  font-size: .9em;
  font-style: oblique;
}

.thousand-params{
  font-size: .8em;
  font-style: oblique;
}
</style>
