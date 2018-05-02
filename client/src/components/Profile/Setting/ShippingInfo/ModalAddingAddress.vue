<template>
  <div id="Modal-Adding-Address" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Adding Address</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="addressName">Address Name</label>
              <input v-model="form.name" type="text" class="form-control" id="addressName">
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="receiverName">Receiver Name</label>
                <input v-model="form.receiver" type="text" class="form-control" id="receiverName">
              </div>
              <div class="form-group col-lg-6">
                <label for="receiverPhone">Receiver Phone</label>
                <input v-model="form.receiverPhone" type="text" class="form-control" id="receiverPhone">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label for="city">City</label>
                <input v-model="form.city" type="text" class="form-control" id="city">
              </div>
              <div class="form-group col-lg-4">
                <label for="province">Province</label>
                <input v-model="form.province" type="text" class="form-control" id="province">
              </div>
              <div class="form-group col-lg-4">
                <label for="postalCode">Zip Code</label>
                <input v-model="form.zipCode" type="text" class="form-control" id="postalCode">
              </div>
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <textarea v-model="form.address" class="form-control" id="address" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="notes">Notes</label>
              <textarea v-model="form.notes" class="form-control" id="notes" rows="1"></textarea>
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
  data(){
    return {
      form: {
        name: '',
        receiver: '',
        receiverPhone: '',
        city: '',
        province: '',
        zipCode: '',
        address: '',
        notes: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'submitAddress'
    ]),
    submit () {
      let error = 0
      Object.keys(this.form).forEach((val) => {
        if (this.form[val] === '' && val !== 'notes') {
          error++
        }
      })
      if (error === 0) {
        this.form['token'] = localStorage.getItem('kepingan')
        this.submitAddress(this.form)
      }
    }
  }
}
</script>

<style>
.modal-dialog {
  max-width: 600px;
}
form {
  text-align: left;
}
.modal-footer {
  justify-content: flex-start
}
</style>
