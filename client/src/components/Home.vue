<template>
  <div class="content">
    <NavbarTop></NavbarTop>
    <CarouselTop></CarouselTop>
    <HomeContainer></HomeContainer>
  </div>
</template>

<script>
import NavbarTop from './Reuseable/navbarTop'
import HomeContainer from './Home/HomeContainer'
import CarouselTop from './Home/CarouselTop'
export default {
  components: {
    HomeContainer, CarouselTop, NavbarTop
  },
  name: 'Home',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
