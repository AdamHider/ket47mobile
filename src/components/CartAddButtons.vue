<style scoped>
  .product-actions{
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0px;
    top: 0px;

    border-radius: 10px;
    overflow: hidden;
    width: auto;
    transition: all 0.3s ease;
    font-weight: bold;
  }
  .product-actions  ion-button{
    box-shadow: none;
    height: 45px;
    --border-radius: 10px;
    --box-shadow: none;
    margin: 0px;
  }
  .product-actions ion-label{
    cursor:pointer;
    width: 2.5em;
    text-align: center;
  }
  .product-actions ion-label:hover{
    background-color:var(--ion-color-primary-tint);
    border-radius: 5px;
  }
  .product-actions.horizontal{
    flex-flow: row-reverse;
  }
  .incart{
    -border:1px solid var(--ion-color-primary);
    background-color: var(--ion-color-light);
  }
  .sold{
    display: none;
  }

</style>

<template>
    <div :class="`product-actions ${buttonLayout} ${this.currentQuantity>0?'incart':''} ${this.productData.product_quantity>0?'':'sold'}`">
      
      <ion-button v-if="!this.currentQuantity" @click="addToOrder(+this.productData.product_quantity_min)" size="small" color="primary">
        <ion-icon :icon="add" color="light"></ion-icon>
      </ion-button>
      
      <ion-button v-if="this.currentQuantity>0" @click="addToOrder(+this.productData.product_quantity_min)" size="small" color="light">
        <ion-icon :icon="add" color="primary"></ion-icon>
      </ion-button>
      <ion-label v-if="this.currentQuantity>0" color="primary" @click="setInOrder()">{{ this.currentQuantity }}</ion-label>
      <ion-button v-if="this.currentQuantity>0" @click="addToOrder(-this.productData.product_quantity_min)" size="small" color="light">
        <ion-icon :icon="remove" v-if="this.currentQuantity>this.productData.product_quantity_min" color="primary"></ion-icon>
        <ion-icon :icon="trash" v-if="this.currentQuantity<=this.productData.product_quantity_min" color="primary"></ion-icon>
      </ion-button>
    </div>
</template>

<script>
import { add, remove, trash, cart } from 'ionicons/icons';
import { toastController } from '@ionic/vue';
import heap from '@/heap';
export default{
  inject:["$Order"],
  props:['productItem','entry','orderData','buttonLayout'],
  setup() {
    return {
      add,
      remove,
      trash,
      cart
    }
  },
  data() {
    let order_store_id=0;
    let productData=(this.entry||this.productItem);
    productData.product_quantity_min= productData.product_quantity_min | 1;

    if( this.productItem ){
      productData.entry_quantity=0;
      order_store_id=this.productItem.store_id;
    } else {
      order_store_id=this.orderData.order_store_id;
    }

    return { 
      order_store_id,
      productData
    };
  },
  mounted(){
    this.productListItemHighlight();
  },
  methods:{
    productListItemHighlight(){
      let product_list_item=document.getElementById(`product_list_item${this.productData.product_id}`);
      if(!product_list_item){
        return;
      }
      if(this.currentQuantity){
        product_list_item.classList.add("incart");
      } else {
        product_list_item.classList.remove("incart");
      }
    },
    addToOrder(step){
      let newQuantity=this.currentQuantity*1+step*1;
      if( !this.productItem && !this.entry ){
        return;//haven't loaded yet or qty is negative
      }
      if(this.currentQuantity+step<0){
        newQuantity=0;
      }
      return this.updateOrder(newQuantity);
    },
    setInOrder(){
      let newQuantity=parseFloat( prompt("Введите количество",this.currentQuantity) );
      if(newQuantity==null || isNaN(newQuantity)){
        return;
      }
      return this.updateOrder(newQuantity);
    },
    updateOrder(newQuantity){
      if( newQuantity<0 || !newQuantity ){
        newQuantity=0;
      }
      newQuantity=this.productData.product_quantity_min*Math.round(newQuantity/this.productData.product_quantity_min);
      if( this.productData.is_produced==0 && newQuantity>this.productData.product_quantity ){
        this.flash(`В наличии есть только ${this.productData.product_quantity}${this.productData.product_unit}`);
        newQuantity=this.productData.product_quantity;
      }
      let stock_product_quantity=this.productItem?this.productItem.product_quantity:this.productData.product_quantity;
      let entry={
        product_id:this.productData.product_id,
        product_unit:this.productData.product_unit,
        product_quantity:stock_product_quantity,
        is_produced:this.productData.is_produced,
        entry_quantity:newQuantity,
        entry_price:this.productData.product_final_price||this.productData.entry_price,
        entry_text:this.productData.product_name||this.productData.entry_text,
        image_hash:this.productData.image_hash||''
      };
      this.productData.entry_quantity=newQuantity;
      this.$Order.cart.entrySave(this.order_store_id,entry);
      this.productListItemHighlight();
    },
    async flash( message ) {
      const toast = await toastController
        .create({
          message: message,
          duration: 2000,
          color:'dark'
        })
      return toast.present();
    }
  },
  computed:{
    currentQuantity(){
      if( this.productItem ){
        //If buttons are in storeview
        return heap.state.cartProductWatchList[this.productData.product_id]||0;
      }
      //if buttons are in orderview or cartview
      return this.productData.entry_quantity;
    }
  },
}
</script>