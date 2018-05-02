<template>
  <div class="contentsite">
    <ModalResetPassword></ModalResetPassword>
    <ModalEditBasicProfile
      v-bind:datauser="user"></ModalEditBasicProfile>
    <div class="title">
      <h4 class="title-font">Profile</h4>
      <a class="edit-item" data-toggle="modal" data-target="#Modal-Edit-Profile">
        <i class="fas fa-edit"></i>
      </a>
    </div>
    <div class="profile-content col-lg-12">
      <!-- Name -->
      <div class="profile-content-section">
        <div class="profile-content-title">
          <h5 class="profile-content-title-font">Name</h5>
        </div>
        <div class="profile-content-word">
          <a>{{user.username}}</a>
        </div>
      </div>
      <!-- Email Address -->
      <div class="profile-content-section">
        <div class="profile-content-title">
          <h5 class="profile-content-title-font">Email Address</h5>
        </div>
        <div class="profile-content-word">
          <a>{{user.email}}</a>
        </div>
      </div>
      <!-- Reseting Password -->
      <div class="profile-content-section">
        <div class="profile-content-title">
          <h5 class="profile-content-title-font">Reset Password</h5>
        </div>
        <div class="profile-content-word">
          <a class="reseting-password-font" data-toggle="modal" data-target="#Reset-Password">Reseting your password</a>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import ModalEditBasicProfile from './BasicProfile/EditBasicProfile'
import ModalResetPassword from './BasicProfile/ResetPassword'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    ModalResetPassword, ModalEditBasicProfile
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    const kepingan = localStorage.getItem('kepingan')
    if ( Object.keys(this.userdata).length === 0 ) {
      this.getuserdata(kepingan)
    } else {
      this.user = this.userdata
    }
  },
  methods: {
    ...mapActions([
      'getuserdata'
    ])
  },
  watch: {
    userdata () {
      this.user = this.userdata
    }
  },
  computed: {
    ...mapState([
      'userdata', 
    ])
  }
}
</script>

<style scoped>
.contentsite {
  width: 100%;
  margin-top: 20px;
  padding: 0;
}
.title {
  display: flex;
  margin-bottom: 15px;
}
.title-font {
  margin-right: 10px;
}
.edit-item{
  color: #007bff!important
}
.edit-item:hover {
  cursor: pointer
}
.profile-content {
  padding: 0;
  display: flex;
  flex-direction: column;
}
.profile-content-section {
  text-align: left;
  margin-bottom: 15px;
}
.profile-content-title {
  margin-bottom: 10px;
}
.profile-content-title-font {
  font-weight: 700;
}

.reseting-password-font {
  color: #007bff !important;
}

.reseting-password-font:hover {
  cursor: pointer;
}

hr {
  margin: 20px 0;
  border-top-color: #999 ;
}
</style>