import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import swal from 'sweetalert'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    erroremailsignup: false,
    errorpasswordsignup: false,
    emaildouble: false,
    userstatus: '',
    allshoesdataadmin: [],
    allbrand: [],
    brandproduct: [],
    adminspecificproduct: {},
    homeproductlist: [],
    homespecificproduct: {},
    bidtablemodal: false,
    asktablemodal: false,
    picksize: '',
    erroremailloginhome: false,
    errorpasswordloginhome: false,
    erroremaildoublehome: false,
    biddingsite: false,
    askingsite: false,
    userdata: {},
  },
  mutations: {
   changeerroremailsignup (state, payload) {
    state.erroremailsignup = payload
   },
   changeerrorpasswordsignup (state, payload) {
     state.errorpasswordsignup = payload
   },
   changeemaildouble (state, payload) {
    state.emaildouble = payload
   },
   changeuserstatus (state, payload) {
     state.userstatus = payload
   },
   changeallshoesdataadmin (state, payload) {
     state.allshoesdataadmin =  payload
   },
   addingallshoesdataadmin (state, payload) {
     state.allshoesdataadmin.push(payload)
   },
   changeshoesdataadmin (state, payload) {
     let index = 0
     for (let i = 0; i < state.allshoesdataadmin.length; i++) {
       if (state.allshoesdataadmin[i]._id === payload._id) {
         index = i
       }
     }
     state.allshoesdataadmin.splice(index, 1, payload)
   },
   getallbrand (state, payload) {
     state.allbrand = payload
   },
   changebrandproduct (state, payload) {
     state.brandproduct = payload
   },
   changespecificadminproduct (state, payload) {
     state.adminspecificproduct = payload
   },
   sethomeproductlist (state, payload) {
    const setLowestAsk = payload.map((shoe, i) => {
      let lowestAsk;
      let countAsk= 0
      for (let i = 0; i < shoe.shoeSellProduct.length; i++) {
        if (countAsk === 0 && shoe.shoeSellProduct[i].status === 'active') {
          lowestAsk = shoe.shoeSellProduct[i].price
          countAsk++
        } else if(shoe.shoeSellProduct[i].status === 'active') {
          if (lowestAsk > shoe.shoeSellProduct[i].price) {
            lowestAsk = shoe.shoeSellProduct[i].price
          }
        }
      }
      
      if (lowestAsk === undefined) {
        shoe['lowestAsk'] = 0  
      } else {
        shoe['lowestAsk'] = lowestAsk
      }
      return shoe
    })
    state.homeproductlist = setLowestAsk
   },
   setspecifichomeproduct (state, payload) {
    //  Get MaxBid and MinAsk per Size
     const addSize = payload.size.map((size, i) => {
       let highestbid;
       let countHighest = 0
       let lowestask;
       let countlowest = 0
       for(let i = 0; i < payload.shoeBidding.length; i++) {
        // Find Highest Bid
        if (payload.shoeBidding[i].size._id === size._id) {
          if (countlowest === 0) {
            highestbid = payload.shoeBidding[i].bidding
            countlowest++
          } else {
            if (payload.shoeBidding[i].bidding > highestbid) {
              highestbid = payload.shoeBidding[i].bidding
            }
          }
        }
       }

       for(let i = 0; i < payload.shoeSellProduct.length; i++) {         
        //  Find Lowest Ask
        if (payload.shoeSellProduct[i].size._id === size._id) {
          if (countHighest === 0) {
            lowestask = payload.shoeSellProduct[i].price
            countHighest++
          } else {
            if (payload.shoeSellProduct[i].price < lowestask) {
              lowestask = payload.shoeSellProduct[i].price
            }
          }
        }
       }
      size['LowestAsk'] = lowestask
      size['HighestBid'] = highestbid
       return size
     })

    //  Get MaxBid and MinAsk per Shoe
      let highesBid;
      let countBid = 0
      for (let i = 0; i < payload.shoeBidding.length; i++) {        
        if (countBid === 0) {
          highesBid = payload.shoeBidding[i].bidding
          countBid++
        } else {
          if (highesBid < payload.shoeBidding[i].bidding) {
            highesBid = payload.shoeBidding[i].bidding
          }
        }
      }
      let lowestAsk;
      let countAsk= 0
      for (let i = 0; i < payload.shoeSellProduct.length; i++) {
        if (countAsk === 0) {
          lowestAsk = payload.shoeSellProduct[i].price
          countAsk++
        } else {
          if (lowestAsk > payload.shoeSellProduct[i].price) {
            lowestAsk = payload.shoeSellProduct[i].price
          }
        }
      }
      payload['highestBid'] = highesBid
      payload['lowestAsk'] = lowestAsk
      payload['sizeNew'] = addSize
    state.homespecificproduct = payload
   },
   changetablebidmodal (state, payload) {
    this.state.bidtablemodal === false ? state.bidtablemodal = true : state.bidtablemodal = false
   },
   changetableaskmodal (state, payload) {
    this.state.asktablemodal === false ? state.asktablemodal = true : state.asktablemodal = false
   },
   pickSizeNumber (state, payload) {
    state.picksize = payload
   },
   errorEmailLoginHome (state, payload) {
     state.erroremailloginhome = payload
   },
   errorPasswordLoginHome (state, payload) {
    state.errorpasswordloginhome = payload
   },
   errorEmailDoubleHome (state, payload) {
     state.erroremaildoublehome = payload
   },
   changebiddingstatus (state, payload) {
    state.biddingsite = true
    state.askingsite = false
   },
   changeaskstatus (state, payload) {
    state.biddingsite = false
    state.askingsite = true
   },
   setuserdata (state, payload) {
     state.userdata = payload
   },
   setuserdatabidding (state, payload) {
    const { data, lowest, highest } = payload
    for (let i = 0; i < data.shoeBidding.length; i++) {
      data.shoeBidding[i]['lowestAsk'] = lowest[i]
    }
    for (let i = 0; i < data.shoeBidding.length; i++) {
      data.shoeBidding[i]['highestBid'] = highest[i]
    }
    state.userdata = data
    
   },
   setuserdataselling (state, payload) {
    const { data, lowest, highest } = payload
    for (let i = 0; i < data.shoeSellProduct.length; i++) {
      data.shoeSellProduct[i]['lowestAsk'] = lowest[i]
    }
    for (let i = 0; i < data.shoeSellProduct.length; i++) {
      data.shoeSellProduct[i]['highestBid'] = highest[i]
    }
    state.userdata = data
   }
  },

  actions: {
    signupuser (state, payload) {
      axios.post('http://localhost:3000/user/signup',payload).then(response => {
        console.log(response.data)
        localStorage.setItem('kepingan', response.data.token)
        state.commit('changeuserstatus', response.data.status)
        router.push({
          name: 'Home'
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 409') {
          state.commit('changeemaildouble', true)
        }
      })
    },
    loginuser (state, payload) {
      axios.post('http://localhost:3000/user/login', payload).then(response => {
        router.push({
          name: 'Home'
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 404') {
          state.commit('changeerroremailsignup', true)
        } else if (err.message === 'Request failed with status code 500') {
          state.commit('changeerrorpasswordsignup', true)
          state.commit('changeerroremailsignup', false)
        }
      })
    },
    checkstatus (state, payload) {
      axios.get('http://localhost:3000/user/getstatus')
      .then(response => {
        state.commit('changeuserstatus', response.data)
      }).catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
        }
        state.commit('changeuserstatus', 'visitor')
      })
    }, 
    usersignout (state, payload) {
      localStorage.removeItem('kepingan')
      state.commit('changeuserstatus', 'visitor')
      router.push({
        name: 'Home'
      })
    },
    // Admin Site
    getshoesdata (state, payload) {
      axios.get('http://localhost:3000/admin/getshoes').then(response => {
        state.commit('changeallshoesdataadmin', response.data)
      })
    },
    getallbrand (state, payload) {
      axios.get('http://localhost:3000/admin/allbrand').then(response => {
        state.commit('getallbrand', response.data)
      }) 
    },
    getbrandproduct (state, payload) {
      axios.get('http://localhost:3000/admin/brandproductspecific',{
        headers: {
          brandid: payload
        }
      }).then(response => {
        state.commit('changebrandproduct', response.data.shoeProduct)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getshoespecific (state, payload) {
      axios.get('http://localhost:3000/admin/getshoespecific', {
        headers: {
          shoeid: payload
        }
      }).then(response => {
        let shoe = response.data
        const release = shoe.release.split('-')
        const end = release[2].split('T')
        shoe['Retail'] = shoe.retail.toLocaleString()

        shoe['Release'] = `${release[0]}-${release[1]}-${end[0]}`
        state.commit('changespecificadminproduct', shoe)
      })
    },
    changeshoespecific (state, payload) {
      axios.post('http://localhost:3000/admin/changeshoespecific', payload).then(response => {
        state.commit('getallbrand', response.data)
        router.push({name: 'Admin'})
      })
    },
    changeshoeimage (state, payload) {
      axios.post('http://localhost:3000/admin/changeshoeimage', payload).then(response => {
        swal({
          title: `Data has been updated`,
          icon: 'success',
          button: 'Ok'
        })
        router.push({name: 'Admin'})
      })
    },
    changeshoesize (state, payload) {
      axios.post('http://localhost:3000/admin/changeshoesize', payload).then(response => {
        router.push({name: 'Admin'})
      })
    },
    removesizeshoe (state, payload) {
      axios.delete(`http://localhost:3000/admin/removesizeshoe/${payload.id}/${payload.shoeid}`).then(response => {
        router.push({name: 'Admin'})
      })
    },
    supplierCreate (state, payload) {
      axios.post('http://localhost:3000/admin/addsupplier',payload)
      .then(response => {
        const { username, email } = response.data.newSupplier
        $('#add-supplier').modal('hide')
        swal({
          title: 'Successfully create new supplier',
          icon:'warning',
          text: `Supplier ${username} with email ${email} has been successfully made`
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          swal({
            title: 'Double Supplier',
            icon: 'warning',
            text: `Supplier with email ${payload.email} has already registered please use another email`
          })
        } else {
          swal({
            title: 'Fail in Adding Supplier',
            icon: 'warning'
          })
        }
      })
    },
    // Home Site
    getinitializedata (state, payload) {
      if (this.state.homeproductlist.length === 0) {
        axios.get('http://localhost:3000/').then(response => {
          state.commit('sethomeproductlist', response.data)
        })
      }
    },
    searchProduct (state, payload) {
      axios.get(`http://localhost:3000/searchproduct`,{
        headers: {
          searchkey: payload
        }
      })
      .then(response => {
        state.commit('sethomeproductlist', response.data.products)
        router.push({
          name: 'Home'
        })
      })
    },
    getspecificproduct (state, payload) {
      axios.get(`http://localhost:3000/getspecificproduct/${payload}`).then(response => {
        let shoe = response.data
        const release = shoe.release.split('-')
        const end = release[2].split('T')
        shoe['Retail'] = shoe.retail.toLocaleString()

        shoe['Release'] = `${release[0]}-${release[1]}-${end[0]}`
        state.commit('setspecifichomeproduct', shoe)
      })
    },
    submitaskingform (state, payload) {
      axios.post('http://localhost:3000/product/askform', payload).then (response => {
        swal({
          title: 'Success on create new offer',
          text: 'if there is a match bid, remember to send your product within 2 days',
          icon: 'success',
          buttons: {
            ok: 'ok'
          }
        }).then((value) => {
          store.dispatch('getspecificproduct',response.data.productid)
          $('#Modal-Asking-Site').modal('hide')
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Login-Site').modal('show')
          $('#Modal-Asking-Site').modal('hide')
        }
      })
    },
    submitbiddingform (state, payload) {
      axios.post('http://localhost:3000/product/bidform', payload).then (response => {
        swal({
          title: 'Success on create new bid',
          text: 'if there is a match ask, your credit card will automatically deduct according your bid price',
          icon: 'success',
          buttons: {
            ok: 'ok'
          }
        }).then((value) => {
          if (value === 'ok') {
            console.log(response.data.productid)
            store.dispatch('getspecificproduct',response.data.productid)
            $('#Modal-Bidding-Site').modal('hide')
          }
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Login-Site').modal('show')
          $('#Modal-Bidding-Site').modal('hide')
        }
      })
    },
    loginuserinhome (state, payload) {
      axios.post('http://localhost:3000/user/login', payload).then(response => {
        localStorage.setItem('kepingan', response.data.token)
        state.commit('changeuserstatus', response.data.status)
        if (this.state.askingsite) {
          $('#Modal-Asking-Site').modal('show')
          $('#Modal-Login-Site').modal('hide')
        }

        if (this.state.biddingsite) {
          $('#Modal-Bidding-Site').modal('show')
          $('#Modal-Login-Site').modal('hide')
        }
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 404') {
          state.commit('errorEmailLoginHome', true)
        } else if (err.message === 'Request failed with status code 500') {
          state.commit('errorPasswordLoginHome', true)
          state.commit('errorEmailLoginHome', false)
        }
      })
    },
    signupuserinhome (state, payload) {
      axios.post('http://localhost:3000/user/signup',payload).then(response => {
        localStorage.setItem('kepingan', response.data.token)
        state.commit('changeuserstatus', response.data.status)

        if (this.state.askingsite) {
          $('#Modal-Asking-Site').modal('show')
          $('#Modal-Login-Site').modal('hide')
        }

        if (this.state.biddingsite) {
          $('#Modal-Bidding-Site').modal('show')
          $('#Modal-Login-Site').modal('hide')
        }
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 409') {
          state.commit('errorEmailDoubleHome', true)
        }
      })
    },

    // Transaction
    transactionproceedask (state, payload) {
      axios.post(`http://localhost:3000/product/askformsucess`, payload)
      .then(resp => {
        $('#Modal-Asking-Site').modal('hide')        
        swal({
          title: 'Transaction Success',
          icon: 'success'
        }).then(() => {
          store.dispatch('getspecificproduct', resp.data.productid)
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Asking-Site').modal('hide')
          $('#Modal-Login-Site').modal('show')
        } else {
          console.log('error')
        }
      })
    },
    transactionproceedbid (state, payload) {
      axios.post(`http://localhost:3000/product/bidformsuccess`, payload)
      .then(resp => {
        $('#Modal-Bidding-Site').modal('hide')
        swal({
          title: 'Transaction Success',
          icon: 'success'
        }).then(() => {
          store.dispatch('getspecificproduct', resp.data.productid)
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Bidding-Site').modal('hide')
          $('#Modal-Login-Site').modal('show')
        } else {
          console.log('error')
        }
      })
    },
    transactionaskfromprofile (state, payload) {
      axios.post(`http://localhost:3000/product/askformformprofile`, payload)
      .then(response => {
        if (payload.status === 'active') {
          $('#Modal-Selling-Detail').modal('hide')
        } else {
          $("#Modal-Selling-Inactive-Detail").modal('hide')
        }
        swal({
          title: 'Transaction Proceed',
          icon: 'success'
        }).then(() => {
          store.dispatch('getUserSelling', response.data.userid)
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Selling-Detail').modal('hide')
        } else {
          console.log('error')
        }
      })
    },
    transactionbidfromprofile (state, payload) {
      axios.post(`http://localhost:3000/product/bidformprofile`, payload)
      .then(response => {
        if (payload.status === 'active') {
          $('#Modal-Bidding-Detail').modal('hide')
        } else {
          $('#Modal-Bidding-Inactive-Detail').modal('hide')
        }
        swal({
          title: 'Transaction Proceed',
          icon: 'success'
        }).then(() => {
          store.dispatch('getUserBuying', response.data.userid)
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 401') {
          localStorage.removeItem('kepingan')
          state.commit('changeuserstatus', 'visitor')
          $('#Modal-Selling-Detail').modal('hide')
        } else {
          console.log('error')
        }
      })
    },
    // Profile
    getuserdata (state, payload) {
      axios.get('http://localhost:3000/user/getuser',{
        headers: {
          token: payload
        }
      }).then(response => {
        state.commit('setuserdata',response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getUserSelling (state, payload) {
      axios.get('http://localhost:3000/user/getuserselling', {
        headers: {
          userid: payload
        }
      }).then(response => {
        state.commit('setuserdataselling',response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getUserBuying (state, payload) {
      axios.get('http://localhost:3000/user/getuserbuying', {
        headers: {
          userid: payload
        }
      }).then(response => {
        state.commit('setuserdatabidding', response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    resetpassword (state, payload) {
      axios.post(`http://localhost:3000/user/resetpassword`, payload)
      .then(response => {
        $('#Reset-Password').modal('hide')
        swal({
          title: 'Update Password is succedd',
          icon: 'success'
        })
      })
      .catch(err => {
        swal({
          title: 'Update Password is fail',
          icon: 'warning'
        })
      })
    },
    changeuserbasicprofile (state, payload) {
      axios.post(`http://localhost:3000/user/changebasicprofile`, payload)
      .then(response => {
        const token = localStorage.getItem('kepingan')
        store.dispatch('getuserdata', token)
        $('#Modal-Edit-Profile').modal('hide')
        swal({
          title: 'Change User Profile Succed',
          icon: 'success'
        })
      })
      .catch(err => {
        swal({
          title: 'Change User Profile Fail',
          icon: 'warning'
        })
      })
    },
    getUserSetting (state, payload) {
      axios.get(`http://localhost:3000/user/getusersetting`, {
        headers: {
          userid: payload
        }
      })
      .then(response => {
        state.commit('setuserdata', response.data)
      })
    },
    submitAddress (state, payload) {
      axios.post(`http://localhost:3000/user/addaddress`, payload)
      .then(response => {
        $('#Modal-Adding-Address').modal('hide')
        store.dispatch('getUserSetting', response.data.userid)
        swal({
          title: 'Successful Add New Address',
          icon: 'success',
        })
      })
      .catch(err => {

      })
    },
    changeAddress (state, payload) {
      axios.post(`http://localhost:3000/user/changeaddress`, payload)
      .then(response => {
        store.dispatch('getUserSetting', response.data.userid)
        $('#Modal-Editting-Address').modal('hide')
        swal({
          title: 'Successful Edit Address',
          icon: 'success',
        })
      })
      .catch(err => {
        
      })
    },
    updateBiddingDetail (state, payload) {
      axios.post(`http://localhost:3000/user/updatebiddingdetail`, payload)
      .then(response => {
        if (payload.form === 'active') {
          $('#Modal-Bidding-Detail').modal('hide')
        } else {
          $('#Modal-Bidding-Inactive-Detail').modal('hide')
        }
        swal({
          title: 'Update Success',
          icon: 'success'
        }).then(() => {
          store.dispatch('getUserBuying', response.data.userid)
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateSellingDetail (state, payload) {
      axios.post(`http://localhost:3000/user/updatebidding`, payload)
      .then(response => {
        if (payload.form === 'active') {
          $('#Modal-Selling-Detail').modal('hide')
        } else {
          $('#Modal-Selling-Inactive-Detail').modal('hide')
        }
        swal({
          title: 'Update Success',
          icon: 'success'
        }).then(() => {
          store.dispatch('getUserSelling', response.data.userid)
        })
      })
    }
  }
})

export default store
