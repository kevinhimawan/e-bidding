<template>
  <nav id="sidebar" class="col-lg-3 sidebar">
    <ul class="list-group">
      <li class="list-group-item username">
        <h1 class="username-font">{{userdata.username}}</h1>
      </li>
      <router-link v-if="userstatus === 'User'" :to="{ name: 'BuyingProfileContent' }" v-on:click.native="seeBuying(user._id)" class="list-group-item standard" >
        <div class="list-content">
          <i class="fas fa-shopping-cart icon"></i>
          <a class="list-content-font" v-bind:class="{ colorHover: isActiveColor }" >Buying</a>
        </div>
      </router-link>
      <router-link v-if="userstatus === 'Supplier'" :to="{ name: 'SellingProfileContent' }" class="list-group-item standard" v-on:click.native="seeSelling(userdata._id)"  >
        <div class="list-content">
          <i class="fas fa-money-bill-alt icon"></i>
          <a class="list-content-font" v-bind:class="{ colorHover: isActiveColor }">Selling</a>
        </div>
      </router-link>
      <router-link :to="{ name: 'SettingProfile' }" class="list-group-item standard" v-on:click.native="seeSetting(user._id)">
        <div class="list-content">
          <i class="fas fa-wrench icon"></i>
          <a class="list-content-font" v-bind:class="{ colorHover: isActiveColor }">Setting</a>
        </div>
      </router-link>
    </ul>
  </nav>    
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      isActiveColor: false,
      user: {}
    }
  },
  created() {
    const kepingan = localStorage.getItem('kepingan')
    this.getuserdata(kepingan)
  },
  methods: {
    ...mapActions([
      'getuserdata', 'getUserSelling', 'getUserBuying', 'getUserSetting'
    ]),
    seeSelling (id) {
      this.getUserSelling(id)
    },
    seeBuying (userid) {
      this.getUserBuying(userid)
    },
    seeSetting (userid) {
      this.getUserSetting(userid)
    }
  },
  watch: {
    userdata () {
      this.user = this.userdata
    }
  },
  computed: {
    ...mapState([
      'userdata', 'userstatus'
    ])
  }
}
</script>

<style scoped>
.sidebar {
  max-width: 20% !important;
  padding: 0;
  background-color: #f8f9fa
}

.list-group-item {
  border: none;
  padding: 1em;
  padding-left: 1.5em;
  text-align: left;
  background: #f8f9fa !important;
  color: inherit;
}

.standard:hover {
  cursor: pointer;
  background-color: #f5f5f5 !important;
}

.standard:hover > .list-content-font {
}

.username {
  padding: 1.2em 1em 1.2em 1.5em !important;
}

.username-font {
  font-size: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
}

.list-content {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 15px;
  font-size: 1em;
  color: inherit !important; 
}
.list-content-font {
  font-size: 1.2em;
  text-transform: uppercase;
}

.colorHover {
  color: #20939a !important;  
}

</style>