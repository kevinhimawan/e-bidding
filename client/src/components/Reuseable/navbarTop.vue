<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Sneaker</a>
    <SearchBoxTop></SearchBoxTop>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li v-if="userstatus === 'User' || userstatus === 'Supplier'" class="nav-item active">
          <router-link class="nav-link" :to="{name: 'Profile'}">My Account</router-link>
        </li>
        <li v-if="userstatus === 'visitor'" class="nav-item active">
          <router-link class="nav-link" :to="{name: 'Registration'}">Login/Signup</router-link>
        </li>
        <li v-if="userstatus === 'Admin'" class="nav-item active">
          <router-link class="nav-link" :to="{name: 'Admin'}">Admin</router-link>
        </li>
        <li v-if="userstatus !== 'visitor'" class="nav-item active">
          <router-link v-on:click.native="signoutbutton" class="nav-link" :to="{name: 'Home'}">Signout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import SearchBoxTop from './SearchBoxTop'
export default {
  components: {
    SearchBoxTop
  },
  created () {
    this.checkstatus()
  },
  methods: {
    ...mapActions([
      'getuserstatus', 'checkstatus', 'usersignout'
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
      'userstatus'
    ])
  }
}
</script>

<style scoped>
.navbar {
  padding: 15px 50px !important;
}
.navbar-brand {
  font-size: 1.5em;
  font-weight: 400;
  margin-right: 1.1em
}
.navbar-collapse{
  justify-content: flex-end !important;
}
.nav-link:hover{
  cursor: pointer;
}
</style>