<template>
      <swiper :modules="modules" :autoplay='{delay: 300, disableOnInteraction: false}' :loop="true" effect="fade">
        <swiper-slide v-for="hslide in home_slides" :key="hslide.title" :style="`background-color:${hslide.color}`">
          <img  :src="hslide.image" style="margin-left:20%;"/>
          <div style="position:absolute;color:white;margin-left:40%;text-align:left;text-shadow: 0px 0px 3px #000000;">
            <h1 style="font-size:3em">{{hslide.title}}</h1>
            <p>{{hslide.description}}</p>
          </div>
        </swiper-slide>
      </swiper>
</template>

<script>
  import jQuery from "jquery";
  import { defineComponent } from 'vue';


  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, EffectFade  } from 'swiper';
  import SwiperCore from 'swiper';
  import 'swiper/swiper.min.css';
  import 'swiper/components/effect-fade';
  import '@ionic/vue/css/ionic-swiper.css'; 

  SwiperCore.use([Autoplay, EffectFade]);

  export default defineComponent({
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
      return {
        home_slides:[],
        error:""
      };
    },
    created(){
        this.getSlideList();
    },
    methods: {
        getSlideList(){
            var self = this;
            jQuery.get( "/assets/homeslider/conf.json")
            .done(function(response) {
              self.home_slides=response.slides;



              //SwiperCore.use([Autoplay,EffectFade]);
            })
            .fail(function(err) {
                self.error = err.responseJSON.messages.error;
            });
        }
    },
    setup() {
      
      return {
        modules: [Autoplay,EffectFade], 
      };
      
    },
  });
</script>