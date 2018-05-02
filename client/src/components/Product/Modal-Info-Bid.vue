<template>
  <div id="modal-info-bid" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">How it works</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body col-lg-12 row">
          <div class="col-lg-4 step-site">
            <div class="step-site-icon">
              <i class="fas fa-money-bill-alt icon-font"></i>
            </div>
            <div class="step-site-title">
              <div class="step-site-number">
                <h4 class="step-site-number-font">1</h4>
              </div>
              <div class="step-site-text">
                <h4 class="step-site-text-font">Bid</h4>
              </div>
            </div>
            <div class="step-site-desc">
              <p class="step-site-desc-font">
                Make an offer that any seller can accept; or purchase immediately at the lowest Ask.
              </p>
            </div>
          </div>
          <div class="col-lg-4 step-site">
            <div class="step-site-icon">
              <i class="fas fa-binoculars icon-font"></i>
            </div>
            <div class="step-site-title">
              <div class="step-site-number">
                <h4 class="step-site-number-font">2</h4>
              </div>
              <div class="step-site-text">
                <h4 class="step-site-text-font">Authenticate</h4>
              </div>
            </div>
            <div class="step-site-desc">
              <p class="step-site-desc-font">
                Seller ships to us. We authenticate, then we release funds to the seller.
              </p>
            </div>
          </div>
          <div class="col-lg-4 step-site">
            <div class="step-site-icon">
              <i class="fas fa-cubes icon-font"></i>
            </div>
            <div class="step-site-title">
              <div class="step-site-number">
                <h4 class="step-site-number-font">3</h4>
              </div>
              <div class="step-site-text">
                <h4 class="step-site-text-font">Package</h4>
              </div>
            </div>
            <div class="step-site-desc">
              <p class="step-site-desc-font">
                We ship to you. You sip a daiquiri, knowing you will never get a fake.
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button data-toggle="modal" data-target="#Modal-Bidding-Site" type="button" class="btn btn-success" aria-label="Close" data-dismiss="modal">
            <h4 class="check-rules-font">Got It</h4>            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.modal-content {
  border: none
}

.modal-header {
  background-color: #28a745;
}

.modal-title {
  color: white;
  font-weight: 700;
}

.modal-dialog {
  max-width: 900px;
}

.row {
  margin: 0
}

.step-site {
  display: flex;
  flex-direction: column;
  
}

.icon-font {
  width: 100%;
  font-size: 7em;
}

.step-site-title {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.step-site-icon {
  margin-bottom: 40px;
}

.step-site-number {
  border-radius: 50%;
  border: 1px #00bbe3 solid !important;
  padding: 4px 12px;
  background-color: #00bbe3;
  margin-right: 7px;
}

.step-site-number-font {
  color: white;
  font-weight: 700;
}

.step-site-text {
  display: flex;
  align-items: center;
}

.step-site-text-font {
  font-weight: 500;
  color: #00bbe3;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.step-site-desc {
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.check-rules-font {
  font-weight: 500;
}

.btn-success {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
}
</style>
