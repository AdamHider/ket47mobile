<template>
    <div id="hcat_widget_grid">
        <div v-for="group in groupList" :key="group.group_id"  @click="() => {return onClick(group.group_id)}">
            <ion-thumbnail>
                <ion-img style="border-radius:10px;border:1px solid #ddd" :src="$heap.state.hostname + 'image/get.php/'+group.image_hash+'.100.100.webp'"/>
            </ion-thumbnail>
            <ion-label style="height:2em;text-align:center">{{group.group_name}}</ion-label>
        </div>
    </div>
</template>

<script>
export default {
    props: ['groupList', 'onClick'],
};
</script>
<style scoped>
#hcat_widget_grid {
    display: grid;
    margin-top:10px;
    gap:6px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 100px;
}
@media screen and (min-width: 600px) {
    #hcat_widget_grid {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
}
@media screen and (min-width: 1000px) {
    #hcat_widget_grid {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
}
#hcat_widget_grid>div{
    display: flex;
    flex-direction: column;
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: center;
    justify-content: center;
}
#hcat_widget_wrapper{
    background-color: #f5f5f5;
    padding: 10px;
}
</style>