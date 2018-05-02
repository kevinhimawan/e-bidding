<template>
  <div id="add-brand-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Brand</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="brandname">New Brand</label>
            <input type="text" id="brandname" v-model="form.name" class="form-control">
            <small v-if="error" id="brandnameerror" class="form-text">This brand name has already existed.</small>
          </div>
          <button v-on:click="submitform" type="button" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: ''
      },
      error: false
    }
  },
  methods: {
    submitform () {
      if (this.form.name !== '') {
        let vm = this
        axios.post('http://localhost:3000/admin/addbrand', this.form).then(response => {
          $('#add-brand-modal').modal('hide')
          this.form.name = ''
        }).catch(err => {
          vm.error = true
        })
      }
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  text-align: left;
}
.form-text{
  color: red;
}
</style>
