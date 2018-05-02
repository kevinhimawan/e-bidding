<template>
  <div id="modal-info-ask" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">How it works</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <h4 aria-hidden="true">&times;</h4>
          </button>
        </div>
        <div class="modal-body col-lg-12 row">
          <div class="modal-body-top">
            <div class="col-lg-4 step-site">
              <div class="step-site-icon">
                <i class="fas fa-money-bill-alt icon-font"></i>
              </div>
              <div class="step-site-title">
                <div class="step-site-number">
                  <h4 class="step-site-number-font">1</h4>
                </div>
                <div class="step-site-text">
                  <h4 class="step-site-text-font">Ask</h4>
                </div>
              </div>
              <div class="step-site-desc">
                <p class="step-site-desc-font">
                  List a product for sale; or sell immediately at the highest Bid
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
                  <h4 class="step-site-text-font">Shipping</h4>
                </div>
              </div>
              <div class="step-site-desc">
                <p class="step-site-desc-font">
                  Ship your item within 2 business days. We authenticate, then we ship it to the buyer.
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
                  We release funds to you. You sip a daiquiri, knowing you will never get a chargeback.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body-bot col-lg-12 row">
          <div class="icon-penalty col-lg-1">
            <div class="icon-penaly-nest">
              <h4 class="icon-penalty-font">15%</h4>
            </div>
          </div>
          <div class="penalty-message col-lg-10">
            <p class="penalty-message-p"><b>15%DON'T FLAKE</b> - There is a minimum 15% penalty if you fail to ship within 2 business days, or if the item received is not authentic, is used, or is not the right size. When a 'Bid' and 'Ask' match, the trade is confirmed and can no longer be canceled. The integrity of the marketplace depends on it.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button data-toggle="modal" data-target="#Modal-Asking-Site" type="button" class="btn btn-danger" aria-label="Close" data-dismiss="modal">
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
p{
  margin: 0
}
.modal-content {
  border: none
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.modal-body-top {
  display: flex;
}

.modal-body-bot {
  padding: 1em 5em;
  display: flex;
  background: #e6e6e6
}

.icon-penalty {
  margin-right: 20px;
  padding: 0
}

.icon-penaly-nest {
  background-color: #ff595e;
  border-radius: 50%;
  padding: 15px 2px;
}

.icon-penalty-font {
  color: white;
  font-weight: 700;
  letter-spacing: -.1em;
}

.penalty-message {
  padding: 0;
  text-align: left;
}

.modal-header {
  background-color: #ff5a5f;
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

.btn-danger {
  background-color: #ff5a5f !important;
  border-color: #ff5a5f !important;
}


</style>
