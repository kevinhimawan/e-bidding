<template>
  <div class="asking-button-site">
    <!-- Ask Button -->
    <div class="buttons">
      <div data-toggle="modal" class="button-info-ask">
        <div  v-bind:class="{padding_off: isActive}" class="button-left-site">
          <h6 v-if="homespecificproduct.lowestAsk && lowestAsk !== undefined" class="button-info-price-font">IDR {{lowestAsk}}</h6>
          <h6 v-else class="button-info-price-font">IDR -</h6>
          <div class="button-info-footer">
            <div class="thousand-params" style="color: #ffcfcf">Lowest Ask</div>
          </div>
        </div>
        <div v-if="userstatus === 'Supplier'" class="button-right-site" @click="buttonInfoAsk">
          <h6 class="bid-or-ask">ASK</h6>
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="info-detail-table">
      <a @click="openTableAsk" data-toggle="modal" class="view-all-font" data-target="#ModalViewAllAsk">View All Asks</a>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      modalinfoask: true,
      lowestAsk: '',
      isActive: false
    }
  },
  props: ['LowestAsk'],
  created () {
    this.lowestAsk = this.homespecificproduct.lowestAsk
    if(this.userstatus === 'Supplier') {
      this.isActive = false
    } else {
      this.isActive = true
    }
  },
  methods: {
    ...mapMutations([
    'changeaskstatus', 'changetableaskmodal'
    ]),
    buttonInfoAsk () {
      if (this.modalinfoask) {
        this.changeaskstatus()
        this.modalinfoask = false
        $('#modal-info-ask').modal('show')
      } else {
        this.changeaskstatus()
        $('#Modal-Asking-Site').modal('show')
      }
    },
    openTableAsk () {
      this.changetableaskmodal()
    }
  },
  computed: {
    ...mapState([
      'homespecificproduct', 'userstatus'
    ])
  },
  watch: {
    LowestAsk () {
      this.lowestAsk = this.LowestAsk
    },
    homespecificproduct () {
      this.lowestAsk = this.homespecificproduct.lowestAsk
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-bottom: 5px;
}

.button-info-ask {
  background: #ff5a5f;
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  min-width: 140px;
  justify-content: center;
  align-items: center;
}

.button-info-price-font {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
  text-align: center;
}

.button-left-site {
  padding-right: 15px;
  justify-content: center;
}

.button-info-footer {
  display: flex;
  justify-content: center;
}

.thousand-params{
  font-size: 1em;
  color: #c6e6c2;
  font-weight: 500;
}

.button-right-site {
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid white;
}

.button-right-site:hover{
  cursor:pointer
}

.bid-or-ask {
  color: white;
  font-weight: 500;  
}

.info-detail-table {
  text-align: center;
}

.view-all-font {
  font-weight: 500;
}

.view-all-font:hover {
  cursor: pointer;
}
</style>