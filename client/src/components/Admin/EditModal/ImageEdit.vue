<template>
  <div id="admin-image-edit" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Images</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="available-image">
            <div class="form-group col-lg-12">
              <label>Available Images</label>
              <div class="edit-item-modal-image-available col-lg-12 row">
                <div v-for="(image,props) in adminspecificproduct.images" :key="props" class="card col-lg-4">
                  <img class="card-img-top" :src="image.path">
                  <button type="button" class="btn btn-default remove-item" v-on:click="removeAvailableImage(props,image._id)">
                    <i class="fas fa-minus-circle" style="color:red"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group col-lg-12">
              <label>New Images</label>
              <div class="edit-item-modal-image-available col-lg-12 row">
                <div v-for="(img,props) in newImages" :key="props" v-if="newImages.length > 0" class="card col-lg-4">
                  <img class="card-img-top" :src="img">
                  <button type="button" class="btn btn-default remove-item" v-on:click="removeNewImage(img)">
                    <i class="fas fa-minus-circle" style="color:red"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Drop or Select Image</label>
              <div @dragover="dragover" @drop="onDrop" class="box-input drop">
                <label class="drag-file-label">Drag Here</label>
                <label class="fileContainer">
                  Click here to upload
                  <input @change="getImagefile" type="file" multiple/>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on:click="submitchange" type="button" class="btn btn-primary">Save changes</button>
          <button v-on:click="cancelChange" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import swal from 'sweetalert'
export default {
  data () {
    return {
      newImages: [],
      newImagesFile: [],
      removedAvailableImage: [],
      formEditProduct: new FormData(),
      newImages: []
    }
  },
  methods: {
    ...mapActions([
      'getshoespecific', 'changeshoespecific', 'changeshoeimage'
    ]),
    submitchange:function(){
      swal({
        title: 'Are you sure about all these changes?',
        icon: 'warning',
        buttons:{
          yes: "Yes",
          cancel: "Cancel",
        }
      }).then((value)=>{
        if(value === 'yes'){
          if(this.newImagesFile.length > 0){
            for(let i = 0; i < this.newImagesFile.length; i++){
              let file = this.newImagesFile[i];
              this.formEditProduct.append('image',file, file.name)
            }
          }
          if (this.removedAvailableImage.length > 0) {
            console.log(this.removedAvailableImage)
           for (let i = 0; i < this.removedAvailableImage.length; i++) {
             this.formEditProduct.append('removedphoto', this.removedAvailableImage[i])
           }
          }
          this.formEditProduct.append('shoeid', this.adminspecificproduct._id)
          this.changeshoeimage(this.formEditProduct).then(() => {
            $('#admin-image-edit').modal('hide')
            this.formEditProduct = new FormData()
          })
        }
      })
    },
    cancelChange () {
      this.getshoespecific(this.adminspecificproduct._id)
    },
    removeAvailableImage (index, id) {
      swal({
        title: 'Remove confirmation',
        text: 'Are you sure want to remove this?',
        icon: 'warning',    
        buttons:{
            ok: "Ok",
            cancel: "Cancel"
        }
      }).then((value)=>{
        if(value === 'ok'){
          this.removedAvailableImage.push(id)
          this.adminspecificproduct.images.splice(index, 1)
        }
      })
    },
    removeNewImage (index) {
      this.newImagesFile.splice(index,1)
      this.newImages.splice(index,1)
    },
    getImagefile: function (e) {
      const totalImages = this.newImages.length + this.adminspecificproduct.images.length
      let imgs = event.target.files
      let array = []
      if ((totalImages + imgs.length) <= 6) {
        Object.keys(imgs).forEach((value,index)=>{
          this.createFile(imgs[index])
        })
      } else {
        swal({
          title: 'Maximum image is 6',
          icon: 'warning',
          button: 'Revise'
        })
      }
    },

    onDrop: function (e) {
      const totalImages = this.newImages.length + this.adminspecificproduct.images.length
      e.stopPropagation()
      e.preventDefault()
      $(this).css('border','2px dotted #bdc3c7')
      let files = e.dataTransfer.files;
      let imgs = files
      if ((totalImages + files) <= 6) {
        Object.keys(imgs).forEach((value,index)=>{
          this.createFile(imgs[index])
        })
      } else {
        swal({
          title: 'Maximum image is 6',
          icon: 'warning',
          button: 'Revise'
        })
      }
    },

    dragover: function (e) {
      e.stopPropagation()
      e.preventDefault()
      $('.drop').css('border', '2px dotted #16a085')
    },

    createFile(file) {
      if (!file.type.match('image.*')) {
        alert('Select an image');
        return;
      }
      
      var img = new Image();
      var reader = new FileReader();
      var vm = this;
      
      reader.onload = function(e) {
        vm.newImages.push(e.target.result)   
        vm.newImagesFile.push(file)
      }
      reader.readAsDataURL(file);
    },
  },
  computed: {
    ...mapState([
      'adminspecificproduct'
    ])
  }
}
</script>

<style scoped>
.modal-dialog{
  max-width: 800px !important;
}
.form-group{
  padding: 0;
  text-align: left;
}
.row {
  margin: 0;
}
.edit-item-modal-image-available{
  position: relative;
  padding: 0;
  display: flex;
}
.remove-item{
  position: absolute;
  background-color: transparent;
  left: 0;
  top: 0;
}
.card{
  border: none;
  position:relative !important;
  padding: .8em !important
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
</style>
