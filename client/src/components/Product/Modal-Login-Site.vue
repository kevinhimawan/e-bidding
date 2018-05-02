<template>
  <div id="Modal-Login-Site" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registration</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body col-lg-12">
          <div class="login-site col-lg-6">
            <h4 class="login-title">Login</h4>
            <form>
              <div class="form-group">
                <label>Email</label>
                <input v-on:keyup="loginemailcheck" class="form-control" type="text" v-model="login.email"/>
                <small v-if="loginError.email" id="emailsigninerror" class="form-text" style="color: red">Invalid email address</small>
                <small v-if="loginError.emailCheck" id="emailsigninerror" class="form-text" style="color: red">Email format error</small>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="login.password"/>
                <small v-if="loginError.password" id="passwordloginperror" class="form-text" style="color: red">Wrong password</small>
              </div>
              <button type="button" v-on:click="loginbutton" class="btn btn-outline-primary">Login</button>
            </form>
          </div>
          <div class="signup-site col-lg-6">
            <h4 class="login-title">Sign Up</h4>
            <form>
              <div class="form-group">
                <label>Full Name</label>
                <input class="form-control" type="text" v-model="signup.fullname"/>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-on:keyup="emailsignupcheck" class="form-control" type="email" v-model="signup.email"/>
                <small v-if="signupError.emailCheck" id="emailsignuperror" class="form-text" style="color: red">Email format error</small>
                <small v-if="signupError.email" id="emailsignuperror" class="form-text" style="color: red">Somebody has already use this email</small>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="signup.password"/>
              </div>
              <div class="form-group">
                <label>Password Confirmation</label>
                <input v-on:keyup="passwordsignupcheck" class="form-control" type="password" v-model="signup.confirmationpassword"/>
                <small v-if="signupError.confirmationpassword" id="passwordsignuperror" class="form-text" style="color: red">Wrong confirmation password</small>
              </div>
              <button type="button" v-on:click="signupbutton" class="btn btn-outline-primary">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      login: {
        email: '',
        password: '',        
      },
      loginError: {
        email: false,
        password: false,
        emailCheck: false
      },
      signup: {
        fullname: '',
        email: '',
        password: '',
        confirmationpassword: '',
      },
      signupError: {
        email: false,
        confirmationpassword: false,
        emailCheck: false
      }
    }
  },
  methods: {
    ...mapActions([
      'loginuserinhome', 'signupuserinhome'
    ]),
    loginemailcheck () {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailVal = this.login.email
      if(emailVal.match(regex) ===null){
        this.loginError.emailCheck = true
      } else {
       this.loginError.emailCheck = false
      }
    },
    loginbutton () {
      let errorblank = 0
      Object.keys(this.login).forEach((key, index) => {
        if (this.login[key] === '') {
          errorblank++
        }
      })
      if (errorblank > 0) {
        swal({
          title: 'Blank input has found',
          text: 'All form input are required',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        this.loginuserinhome(this.login)
      }
    },
    emailsignupcheck () {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailVal = this.signup.email
      if(emailVal.match(regex) === null){
        this.signupError.emailCheck = true
      } else {
       this.signupError.emailCheck = false
      }
    },
    passwordsignupcheck () {
      if (this.signup.password !== this.signup.confirmationpassword) {
        this.signupError.confirmationpassword = true
      } else {
        this.signupError.confirmationpassword = false
      }
    },
    signupbutton () {
      let errorblank = 0
      Object.keys(this.signup).forEach((key, index) => {
        if (this.signup[key] === '') {
          errorblank++
        }
      })
      if (errorblank > 0) {
        swal({
          title: 'Blank input has found',
          text: 'All form input are required',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        let errorsignup = 0
        Object.keys(this.signupError).forEach((key, index) => {
          if (this.signupError[key] === true && key !== 'email') {
            errorsignup++
          }
        })
        if (errorsignup > 0) {
          swal({
            title: 'Error at form has found',
            icon: 'warning',
            button: 'Revise'
          })
        } else {
          this.signupuserinhome(this.signup)
        }
      }
    }
  },
  watch: {
    errorpasswordloginhome () {
      this.loginError.password = this.errorpasswordloginhome
    },
    erroremailloginhome () {
      this.loginError.email = this.erroremailloginhome
    },
    erroremaildoublehome () {
      this.signupError.email = this.erroremaildoublehome
    }
  },
  computed: {
    ...mapState([
      'errorpasswordloginhome', 'erroremailloginhome', 'erroremaildoublehome'
    ])
  }
}
</script>

<style scoped>
/* Modal */
  .modal-dialog {
    max-width: 900px !important;
  }

  .modal-content {
    border: none
  }

/* Body */
  .modal-body {
    padding: 15px 0;
    display: flex;
  }

  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }

  form{
    text-align: left;
    padding: 0 1em;
  }
</style>
