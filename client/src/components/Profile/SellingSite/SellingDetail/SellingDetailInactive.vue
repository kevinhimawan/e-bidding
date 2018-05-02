<template>
  <div id="Modal-Selling-Inactive-Detail" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Selling Edit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-if="Object.keys(sellingData).length > 0">
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label>Bid Amount</label>
                <input class="form-control" v-model="form.price" type="number">
              </div>
              <div class="form-group col-lg-4">
                <label for="">Bid End</label>
                <input id="endDate" class="form-control" type="date" v-model="form.timeDestroy">
                <small v-if="errordate" class="form-text text-muted">Min date is today.</small>
              </div>
              <div class="form-group col-lg-4">
                <label style="width: 100%">Status</label>
                <label v-on:click="changeStatus" style="width: 100%" class="btn btn-secondary active">{{form.status}}</label>
              </div>
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
import { mapActions } from 'vuex'
export default {
  props: ['data'],
  data () {
    return {
      sellingData: {},
      form: {
        price: null,
        timeDestroy: null,
        status: null,
      },
      errordate: false
    }
  },
  methods: {
    ...mapActions([
      'updateSellingDetail', 'transactionaskfromprofile'
    ]),
    changeStatus () {
      this.form.status === 'active' ? this.form.status = 'inactive' : this.form.status = 'active'
    },
    submit () {
      Object.keys(this.form).forEach((val, i) => {
        if (val === 'timeDestroy') {
          let split = this.form.timeDestroy.split('-')
          let dateNow = new Date()
          let date = new Date(Number(split[0]), Number(split[1]) - 1, Number(split[2]))
          if (date < dateNow) {
            this.errordate = true
          } else{
            this.errordate = false
            this.form.timeDestroy = new Date(this.form.timeDestroy)
          }
        }
      })
      if (!this.errordate) {
        if (this.form.status === 'active' && this.form.price <= this.sellingData.highestBid && this.sellingData.highestBid !== null) {
          swal({
            title: 'Are you sure?',
            text: 'Transaction will be proceed',
            icon: 'warning',
            buttons: {
              cancel: 'cancel',
              ok: 'ok'
            }
          }).then((val) => {
            if (val === 'ok') {
              let obj = {
                productid: this.sellingData.shoeProduct._id,
                sizeid: this.sellingData.size._id,
                highestBid: this.sellingData.highestBid,
                token: localStorage.getItem('kepingan'),
                sellid: this.sellingData._id,
                status: 'inactive'
              }
              this.transactionaskfromprofile(obj)
            }
          })
        } else {
          this.updateSellingDetail({data: this.sellingData, changes: this.form, form: 'inactive'})
        }
      }
    }
  },
  watch: {
    data () {
      this.sellingData = this.data
      let editable = {... this.data}
      this.form.price = editable.price
      this.form.timeDestroy = editable.parseDestroy
      this.form.status = editable.status
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 550px;
}

form {
  text-align: left;
}
.text-muted {
  color: red !important;
}
</style>
