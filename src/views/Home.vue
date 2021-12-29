<template>
  <base-layout page-title="Home">
      <order-slider></order-slider>
      <home-slider></home-slider>
      <store-list></store-list>
  </base-layout>
</template>

<script>
  import HomeSlider from '../components/HomeSlider';
  import StoreList from '../components/StoreList';
  import OrderSlider from '../components/OrderSlider';

  export default  {
    name: 'Home',
    components: { 
          HomeSlider, 
          StoreList,
          OrderSlider
      }
  }
</script>