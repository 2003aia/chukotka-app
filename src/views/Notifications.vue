<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header-wrapper">
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title>
                        <span class="title">
                            Уведомления
                        </span>
                    </ion-title>

                    <!-- <img src="../assets/bell.svg" alt="notification" class="notif"> -->
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="spinner" v-show="loading">
                    <ion-spinner name="circles"></ion-spinner>
                </div>


                <div class="card" v-for="el in notif" :key="el?.id" v-show="!loading">
                    <ion-text>
                        <div class="card-item">
                            <p class="name link">{{el?.name }}</p>
                            <p class="value">{{ el?.date_create?.substring(0,10) }}</p>
                        </div>
                        <p class="text">
                            {{ el?.text }}
                        </p>
                        <a class="link">Подробнее</a>
                    </ion-text>
                </div>


            </div>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue'
import {mapActions} from "pinia"
import {useNotifStore} from '../stores/notifications'

export default defineComponent({
    name: 'Уведомления',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText, IonSpinner
    },
    methods: {
        ...mapActions(useNotifStore, ['getNotif'])
    },
    mounted(){
        this.loading =true
        this.getNotif().then(()=>{
            this.loading = false
            console.log(this.$pinia.state.value.notif?.notifResponse)
        })
    },
    computed:{
        notif(){
            return this.$pinia.state.value.notif?.notifResponse?.data
        }
    },
    data() {
        return {
loading: false,
        }
    }
})
</script>
  
<style scoped>
.card .text {
    color: #232323;
    font-family: AppFont-Bold;
    font-size: 16px;
    font-weight: 450;

}


.card .value{
    color: #6D6D6D;
    font-size: 14px;
}
</style>
  