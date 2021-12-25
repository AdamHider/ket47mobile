<template>
  <base-layout page-title="Мои адреса" page-default-back-link="/user-dashboard" :errorMessage="error">
  <div class="panel">
  <ion-list class="adresses-list">
    <ion-item  v-for="adress in addressList" :key="adress.id">
        <ion-thumbnail>
          <ion-icon v-if="adress.type == 'home'" name="home"></ion-icon>
          <ion-icon v-if="adress.type == 'work'" name="business"></ion-icon>
          <ion-icon v-if="adress.type == 'other'" name="trail-sign"></ion-icon>
        </ion-thumbnail> 
        <ion-card-header>
            <ion-label>{{ adress.address }}, {{ adress.city }}</ion-label>
        </ion-card-header>
        <ion-thumbnail>
          <ion-icon name="trash"></ion-icon>
        </ion-thumbnail>
    </ion-item>
  </ion-list>
  </div>
  </base-layout>
</template>


<script>

import { 
  IonIcon,
  IonThumbnail
} from '@ionic/vue';
import { addIcons } from 'ionicons';
import { home, business, trailSign, trash } from 'ionicons/icons';


export default  {
  name: 'UserAddresses',
  components: {
    IonIcon,
    IonThumbnail
  },
  created() {
    addIcons({
      'home': home,
      'business': business,
      'trail-sign': trailSign,
      'trash': trash
    });
  },
  data(){
    return{
      addressList: [
        {
          id: 1,
          type: "home",
          city: "Las Vegas",
          address: "Casino Royale 2",
          coordinates: {
            longitude: "-77.0364",
            latitude: "38.8951"
          }
        },
        {
          id: 1,
          type: "work",
          city: "Washington DC",
          address: "White House 1",
          coordinates: {
            longitude: "-77.0364",
            latitude: "38.8951"
          }
        }
      ]
    }
  }
}
</script>

<style>

.panel{
  box-shadow: 1px 1px 15px -5px #00000085;
}
 ion-list.adresses-list{
  padding-bottom: 0px;
}
.adresses-list ion-card{
  display: flex;
  justify-content: space-between;
}
.adresses-list ion-card-header{
  flex: 3;
}
.adresses-list ion-icon {
  font-size: 26px;
  padding: 12px;
}
</style>

