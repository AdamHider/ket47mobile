<template>
      <swiper      
      :modules="modules"
      :autoplay='{
        delay: 2500,
        disableOnInteraction: false
      }'
      :slidesPerView="1" 
      :spaceBetween="30" 
      :loop="true" 
      :pagination='{"clickable": true}' 
      :scrollbar="{ draggable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
        <swiper-slide style="background-color:#080036;">
          <ion-img  src="./assets/homeslider/1.jpg" style="margin-left:20%"/>
        </swiper-slide>
        <swiper-slide style="background-color:#7f4d58;">
          <ion-img  src="./assets/homeslider/2.png" style="margin-left:20%"/>
        </swiper-slide>
        <swiper-slide style="background-color:#313575;">
          <ion-img  src="./assets/homeslider/3.jpg" style="margin-left:20%"/>
        </swiper-slide>
        <swiper-slide style="background-color:#263e3e;">
          <ion-img  src="./assets/homeslider/4.jpg" style="margin-left:20%"/>
        </swiper-slide>
      </swiper>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
 


  //import { Autoplay } from 'swiper';
  import 'swiper/vue';
  import '@ionic/vue/css/ionic-swiper.css';

  import SwiperCore from 'swiper';
  
  SwiperCore.use([Autoplay,Pagination,Navigation]);
  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper); 
      };
      const onSlideChange = () => {
        console.log('slide change');
      };

      SwiperCore.use([Autoplay,Pagination,Navigation]);
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
      };
    },
  });
</script>