<template>
  <div id="add-supplier" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Supplier</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="supplierName">Supplier Name</label>
              <input v-model="form.username" type="text" class="form-control" id="supplierName">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="form.email" type="text" class="form-control" id="email">
            </div>
            <div class="form-group">
              <label for="namadannomorjalan">Nama dan Nomor Jalan</label>
              <input v-model="form.street" type="text" class="form-control" id="namadannomorjalan">
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="kecamatan">Kecamatan</label>
                <input v-model="form.kecamatan" type="text" class="form-control" id="kecamatan">
              </div>
              <div class="form-group col-lg-6">
                <label for="kelurahan">Kelurahan</label>
                <input v-model="form.kelurahan" type="text" class="form-control" id="kelurahan">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label for="kota">Kota</label>
                <input v-model="form.kota" type="text" class="form-control" id="kota">
              </div>
              <div class="form-group col-lg-4">
                <label for="provinsi">Provinsi</label>
                <input v-model="form.provinsi" type="text" class="form-control" id="provinsi">
              </div>
              <div class="form-group col-lg-4">
                <label for="country">Negara</label>
                <input v-model="form.country" type="text" class="form-control" id="country">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label for="kodepos">Kode Pos</label>
                <input v-model="form.kodepos" type="text" class="form-control" id="kodepos">
              </div>
              <div class="form-group col-lg-4">
                <label for="nomortelfon">Nomor Telfon</label>
                <input v-model="form.number" type="text" class="form-control" id="nomortelfon">
              </div>
              <div class="form-group col-lg-4">
                <label for="nomorhp">Nomor HP</label>
                <input v-model="form.phoneNumber" type="text" class="form-control" id="nomorhp">
              </div>
            </div>
            <div class="form-group">
              <label>Catatan</label>
              <vue-editor v-model="form.catatan" id="editor-add-supplier" style="margin-bottom:20px;"></vue-editor>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitform">Submit</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapActions } from 'vuex'
export default {
  components: {
  VueEditor
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        street: '',
        kelurahan: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        kodepos: '',
        number: '',
        phoneNumber: '',
        catatan: '',
        country: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'supplierCreate'
    ]),
    submitform () {
      this.supplierCreate(this.form)
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  max-width: 900px;
}

form {
  text-align: left;
}
</style>