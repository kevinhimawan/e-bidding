<template>
  <div id="add-item-size-modal" class="modal" tabindex="-1" role="dialog">
    <div style="max-width:700px" class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add Product Size</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <div class="dropdown show">
                            <a style="width:100%;text-align:right;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style="float:left;">{{dropdownselect}}</span>
                            </a>
                            <div style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a v-for="(shoedata, i) in allshoesdataadmin" :key="i" v-on:click="selectshoes(shoedata._id,shoedata.name)" class="dropdown-item" href="#">{{shoedata.name}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label for="inputCity">EU Size</label>
                        <input autocomplete="off" v-model="submitform.eu" type="text" class="form-control" id="eusize">
                      </div>
                      <div class="form-group col-md-3">
                        <label for="inputCity">UK Size</label>
                        <input autocomplete="off" v-model="submitform.uk" type="text" class="form-control" id="uksize">
                      </div>
                      <div class="form-group col-md-3">
                        <label for="inputCity">US Size</label>
                        <input autocomplete="off" v-model="submitform.us" type="text" class="form-control" id="ussize">
                      </div>
                      <div class="form-group col-md-3">
                        <label for="inputCity">Foot Length (cm)</label>
                        <input autocomplete="off" v-model="submitform.footlength" type="text" class="form-control" id="footlength" placeholder="eg 25.7">
                      </div>
                    </div>
                    <button v-on:click="submitFormAddSize" type="button" data-dismiss="modal" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {
      dropdownselect: 'Select shoes',
        submitform:{
          product: '',
          eu: '',
          uk: '',
          us: '',
          footlength: '',
      },
      shoeData: ''
    }
  },
  methods: {
    ...mapActions([
      'getshoesdata'
    ]),
    ...mapMutations([
      'changeshoesdataadmin'
    ]),
    selectshoes:function(idshoes,name){
      this.dropdownselect = name
      this.submitform.product = idshoes
      for(let i = 0; i < this.allshoesdataadmin.length; i++){
        if(String(this.allshoesdataadmin[i]._id) === String(idshoes)){
          this.shoeData = this.allshoesdataadmin[i]
        }
      }
    },

    submitFormAddSize:function(){
      if (this.shoeData === '') {
        swal({
          title: `Hey you havent select shoes`,
          icon: 'warning',
          button: 'Revise'
        }).then (() => {
          Object.keys(this.submitform).forEach((key, index) => {
            this.submitform[key] = ''
          })
        })
      } else {
        let checkNull = 0
        Object.keys(this.submitform).forEach((key,index)=>{
          if(this.submitform[key] === ''){
            checkNull++
          }
        })

        let checkSame = 0
        for(let i = 0; i < this.shoeData.size.length; i++){
          if(this.shoeData.size[i].uk === this.submitform.uk && this.shoeData.size[i].eu === this.submitform.eu && this.shoeData.size[i].us === this.submitform.us && this.shoeData.size[i].footlength === this.submitform.footlength){
            checkSame++
          }
        }
        
        if(checkNull > 0 || checkSame > 0){
          swal({
            title: 'Error adding new size',
            text: 'All datas are required or Data size has been added',
            icon: 'warning',
            button: 'Revise',
          })
        }else{
          axios.post('http://localhost:3000/admin/addsizeproduct', this.submitform).then(response => {
            Object.keys(this.submitform).forEach((key, index) => {
              this.submitform[key] = ''
            })
            this.dropdownselect = 'Select shoes'
            this.changeshoesdataadmin(response.data)
            swal({
              title: 'Adding New Size Has Success',
              icon: 'success',
              button: 'Ok'
            })
          })
          .catch (err => {
            swal({
              title: `Nothing has been added`,
              icon: 'warning',
              button: 'Revise'
            })
          })
        }
      }
    }
  },
  computed: {
    ...mapState([
      'allshoesdataadmin'
    ])
  }
}
</script>

<style scoped>
.modal-dialog{
  text-align: left;
}
</style>
