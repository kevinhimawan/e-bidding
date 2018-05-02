<template>
  <div id="admin-size-edit" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Size Edit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group col-lg-3">
              <label>EU</label>
              <input type="text" class="form-control" v-model="adminspecificproduct.size[sizeindex].eu">
            </div>
            <div class="form-group col-lg-3">
              <label>UK</label>
              <input type="text" class="form-control" v-model="adminspecificproduct.size[sizeindex].uk">
            </div>
            <div class="form-group col-lg-3">
              <label>US</label>
              <input type="text" class="form-control" v-model="adminspecificproduct.size[sizeindex].us">
            </div>
            <div class="form-group col-lg-3">
              <label>Foot Length</label>
              <input type="text" class="form-control" v-model="adminspecificproduct.size[sizeindex].footlength">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on:click="submitchange" type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['sizeindex', 'sizeid'],
  methods: {
    ...mapActions([
      'changeshoesize'
    ]),
    submitchange () {
      this.changeshoesize(this.adminspecificproduct.size[this.sizeindex]).then(() => {
        $('#admin-size-edit').modal('hide')
      })
    }
  },
  computed: {
    ...mapState([
      'adminspecificproduct'
    ])
  }
}
</script>

<style scoped>
.form-group{
  text-align: left;
}
</style>
