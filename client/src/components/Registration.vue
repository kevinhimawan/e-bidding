<template>
  <div class="content">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Sneaker</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <div class="form-row">
              <div class="form-group form-group-top col-md-5">
                <input v-on:keyup="loginemailcheck" v-model="formlogin.email" type="text" class="form-control" id="emailsingin" placeholder="Email Address">
                <small v-if="erroremailsignup" id="emailloginerror" class="form-text" style="color: red">Not found email address</small>
                <small v-else-if="loginformerror.email" id="emailloginerror" class="form-text" style="color: red">Invalid email</small>
              </div>
              <div class="form-group form-group-top col-md-5">
                <input v-model="formlogin.password" type="password" class="form-control" id="passwordsignin" placeholder="Password">
                <small v-if="errorpasswordsignup" id="passwordloginerror" class="form-text" style="color: red">Password is not match</small>
              </div>
              <button type="button" v-on:click="submitlogin" class="btn btn-outline-primary btn-top">Sign in</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="regisContent row">
      <div class="col-lg-6 main-left-side"></div>
      <div class="col-lg-6 main-right-side">
        <signuplogin></signuplogin>
      </div>
    </div>
  </div>
</template>

<script>
import signuplogin from '@/components/Registration/SignupandLogin'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    signuplogin
  },
  data () {
    return {
      formlogin: {
        email: '',
        password: ''
      },
      loginformerror: {
        email: false
      }
    }
  },
  methods: {
    ...mapActions([
      'loginuser'
    ]),
    loginemailcheck () {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailVal = this.formlogin.email
      if(emailVal.match(regex) ===null){
        this.loginformerror.email = true
      } else {
       this.loginformerror.email = false
      }
    },
    submitlogin () {
      let errorblank = 0
      Object.keys(this.formlogin).forEach((key, index) => {
        if (this.formlogin[key] === '') {
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
        this.loginuser(this.formlogin)
      }
    }
  },
  computed: {
    ...mapState([
      'erroremailsignup', 'errorpasswordsignup'
    ])
  }
}
</script>

<style>
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
.regisContent{
  margin: 40px;
  display: flex;
}
.left-main-side{
  border-left: 1px solid #ddd
}
.main-left-side,.main-right-side{
  padding: 0 50px;
}
.form-group-top{
  margin: 0 !important;
  padding: 0 10px !important;
  display: flex;
  flex-direction: column;
}
.btn-top{
  margin-left: 10px !important;
  margin-top: 0px !important;
  padding: 0 8px !important;
  height: 38px;
}
.form-text{
  text-align: left;
}
</style>
