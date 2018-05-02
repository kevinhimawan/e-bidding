<template>
  <div id="Modal-Edit-Profile" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Profile</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="firstname">First Name</label>
                <input v-model="user.firstname" type="text" class="form-control" id="firstname">
              </div>
              <div class="form-group col-lg-6">
                <label for="lastname">Last Name</label>
                <input v-model="user.lastname" type="text" class="form-control" id="lastname">
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input autocomplete="off" v-on:keyup="checkemail" v-model="user.email" type="text" class="form-control" id="email">
              <small v-if="emailerror" id="emailerror" class="form-text text-muted">Invalid email address.</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="submit" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['datauser'],
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: ''
      },
      emailerror: false
    }
  },
  created () {
    if ( Object.keys(this.datauser).length !== 0 ) {
      this.fillUser()
    }
  },
  methods: {
    ...mapActions([
      'changeuserbasicprofile'
    ]),
    fillUser () {
      let user = {... this.datauser}
      let userSplit = user.username.split(' ')
      this.user.firstname = userSplit[0]
      let lastname = ''
      for (let i = 1; i < userSplit.length; i++) {
        i === (userSplit.length - 1) ? lastname += userSplit[i] : lastname += `${userSplit[i]} `
      }
      this.user.lastname = lastname
      this.user.email= user.email
    },
    checkemail () {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailVal = this.user.email
      if(emailVal.match(regex) === null){
        this.emailerror = true
      } else {
       this.emailerror = false
      }
    },
    submit () {
      if (this.user.email === '' || this.user.firstname === '') {
        swal({
          title: 'Email or User first name cannot be emptied',
          icon: 'warning'
        })
      } else {
        if (!this.emailerror) {
          this.changeuserbasicprofile({changing: this.user, userid: this.datauser._id})
        } 
      }
    }
  },
  watch: {
    datauser () {
      this.fillUser()
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 700px !important;
}
.modal-footer {
  justify-content: flex-start !important
}
form {
  text-align: left;
}
.text-muted {
  color: red !important;
}
</style>