<template>
      <swiper  :modules="modules" :slides-per-view="1"  :autoplay="1000">
        <swiper-slide>
          <ion-img  src="./assets/homeslider/1.jpg"/>
        </swiper-slide>
        <swiper-slide>
          <ion-img  src="./assets/homeslider/2.png"/>
        </swiper-slide>
        <swiper-slide>
          <ion-img  src="./assets/homeslider/3.jpg"/>
        </swiper-slide>
        <swiper-slide>
          <ion-img  src="./assets/homeslider/4.jpg"/>
        </swiper-slide>
      </swiper>
</template>

<script>
  import { defineComponent } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay } from 'swiper';
  import 'swiper/vue';
  import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay ],
      };
    },
  });
</script>