<template>
  <div class="col-lg-10 row">
    <div v-for="(product, i) in brandproduct" :key="i" class="card col-lg-3">
      <img class="card-img-top" :src="product.images[0].path">
      <div class="card-body">
        <div class="title">
          <router-link class="card-title" :to="{name: 'shoeadmin', params: {shoeid: product._id}}">{{product.name}}</router-link>
        </div>
        <div class="card-info">
          <div class="card-info-each col-lg-4">
            <router-link class="card-info-each-font" style="justify-content:flex-start" :to="{}">Sell {{product.shoeSellProduct.length}}</router-link>
          </div>
          <div class="card-info-each col-lg-4">
            <router-link class="card-info-each-font" style="justify-content:center" :to="{}">Bid {{product.shoeBidding.length}}</router-link>
          </div>
          <div class="card-info-each col-lg-4">
            <router-link class="card-info-each-font" style="justify-content:flex-end" :to="{}">Transaction {{product.transaction.length}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  props: ['brandid'],
  created () {
    this.getproduct()
  },
  methods: {
    ...mapActions ([
      'getbrandproduct'
    ]),
    getproduct () {
      this.getbrandproduct(this.brandid)
    }
  },
  watch: {
    brandid () {
      this.getproduct()
    }
  },
  computed: {
    ...mapState([
      'brandproduct'
    ])
  }
}
</script>

<style scoped>
.row{
  margin: 0;
  padding: 20px;
}
.card{
  padding: .7em;
  max-height: 255px;
  border: none
}
.card:hover{
  border: 1px solid rgba(0,0,0,.125)
}
.card-body{
  padding: 0;
  text-align: left;
}
.title{
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 18px;
  margin-bottom: .5em;
}
.card-title{
  font-family: inherit;
  font-weight: 500;
  color: inherit;
}
.card-title:hover{
  text-decoration: none;
}
.card-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.card-info-each{
  padding: 0;
  display: flex;
}
.card-info-each-font{
  font-size: .8em;
}
</style>
