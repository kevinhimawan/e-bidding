<template>
  <div>
    <NavbarTop></NavbarTop>
    <ProductContainer></ProductContainer>
  </div>
</template>

<script>
import NavbarTop from './Reuseable/navbarTop'
import ProductContainer from './Product/ProductContainer'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  props: ['id'],
  components: {
    ProductContainer, NavbarTop
  },
  created () {
    const token = localStorage.getItem('kepingan')
    this.getspecificproduct(this.id)
    if (token) {
      this.checkstatus(token)
    } else {
      this.changeuserstatus('visitor')
    }
  },
  methods: {
    ...mapActions([
      'getuserstatus', 'checkstatus', 'usersignout', 'getspecificproduct'
    ]),
    ...mapMutations([
      'changeuserstatus'
    ]),
    signoutbutton () {
      this.usersignout()
    }
  },
  computed: {
    ...mapState([
      'userstatus', 'homespecificproduct'
    ])
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar {
  padding: 10px 70px !important;
}
.navbar-brand {
  font-size: 1.5em;
  font-weight: 400;
}
.navbar-collapse{
  justify-content: flex-end !important;
}
.nav-link:hover{
  cursor: pointer;
}
</style>
