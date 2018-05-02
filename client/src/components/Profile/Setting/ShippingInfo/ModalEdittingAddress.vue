<template>
  <div id="Modal-Editting-Address" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editting Address</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="addressNameEdit">Address Name</label>
              <input v-model="form.name" type="text" class="form-control" id="addressNameEdit">
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="receiverNameEdit">Receiver Name</label>
                <input v-model="form.receiver" type="text" class="form-control" id="receiverNameEdit">
              </div>
              <div class="form-group col-lg-6">
                <label for="receiverPhoneEdit">Receiver Phone</label>
                <input v-model="form.receiverPhone" type="text" class="form-control" id="receiverPhoneEdit">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label for="cityEdit">City</label>
                <input v-model="form.city" type="text" class="form-control" id="cityEdit">
              </div>
              <div class="form-group col-lg-4">
                <label for="provinceEdit">Province</label>
                <input v-model="form.province" type="text" class="form-control" id="provinceEdit">
              </div>
              <div class="form-group col-lg-4">
                <label for="postalCodeEdit">Zip Code</label>
                <input v-model="form.zipCode" type="text" class="form-control" id="postalCodeEdit">
              </div>
            </div>
            <div class="form-group">
              <label for="addressEdit">Address</label>
              <textarea v-model="form.address" class="form-control" id="addressEdit" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="notesEdit">Notes</label>
              <textarea v-model="form.notes" class="form-control" id="notesEdit" rows="1"></textarea>
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
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'
export default {
  props: ['addressindex', 'user'],
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
      'changeAddress'
    ]),
    submit () {
      let error = 0
      Object.keys(this.form).forEach((val) => {
        if (this.form[val] === '' && val !== 'notes') {
          error++
        }
      })
      if (error === 0) {
        swal({
          title: 'Are you sure about this changes?',
          icon: 'warning',
          buttons: {
            ok: "ok",
            cancel: "cancel"
          }
        }).then((value) => {
          if (value === 'ok') {
            this.changeAddress({form:this.form, userid: this.user._id })
          }
        })
      }
    },
  },
  watch: {
    addressindex () {
      Object.keys(this.user.address[this.addressindex]).forEach((val,i) => {
        this.form[val] = this.user.address[this.addressindex][val]
      })
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
