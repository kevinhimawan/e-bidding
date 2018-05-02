<template>
  <div class="shipping-site">
    <ModalEdittingAddress
      v-bind:addressindex="index"
      v-bind:user="user"></ModalEdittingAddress>
    <ModalAddingAddress></ModalAddingAddress>
    <div class="title">
      <h4 class="title-font">Shipping Info</h4>
      <a class="edit-item">
        <i class="fas fa-edit"></i>
      </a>
      <a class="edit-item" data-target="#Modal-Adding-Address" data-toggle="modal">
        <i class="fas fa-plus"></i>
      </a>
    </div>
    <div class="shipping-content">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Receiver</th>
            <th scope="col">Address</th>
            <th scope="col">City and Province</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, i) in user.address" :key="i">
            <td style="width: 10%">
              <a class="table-content-a a-first">{{val.receiver}}</a>
              <a class="table-content-a">{{val.receiverPhone}}</a>
            </td>
            <td style="width: 30%">
              <a class="table-content-a a-first">{{val.name}}</a>
              <a class="table-content-a">{{val.address}}</a>
            </td>
            <td style="width: 12%">
              <a class="table-content-a">{{val.city}}, {{val.province}}, {{val.zipCode}}</a>
            </td>
            <td style="width: 15%">
              <button type="button" v-on:click="editAddress(i)" class="button-action btn" data-toggle="modal" data-target="#Modal-Editting-Address"><i class="far fa-edit icon"></i>edit</button>
              <button type="button" class="button-action btn"><i class="fas fa-trash-alt icon"></i>remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ModalEdittingAddress from './ShippingInfo/ModalEdittingAddress'
import {mapState, mapActions} from 'vuex'
import ModalAddingAddress from './ShippingInfo/ModalAddingAddress'
export default {
  components: {
    ModalAddingAddress, ModalEdittingAddress
  },
  data () {
    return {
      user: {},
      index: null
    }
  },
  created () {
    if (this.userdata.address) {
      if (typeof this.userdata.address[0] === 'string') {
        this.getUserSetting(this.userdata._id)
      } else {
        this.user = this.userdata
      }
    }
  },
  methods:{
    ...mapActions([
      'getUserSetting'
    ]),
    editAddress (index) {
      this.index = index
    }
  },
  watch: {
    userdata() {
      if (this.userdata.address) {
        if (typeof this.userdata.address[0] === 'string') {
          this.getUserSetting(this.userdata._id)
        } else {
          this.user = this.userdata
        }
      }
    }
  },
  computed: {
    ...mapState([
      'userdata'
    ])
  }
}
</script>

<style scoped>
.shipping-site {
  margin-top: 20px;
}

.title {
  display: flex;
  margin-bottom: 15px;
}
.title-font {
  margin-right: 10px;
}
.edit-item{
  color: #007bff!important;
  margin-right: 10px;
}
.edit-item:hover {
  cursor: pointer
}
th, td {
  text-align: left;
}
th {
  border-top: none;
  font-size: .9em;
}

.table-content-a {
  display: block;
  font-size: .9em;
}

.button-action {
  color: #6c757d;
  background-color: transparent;
  background-image: none;
  border-color: #6c757d;
  padding: 5px 10px;
  border-radius: 1px;
  margin-right: 4px;
  min-width: 75px;
}

.a-first {
  font-weight: 500;
}

.icon {
  margin-right: 3px;
  font-size: .9em;
}
</style>

