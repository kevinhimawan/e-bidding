<template>
  <div id="Reset-Password" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Reseting Password</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="newpassword">New Password</label>
              <input v-model="form.password" type="password" class="form-control" id="newpassword">
            </div>
            <div class="form-group">
              <label for="confirmationpassword">Confirm New Password</label>
              <input v-on:keyup="confirmation" v-model="form.confirmation" type="password" class="form-control" id="confirmationpassword">
              <small v-if="error.confirmation" id="confirmationpasswordwarn" class="form-text text-muted">New password and confirmation password are not match.</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="submit" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        password: '',
        confirmation: ''
      },
      error: {
        confirmation: false
      }
    }
  },
  methods: {
    ...mapActions([
      'resetpassword'
    ]),
    confirmation () {
      this.form.password !== this.form.confirmation ? this.error.confirmation = true : 
      this.error.confirmation = false  
    },
    submit () {
      let error = 0
      Object.keys(this.error).forEach((val) => {
        if (this.error[val] === true) {error++}
      })
      Object.keys(this.form).forEach((val) => {
        if (this.form[val] === '') {error++}
      })
      if (error === 0) {
        this.resetpassword({form: this.form, user: this.userdata})
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
.modal-body {
  text-align: left;
}
.modal-footer {
  justify-content: flex-start !important
}
.text-muted {
  color: red !important;
}
</style>