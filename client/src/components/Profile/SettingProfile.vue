<template>
  <div class="content col-lg-10">
    <div class="profile-title">
      <h3>Account Setting</h3>
    </div>
    <BasicProfile></BasicProfile>
    <ShippingInfo></ShippingInfo>
    <BillingInfo></BillingInfo>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BillingInfo from './Setting/BillingInfo'
import ShippingInfo from './Setting/ShippingInfo'
import BasicProfile from './Setting/BasicProfile'
export default {
  components: {
    BasicProfile, ShippingInfo, BillingInfo
  },
}
</script>

<style scoped>
.col-lg-12 {
  padding: 0
}
.content {
  max-width: 80% !important;
  padding: 1.2em 20px;
  display: flex;
  flex-direction: column;
}

.profile-title {
  text-align: left;
}
</style>