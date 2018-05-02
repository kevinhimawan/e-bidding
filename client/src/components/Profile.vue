<template>
  <div class="content">
    <NavbarTop></NavbarTop>
    <div class="row">
    <SideBar></SideBar>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import SideBar from './Profile/SideBar'
import NavbarTop from './Reuseable/navbarTop'
import BuyingProfileContent from './Profile/BuyingSite/BuyingProfileContent'
import { mapState } from 'vuex'
  export default {
    components: {
      NavbarTop, SideBar, BuyingProfileContent
    },
    created () {
      if (this.userstatus === 'visitor') {
        router.push({ 
          name: 'Home'
        })
      }
    },
    watch: {
      userstatus () {
        if (this.userstatus === 'visitor') {
          router.push({
            name: 'Home'
          })
        }
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
.row{
  min-height: 700px;
  margin: 0
}
</style>