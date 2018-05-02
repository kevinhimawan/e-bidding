<template>
  <div id="Modal-Bidding-Inactive-Detail" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Bidding Edit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-if="Object.keys(biddingData).length > 0">
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label>Bid Amount</label>
                <input class="form-control" v-model="form.bidding" type="number">
                <small v-if="transactioninfo" class="form-text transaction-text">This product will be yours.</small>
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
      biddingData: {},
      form: {
        bidding: null,
        timeDestroy: null,
        status: null,
      },
      errordate: false,
      transactioninfo: false
    }
  },
  methods: {
    ...mapActions([
      'updateBiddingDetail', 'transactionbidfromprofile'
    ]),
    checkbidding () {
      this.form.bidding >= this.biddingData.lowestAsk && this.form.status === 'active' ? this.transactioninfo = true : this.transactioninfo = false
    },
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
        if (this.form.status === 'active' && this.form.bidding >= this.biddingData.lowestAsk && this.biddingData.lowestAsk !== null) {
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
                productid: this.biddingData.shoeProduct._id,
                sizeid: this.biddingData.size._id,
                lowestAsk: this.biddingData.lowestAsk,
                token: localStorage.getItem('kepingan'),
                bidid: this.biddingData._id,
                status: 'active'
              }
              this.transactionbidfromprofile(obj)
            }
          })
        } else {
          this.updateBiddingDetail({data: this.biddingData, changes: this.form, form: 'inactive'})
        }
      }
    }
  },
  watch: {
    data () {
      this.biddingData = this.data
      let editable = {... this.data}
      this.form.bidding = editable.bidding
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
