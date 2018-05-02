<template>
  <div id="add-item-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-lg-6">
                    <label for="newproductname">New Product Name</label>
                    <input autocomplete="off" v-model="formadditem.name" type="text" class="form-control" id="newproductname">
                    <small v-if="doublename" id="doublename" class="form-text">This produt name has already existed</small>
                  </div>
                  <div class="form-group col-lg-6">
                    <label for="brand">Brand</label>
                    <div class="dropdown show">
                      <a style="width:100%;text-align:right;" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span style="float:left;">{{selector}}</span>
                      </a>
                      <div style="width:100%;" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a v-for="(brand, i) in allbrand" :key="i" v-on:click="selectbrand(brand._id,brand.name)" class="dropdown-item" href="#">{{brand.name}}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-lg-6">
                    <label>Drop or Select Image</label>
                    <div @dragover="dragover" @drop="onDrop" class="box-input drop">
                      <label class="drag-file-label">Drag Here</label>
                      <label class="fileContainer">
                        Click here to upload
                        <input @change="getImagefile" type="file" multiple/>
                      </label>
                    </div>
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Image Collection</label>
                    <div class="will-upload-images">
                      <div v-for="(image,index) in formadditem.images" :key="index" class="will-upload-image">
                        <div class="will-upload-image-name">{{image.name}}</div>
                        <div class="will-upload-image-button">
                          <button type="button" v-on:click="removeImage(index)" class="btn btn-default">
                            <i class="fas fa-minus-circle" style="color:red"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-lg-6">
                    <label for="styleshoe">Style</label>
                    <input type="text" class="form-control" v-model="formadditem.style" autocomplete="off" id="styleshoe">
                  </div>
                  <div class="form-group col-lg-6">
                    <label for="colorshoe">Color</label>
                    <input type="text" class="form-control" v-model="formadditem.color" autocomplete="off" id="colorshoe">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-lg-6">
                    <label for="retailshoe">Retail Price (k)</label>
                    <input type="Number" placeholder="IDR" class="form-control" v-model="formadditem.retail" autocomplete="off" id="retailshoe">
                  </div>
                  <div class="form-group col-lg-6">
                    <label for="releaseshoe">Release</label>
                    <input type="date" class="form-control" v-model="formadditem.release" autocomplete="off" id="releaseshoe">
                  </div>
                </div>
                <div class="form-group">
                  <label>Product Description</label>
                  <vue-editor id="editor-add-item" style="margin-bottom:20px;" v-model="formadditem.description"></vue-editor>
                </div>
                <button v-on:click="submitForm" type="button" class="btn btn-primary col-lg-12">Submit</button>
              </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import $ from 'jquery'
import axios from 'axios'
import { mapMutations, mapState } from 'vuex';
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      formAddNewProduct: new FormData(),
      formadditem: {
        name: '',
        images: [],
        brand: '',
        description: '',
        style: '',
        color: '',
        retail: '',
        release: '',
      },
      selector: 'Select brand',
      doublename: false,
    }
  },
  methods: {
    ...mapMutations([
      'addingallshoesdataadmin'
    ]),
    selectbrand (brandid, brandname) {
      this.selector = brandname
      this.formadditem.brand = brandid
    },
    submitForm:function(){
      let error = 0
      Object.keys(this.formadditem).forEach((key, index) => {
        if (this.formadditem[key] === '') {
          error++
        } 
        if (this.formadditem.images.length === 0) {
          error++
        }
      })
      if(error === 0){
        for(let i = 0; i < this.formadditem.images.length; i++){
            let file = this.formadditem.images[i];
            this.formAddNewProduct.append('image', file, file.name)
        }
        let formAddNewProduct = this.formAddNewProduct
        Object.keys(this.formadditem).forEach((key, index) => {
          if (key !== 'images') {
            formAddNewProduct.append(key, this.formadditem[key]) 
          }
        })
        axios.post('http://localhost:3000/admin/addproduct',formAddNewProduct)
        .then(response=>{
            Object.keys(this.formadditem).forEach((key, index) => {
              if (key !== 'images') {
                this.formadditem[key] = ''
              }
            })
            this.formadditem.images = []
            this.formAddNewProduct = new FormData()
            this.addingallshoesdataadmin(response.data)
            $('#add-item-modal').modal('hide')
        })
        .catch(err => {
          swal({
            title: 'Error in Adding Product',
            text: `${this.formadditem.name} has already existed`,
            icon: 'warning',
            button: 'Revise'
          }).then(()=>{
            this.doublename = true
            this.formAddNewProduct = new FormData()
          })
        })
      } else {
        swal({
          title: `Error adding new product`,
          text: `All datas are required`,
          icon: 'warning',
          button: 'Revise'
        })
      }
    },
    getImagefile: function (e) {
      let img = event.target.files
      Object.keys(img).forEach((value) => {
        this.formadditem.images.push(img[value])
      })
    },

    onDrop: function (e) {
      e.stopPropagation()
      e.preventDefault()
      $(this).css('border', '2px dotted #bdc3c7')
      let files = e.dataTransfer.files
      let img = files
      Object.keys(img).forEach((value, index) => {
        this.formadditem.images.push(img[value])
      })
    },

    dragover: function (e) {
      e.stopPropagation()
      e.preventDefault()
      $('.drop').css('border', '2px dotted #16a085')
    },

    removeImage: function (index) {
      this.formadditem.images.splice(index, 1)
    }
  },
  computed: {
    ...mapState([
      'allbrand'
    ])
  }
}
</script>

<style scoped>
.modal-dialog{
  max-width: 800px;
}
.modal-content{
  text-align: left !important;
}
.box-input{
  border: 2px dotted #bdc3c7;
  width: 100%;
  height: 100px;
  color: #bdc3c7;
  font-size: 100%;
  padding: 0 5px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.fileContainer {
  overflow: hidden;
  position: relative;
}

.fileContainer [type=file] {
  cursor: inherit;
  display: block;
  filter: alpha(opacity=0);
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: right;
  top: 0;
  width: 100%;
}

.drag-file-label{
  display: block;
  width: 100% !important;
}

.will-upload-images{
  border: 2px dotted #bdc3c7;
  width: 100%;
  min-height: 100px;
  color: black;
  font-size: 100%;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column
}

.will-upload-image{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

.will-upload-image-name{
  display: block;
  width: 91%;
  font-size: .8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 36px;
}

.will-upload-image-button{
  width: 9%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-text{
  color: red;
}
</style>
