<template>
  <div class="content">
    <div v-bind:class="{ hide: isHideSignup }" class="signup">
      <form>
        <div class="form-group col-lg-10">
          <label for="usernameSignup">Full Name</label>
          <input v-model="formsignup.username" type="text" class="form-control" id="usernameSignup">
        </div>
        <div class="form-group col-lg-10">
          <label for="emailSignup">Email</label>
          <input v-on:keyup="emailsignupcheck" v-model="formsignup.email" type="email" class="form-control" id="emailSignup">
          <small v-if="signuperror.email > 0" id="emailsignuperror" class="form-text" style="color: red">Invalid email address</small>
          <small v-if="emaildouble" id="emailsignuperrordouble" class="form-text" style="color: red">Email address has already taken</small>
        </div>
        <div class="form-group col-lg-10">
          <label for="passwordSignup">Password</label>
          <input v-model="formsignup.password" type="password" class="form-control" id="passwordSignup">
        </div>  
        <div class="form-group col-lg-10">
          <label for="copasswordsignup">Confirmation Password</label>
          <input v-on:keyup="passwordsignupcheck" v-model="formsignup.confirmationpassword" type="password" class="form-control" id="copasswordsignup">
          <small v-if="signuperror.confirmationpassword > 0" id="confirmationpasswordsignuperror" class="form-text" style="color: red">Unmatch confirmation password</small>          
        </div>
        <button type="button" v-on:click="signupbutton" class="btn btn-outline-primary" style="margin-right: 10px;">Signup</button>
        <button type="button" v-on:click="haveaccount" class="btn btn-outline-primary">Have account</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      isHideLogin: true,
      isHideSignup: false,
      formsignup: {
        username: '',
        email: '',
        password: '',
        confirmationpassword: ''
      },
      signuperror: {
        email: 0,
        password: 0,
        confirmationpassword: 0
      }
    }
  },
  methods: {
    ...mapActions([
      'signupuser',
    ]),
    haveaccount () {
      this.isHideLogin = false
      this.isHideSignup = true
    },
    emailsignupcheck () {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailVal = this.formsignup.email
      if(emailVal.match(regex) ===null){
        this.signuperror.email++
      } else {
       this.signuperror.email = 0
      }
    },
    passwordsignupcheck () {
      if (this.formsignup.password !== this.formsignup.confirmationpassword) {
        this.signuperror.confirmationpassword++
      } else {
        this.signuperror.confirmationpassword = 0
      }
    },
    signupbutton () {
      let errorblank = 0
      Object.keys(this.formsignup).forEach((key, index) => {
        if (this.formsignup[key] === '') {
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
        Object.keys(this.signuperror).forEach((key, index) => {
          if (this.signuperror[key] > 0) {
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
          this.signupuser(this.formsignup)
        }
      }
    }
  },
  computed: {
    ...mapState([
      'emaildouble'
    ])
  }
}
</script>

<style scoped>
.title-main-font{
  font-size: 2em;
}

.title-top{
  margin-bottom: 20px;
}
.signup,.login{
  text-align: left;
}
.form-group{
  padding-left: 0px;
}
.hide{
  display: none !important;
}
</style>
