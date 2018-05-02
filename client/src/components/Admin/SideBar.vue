<template>
  <nav id="sidebar" class="col-lg-2">
    <!-- Sidebar Links -->
    <ul class="list-unstyled components">
      <li>
        <a href="#shoes" data-toggle="collapse" aria-expanded="false">Shoes</a>
        <ul class="collapse list-unstyled ul" id="shoes">
          <li v-for="(brand, i) in allbrand" :key="i">
            <router-link :to="{name: 'shoesadmin', params: {brandid: brand._id}}">{{brand.name}} ({{brand.shoeProduct.length}})</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      products: []
    }
  },
  computed: {
    ...mapState([
      'allshoesdataadmin', 'allbrand'
    ])
  }
}
</script>

<style scoped>
#sidebar {
  background-color: #f8f9fa;
  padding: 20px 20px 20px 40px;
  text-align: left;
}

.ul{
  padding-left: 10px;
}
</style>
