<template>
    <ion-slides pager="true" :options="slideOpts">
        <ion-slide v-for="slide in slideList" :key="slide.id">
            <div class="slide">
                <img  :src="slide.image"/>
            </div>
        </ion-slide>
    </ion-slides>
</template>

<script>
import { IonSlides, IonSlide } from '@ionic/vue';

export default{
    components: { IonSlides, IonSlide },
    setup() {
        const slideOpts = {  
            slidesPerView: 1,
            centeredSlides: true, 
            initialSlide: 0,
            speed: 400,
            grabCursor: true,
            touchStartForcePreventDefault: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        };
        return { slideOpts }
    },
    data(){
        return {
            slideList: [
                {
                    id: 1,
                    image: "http://psdcollection.ru/wp-content/uploads/2020/01/banner-vesna-1.png"
                },
                {
                    id: 2,
                    image: "http://psdcollection.ru/wp-content/uploads/2020/01/banner-vesna-2.png"
                },
                {
                    id: 3,
                    image: "http://psdcollection.ru/wp-content/uploads/2020/01/banner-vesna-3.png"
                }
            ]
        }
    }
};
</script>