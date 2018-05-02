// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store.js'
import VeeValidate from 'vee-validate'
import swal from 'sweetalert'
import vmodal from 'vue-js-modal'

Vue.use(VeeValidate)
Vue.use(vmodal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  swal,
  components: { App },
  template: '<App/>'
})
