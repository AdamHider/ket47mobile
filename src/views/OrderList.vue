<style scoped>
    ion-icon{
        font-size:40px;
        color:var(--ion-color-medium);
    }
</style>
<template>
  <base-layout page-default-back-link="/home"  page-title="Заказы">
        <ion-segment swipe-gesture="true" v-model="orderType" @ionChange="listTypeChanged($event)">
            <ion-segment-button value="jobs" v-if="courierJobsInclude">
                Задания
            </ion-segment-button>
            <ion-segment-button value="active">
                Активные
            </ion-segment-button>
            <ion-segment-button value="done">
                Исполненые
            </ion-segment-button>
        </ion-segment>
        <ion-list v-if="orderList.length">
            <ion-item v-for="order in orderListComputed" :key="order.order_id" @click="itemClick(order)">
                <ion-avatar slot="start">
                    <ion-icon v-if="order.user_role=='customer'" src="./assets/icon/box-delivery.svg"/>
                    <ion-icon v-if="order.user_role=='courier'" src="./assets/icon/delivery_staying.svg"/>
                    <ion-icon v-if="order.user_role=='admin'" src="./assets/icon/crown.svg"/>
                    <ion-icon v-if="order.user_role=='supplier'" :icon="storefrontOutline" style="font-size:30px;"/>
                </ion-avatar>
                <ion-label>
                    <ion-text color="primary">{{order.store_name}} #{{order.order_id}} ({{order.order_sum_total}}{{$heap.state.currencySign}})</ion-text>
                    <p><b>{{order.distance_km}}</b>{{order.location_address}}</p>
                    <h4>{{order.stage_current_name}}</h4>
                </ion-label>
                <ion-thumbnail slot="end" v-if="order.image_hash">
                    <ion-img style="border-radius:10px;" :src="`${$heap.state.hostname}image/get.php/${order.image_hash}.150.150.webp`"/>
                </ion-thumbnail>
            </ion-item>
        </ion-list>
        <div v-else style="display:flex;align-items:center;justify-content:center;height:100%">
            <div style="width:max-content;text-align:center">
                <ion-icon :icon="sparklesOutline" size="large"></ion-icon>
                <ion-label>Заказов нет</ion-label><br>
            </div>
        </div>

  </base-layout>
</template>
<script>
import { IonSegment, IonSegmentButton } from '@ionic/vue';
import {storefrontOutline,sparklesOutline,timeOutline}      from 'ionicons/icons';
import Order from '@/scripts/Order.js';
import User  from '@/scripts/User.js';
import Topic from '@/scripts/Topic.js';
import { modalController }  from '@ionic/vue';
import CourierJobPreview        from '@/components/CourierJobPreview.vue';


export default {
    components: { IonSegment, IonSegmentButton },
    setup() {
      return { sparklesOutline,storefrontOutline,timeOutline };
    },
    data(){
        return {
            orderList:[],
            orderType:'active',
            courierJobsInclude:1,
            clock:null
        };
    },
    computed:{
        orderListComputed(){
            for(let order of this.orderList){
                if( !order.location_address ){
                    order.location_address='';
                }
                order.location_address=order.location_address.split(',').reverse().join(',');
                if( order.distance ){
                    order.distance_km=Math.round(order.distance/1000)+'км';
                } else {
                    order.distance_km='';
                }
            }
            return this.orderList;
        }
    },
    mounted(){
        this.listLoad('active');
    },
    methods:{
        async listLoad(listType){
            this.autoReload(listType);
            if( listType=='jobs' ){
                this.listJobLoad();
                return;
            }
            let order_group_type='customer_finish';
            if( listType=='active' ){
                order_group_type='!customer_finish';
            }
            this.orderList=await Order.api.listLoad(order_group_type);
        },
        listTypeChanged(e){
            const listType=e.target.value;
            this.listLoad(listType);
        },
        async listJobLoad(){
            const courier_id=User.courier?.data?.courier_id;
            if( !courier_id ){
                this.$flash("Смена курьера не открыта");
                this.orderList=[];
                return;
            }
            console.log(courier_id);
            this.orderList=await Order.api.listJobGet(courier_id);
        },
        autoReload(listType){
            clearTimeout(this.clock);
            const self=this;
            const timeout=1000*60*2;
            if(listType=='jobs' || listType=='active'){
                this.clock=setTimeout(()=>{
                    self.listLoad(listType);
                },timeout);
            }
        },
        async itemClick(order){
            if( order.is_courier_job ){
                const modal = await modalController.create({
                    component: CourierJobPreview,
                    componentProps:{order},
                    initialBreakpoint: 0.5,
                    breakpoints: [0, 0.5, 0.75]
                    });
                const dismissFn=function(){
                    modal.dismiss();
                };
                Topic.on('dismissModal',dismissFn);
                return modal.present();
            }
            this.itemOpen(order.order_id);
        },
        itemOpen(order_id){
            console.log('itemOpen(order_id)');
        }
    }
}
</script>