<template>
  <div class="content col-lg-10">
    <!-- Modal Site -->
    <generalinfoedit></generalinfoedit>
    <adminimageedit></adminimageedit>
    <sizeedit
      v-bind:sizeindex="sizeindex"
      v-bind:sizeid="sizeid"></sizeedit>
    <div class="basic-info">
      <div class="basic-info-content">
        <span class="basic-info-content-each">Total Sell:</span>
        <a class="basic-info-content-number">{{adminspecificproduct.shoeSellProduct.length}}</a>
      </div>
      <span class="divider-pipe">|</span>
      <div class="basic-info-content">
        <span class="basic-info-content-each">Total Bid:</span>
        <a class="basic-info-content-number">{{adminspecificproduct.shoeBidding.length}}</a>
      </div>
      <span class="divider-pipe">|</span>
      <div class="basic-info-content">
        <span class="basic-info-content-each">Total Transaction:</span>
        <a class="basic-info-content-number">{{adminspecificproduct.transaction.length}}</a>
      </div>
    </div>
    <!-- General Info -->
    <div class="card">
      <div class="card-title col-lg-12">
        <div class="card-title-top col-lg-11">
          <h4 class="card-title-top-font">General Information</h4>
        </div>
        <div class="edit-action col-lg-1">
          <i data-toggle="modal" data-target="#general_info_edit" data-backdrop="static" data-keyboard="false" class="fas fa-edit"></i>
        </div>
      </div>
      <div class="card-body">
        <div v-if="prop !== 'size' && prop !== 'images' 
        && prop !== 'shoeSellProduct' && prop !== 'shoeBidding' 
        && prop !== 'transaction' && prop !== '_id' 
        && prop !== 'description' && prop !== 'brand'
        && prop !== '__v' && prop !== 'release'
        && prop !== 'retail' && prop !== 'Retail' " 
        v-for="(content, prop) in adminspecificproduct" :key="prop" class="card-body-content col-lg-12">
          <label class="card-body-content-title-font col-lg-1">{{prop}}</label>
          <h4 class="card-body-content-font col-lg-11">{{content}}</h4>
        </div>
        <div v-else-if="prop === 'brand'" class="card-body-content col-lg-12">
          <label class="card-body-content-title-font col-lg-1">{{prop}}</label>
          <h4 class="card-body-content-font col-lg-11">{{content.name}}</h4>
        </div>
        <div v-else-if="prop === 'Retail'" class="card-body-content col-lg-12">
          <label class="card-body-content-title-font col-lg-1">{{prop}}</label>
          <h4 class="card-body-content-font col-lg-11">IDR {{content}}k</h4>
        </div>
        <div class="content-description">
          <label class="card-body-content-title-font">Description</label>
          <div class="content-desc-paragraph" v-html="adminspecificproduct.description"></div>
        </div>
      </div>
    </div>
    <!-- Image -->
    <div class="card">
      <div class="card-title col-lg-12">
        <div class="card-title-top col-lg-11">
          <h4 class="card-title-top-font">Product Images</h4>
        </div>
        <div class="edit-action col-lg-1">
          <i data-toggle="modal" data-target="#admin-image-edit" data-backdrop="static" data-keyboard="false" class="fas fa-edit"></i>
        </div>
      </div>
      <div class="card-body-images">
        <img v-for="(image, prop) in adminspecificproduct.images" :key="prop" class="card-img-top  col-lg-4" :src="image.path">
      </div>
    </div>
    <!-- Size -->
    <div class="card">
      <div class="card-title col-lg-12">
        <div class="card-title-top col-lg-11">
          <h4 class="card-title-top-font">Product Size</h4>
        </div>
      </div>
      
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">EU</th>
              <th scope="col">UK</th>
              <th scope="col">US</th>
              <th scope="col">Foot Length</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(size, props) in adminspecificproduct.size" :key="props">
              <td>{{size.eu}}</td>
              <td>{{size.uk}}</td>
              <td>{{size.us}}</td>
              <td>{{size.footlength}}</td>
              <td>
                <button class="plain-button" v-on:click="editSize(props, size._id)" type="button">
                  <i data-toggle="modal" data-target="#admin-size-edit" data-backdrop="static" data-keyboard="false" class="fas fa-edit"></i>
                </button>
                <button class="plain-button" v-on:click="removeSize(props, size._id)" type="button">
                  <i class="fas fa-eraser"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import sizeedit from '@/components/Admin/EditModal/SizeEdit'
import adminimageedit from '@/components/Admin/EditModal/ImageEdit'
import generalinfoedit from '@/components/Admin/EditModal/GeneralInfoEdit'
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    generalinfoedit, adminimageedit, sizeedit
  },
  data () {
    return {
      sizeindex: '',
      sizeid: ''
    }
  },
  props: ['shoeid'],
  created () {
    this.getshoespecific(this.shoeid)
  },
  methods: {
    ...mapActions([
      'getshoespecific', 'removesizeshoe'
    ]),
    editSize (index, id) {
      this.sizeindex = index
      this.sizeid = id
    },
    removeSize (index, id) {
      swal({
        title: 'Removing Item',
        text: 'Once you remove, cannot get it back again',
        icon: 'warning',
        buttons:{
          yes: "Yes",
          cancel: "Cancel",
        }
      }).then((value) => {
        if (value === 'yes') {
          this.removesizeshoe({id, shoeid: this.shoeid})
        }
      })
    }
  },
  watch: {
    shoeid (){  
      this.getshoespecific(this.shoeid)
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
.content{
  margin: 0;
  padding: 20px 40px !important;
}
.card{
  padding: 20px;
  margin-bottom: 20px;
}
.basic-info{
  display: flex;
  margin-bottom: 20px;
}
.basic-info-content{
  display: flex;
}
.card-body-content{
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
}
.card-body-content-title-font{
  font-size: 1em;
  float: left;
  margin: 0;
  margin-right: 10px;
  color: grey;
  text-align: left;
  line-height: 24px;
  text-transform: capitalize;
  padding: 0
}
.card-body-content-font{
  text-align: left;
  margin: 0;
  font-size: 1em;
  padding: 0;
  line-height: 24px;
}
.basic-info-content-each{
  margin-right: 8px;
  font-size: 1.2em;
  font-weight: 500;
  color: #999;
}
.basic-info-content-number{
  font-size: 1.2em;
  font-weight: 500;
}
.divider-pipe{
  font-weight: 600;
  padding: 0 20px;
}
.image-content img{
  width: 100%;
}
.card-title{
  margin-bottom: 15px;
  display: flex;
  padding: 0
}
.card-body{
  padding: 0;
  display: flex;
  flex-direction: column;
}
.edit-action{
  padding: 0
}
.card-title-top{
  padding: 0
}
.card-title-top-font{
  margin: 0;
  text-align: left;
}
.fa-edit:hover{
  cursor: pointer;
}
.gapper{
  border-bottom: 1px solid #e6e9ec;
  margin: 20px auto;
}
.content-description{
  margin-top: 2px;
  display: flex;
  flex-direction: column;
}
.content-desc-paragraph{
  text-align: left;
}
.card-body-images{
  display: flex;
  flex-direction: row;
}
.card-img-top{
  height: 100%;
}
.form-group{
  text-align: left;
}
.size-form{
  width: 21% !important;
  max-width: 21% !important;
  flex: none;
  margin: 0 5px;
}
.size-edit{
  display: flex;
  align-items: center;
  justify-content: center;
}
.plain-button{
  border: none;
  background-color: none;
}
.fa-eraser:hover{
  cursor: pointer;
}
</style>
