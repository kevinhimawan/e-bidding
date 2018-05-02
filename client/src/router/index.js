import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '@/components/Home'
import Registration from '@/components/Registration'
import Admin from '@/components/Admin'
import ShoesList  from '@/components/Admin/ShoesList'
import ShoeDetail from '@/components/Admin/ShoeDetail'
import Product from '@/components/Product'
import Profile from '@/components/Profile'
import BuyingProfileContent from '@/components/Profile/BuyingSite/BuyingProfileContent'
import SellingProfileContent from '@/components/Profile/SellingSite/SellingProfileContent'
import SettingProfile from '@/components/Profile/SettingProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product,
      props: true,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [{
        path: '/profile/buying',
        name: 'BuyingProfileContent',
        component: BuyingProfileContent
      },
      {
        path: '/profile/selling',
        name: 'SellingProfileContent',
        component: SellingProfileContent
      },
      {
        path: '/profile/setting',
        name: 'SettingProfile',
        component: SettingProfile
      }]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children:[{
        path: '/shoesadmin/:brandid',
        name: 'shoesadmin',
        component: ShoesList,
        props: true,
      },
      {
        path: '/shoeadmin/:shoeid',
        name: 'shoeadmin',
        component: ShoeDetail,
        props: true,
      }]
    }
  ]
})
