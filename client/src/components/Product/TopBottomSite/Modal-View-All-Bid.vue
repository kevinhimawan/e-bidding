<template>
  <div id="ModalViewAllBid" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">All Bids</h5>
          <button @click="closeButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Bids Price</th>
                <th scope="col">Available</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in sizedata" :key="i">
                <td>{{data.size.eu}}</td>
                <td>Rp {{data.bidding}}k</td>
                <td>{{1}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  data () {
    return {
      sizedata: [],
      trigger: 0
    }
  },
  created () {
    this.sizedata = this.homespecificproduct.shoeBidding
  },
  methods: {
    ...mapMutations([
      'changetablebidmodal'
    ]),
    sortingSize (data) {
      for (let i = 0; i < data.length; i++) {
        let minimVal = Number(data[i].size.eu)
        let minimIndex = i
        let count = 0
        for (let j = i+1; j < data.length; j++) {
          let possibleMinim = Number(data[j].size.eu)
          if(possibleMinim < minimVal){
            minimVal = possibleMinim
            minimIndex = j
            count++
          }
        }
        if (count > 0) {
          let tmp = data[i]
          data[i] = data[minimIndex]
          data[minimIndex] = tmp
        }
      }
      this.groupingSize(data)
    },
    groupingSize (data) {
      let group = []
      this.sizedata = data
      for (let i = 0; i < data.length; i++) {
        let size = data[i].size.eu
        let sizeGroup = []
        let nextIndex;
        for (let j = i; j < data.length; j++) {
          if (size === data[j].size.eu) {
            sizeGroup.push(data[j])
            if (i === 7) {
              break;
            }
          } else {
            nextIndex = j - 1
            j = (data.length - 1)
          } 
        }
        i = nextIndex
        group.push(sizeGroup)
        sizeGroup = []
      }
      this.sortingPrice(group)
    },
    sortingPrice (data) {
      for (let i = 0; i < data.length; i++) {
        for (let k = 0; k < data[i].length; k++) {
          let minimVal = Number(data[i][k].price)
          let minimIndex = k
          let count = 0
          for (let j = k+1; j < data[i].length; j++) {
            let possibleMinim = Number(data[i][j].price)
            if(possibleMinim < minimVal){
              minimVal = possibleMinim
              minimIndex = j
              count++
            }
          }
          if (count > 0) {
            let tmp = data[i][k]
            data[i][k] = data[i][minimIndex]
            data[i][minimIndex] = tmp
          }
        }
      }
      this.combine(data)
    },
    combine (data) {
      let sortingLast = []
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          sortingLast.push(data[i][j])
        }
      }
      this.sizedata = sortingLast
    },
    closeButton () {
      this.changetablebidmodal()
    }
  },
  watch:{
    picksize () {
      let data = this.homespecificproduct.shoeBidding
      const filtering = data.filter((bid, i) => {
        if (bid.size._id === this.picksize) {
          return bid
        }
      })
      this.trigger++
      this.sortingSize(filtering)
    },
    bidtablemodal () {
      if (this.bidtablemodal === true && this.trigger === 0) {
        let copyshoeBid = [...this.homespecificproduct.shoeBidding]
        this.sortingSize(copyshoeBid)
      }
    },
    homespecificproduct () {
      this.sizedata = this.homespecificproduct.shoeBidding
    }
  },
  computed: {
    ...mapState([
      'picksize', 'homespecificproduct', 'bidtablemodal'
    ])
  }
}
</script>

<style scoped>
/* Modal Site */
  .modal-dialog {
    max-width: 700px;
  }
  table {
    text-align: center
  }
</style>
