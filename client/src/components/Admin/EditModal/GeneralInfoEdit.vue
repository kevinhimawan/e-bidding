<template>
  <div id="general_info_edit" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{adminspecificproduct.name}}</h5>
          <button v-on:click="cancelChange" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="">Name</label>
                <input type="text" class="form-control" v-model="adminspecificproduct.name">
              </div>
              <div class="form-group col-lg-6">
                <label for="brand">Brand</label>
                <div class="dropdown show">
                  <a style="width:100%;text-align:right;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span style="float:left;">{{adminspecificproduct.brand.name}}</span>
                  </a>
                  <div style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a v-for="(brand, i) in allbrand" :key="i" v-on:click="selectbrand(brand._id,brand.name)" class="dropdown-item" href="#">{{brand.name}}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="styleshoe">Style</label>
                <input type="text" class="form-control" v-model="adminspecificproduct.style" autocomplete="off" id="styleshoe">
              </div>
              <div class="form-group col-lg-6">
                <label for="colorshoe">Color</label>
                <input type="text" class="form-control" v-model="adminspecificproduct.color" autocomplete="off" id="colorshoe">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-lg-6">
                <label for="retailshoe">Retail Price (k)</label>
                <input type="Number" placeholder="IDR" class="form-control" v-model="adminspecificproduct.retail" autocomplete="off" id="retailshoe">
              </div>
              <div class="form-group col-lg-6">
                <label for="releaseshoe">Release</label>
                <input type="date" class="form-control" v-model="adminspecificproduct.Release" autocomplete="off" id="releaseshoe">
              </div>
            </div>
            <div class="form-group">
              <label>Product Description</label>
              <vue-editor id="editor-edit-modal" style="margin-bottom:20px;" v-model="adminspecificproduct.description"></vue-editor>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button v-on:click="saveChange" type="button" class="btn btn-primary">Save changes</button>
          <button v-on:click="cancelChange" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      testing: ''
    }
  },
  methods: {
    ...mapActions([
      'getshoespecific', 'changeshoespecific', 'search'
    ]),
    selectbrand (brandid, brandname) {
      this.adminspecificproduct.brand.name = brandname
      this.adminspecificproduct.brand._id = brandid
    },
    saveChange () {
      this.changeshoespecific(this.adminspecificproduct).then(() => {
        $('#general_info_edit').modal('hide')
      })
    },
    cancelChange () {
      this.getshoespecific(this.adminspecificproduct._id)
    }
  },
  computed: {
    ...mapState([
      'adminspecificproduct', 'allbrand'
    ])
  }
}
</script>

<style scoped>
.modal-dialog{
  max-width: 800px !important;
}
form{
  text-align: left
}
</style>
