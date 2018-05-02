<template>
  <div class="content">
    <additem></additem>
    <addsize></addsize>
    <addbrand></addbrand>
    <addsupplier></addsupplier>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/" class="navbar-brand">Sneaks it</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a data-toggle="modal" data-target="#add-supplier" class="nav-link">New Supplier</a>
          </li>
          <li class="nav-item">
            <a data-toggle="modal" data-target="#add-brand-modal" class="nav-link">Add Brand</a>
          </li>
          <li class="nav-item">
            <a data-toggle="modal" data-target="#add-item-modal" class="nav-link">Add Item</a>
          </li>
          <li class="nav-item">
            <a data-toggle="modal" data-target="#add-item-size-modal" class="nav-link">Add Size</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <sidebar></sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import addsupplier from '@/components/Admin/AddSupplier'
import addbrand from '@/components/Admin/AddBrand'
import sidebar from '@/components/Admin/SideBar'
import router from '@/router'
import addsize from '@/components/Admin/AddSize'
import additem from '@/components/Admin/AddItem'
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  components: {
    additem, addsize, sidebar, addbrand, addsupplier
  },
  data () {
    return {

    }
  },
  created () {
    const token = localStorage.getItem('kepingan')

    if (token) {
      this.checkstatus(token)
      this.getshoesdata()
      this.getallbrand()
    } else {
      this.changeuserstatus('visitor')
      router.push({
        name: 'Home'
      })
    }
  },
  watch: {
    userstatus () {
      if (this.userstatus !== 'Admin') {
        router.push({
          name: 'Home'
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'checkstatus', 'usersignout', 'getshoesdata', 'getallbrand'
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
      'userstatus', 'allshoesdataadmin'
    ])
  }
}
</script>

<style scoped>
.navbar {
  padding: 15px 40px !important;
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
.row{
  min-height: 700px;
  margin: 0
}

</style>
