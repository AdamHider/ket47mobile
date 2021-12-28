<template>
      <swiper  :autoplay="true" :autoplayDisableOnInteraction="false" :slides-per-view="3" :loop="true">
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
  import { Autoplay, Navigation, Pagination, Scrollbar, A11y  } from 'swiper';
  import 'swiper/vue';
  import 'swiper/vue/autoplay';
  import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y ],
      };
    },
  });
</script>