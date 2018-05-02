<template>
  <form class="form-inline my-2 my-lg-0 search_box">
    <input v-on:keyup="getsearchinput" v-on:keyup.13="searchbybutton" v-model="searchinput" class="form-control mr-sm-2 search_input" type="search" placeholder="Search" aria-label="Search">
    <div class="icon_search_box" v-on:click="search">
      <i class="fas fa-search icon_search"></i>
    </div>
  </form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      searchinput: '',
      dropdown: false
    }
  },
  methods: {
    ...mapActions([
      'searchProduct'
    ]),
    search () {
      this.searchProduct(this.searchinput)
    },
    getsearchinput (e) {
      if (this.searchinput.length > 0) {
        this.dropdown = true
      } else {
        this.dropdown = false
      }
    },
    searchbybutton () {
      this.search()
    }
  }
}
</script>

<style scoped>
.search_box {
  border: 1px solid #e6e6e6;
}

.search_input {
  border: none;
  border-radius: 0px;
  margin: 0 !important;
  min-width: 300px;
}

.icon_search_box {
  padding: .3em 10px;
}

.icon_search_box:hover {
  cursor: pointer
}

.icon_search {
  font-weight: 300
}

.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>