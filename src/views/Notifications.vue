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

                    <img src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">


                <div class="card">
                    <ion-text>
                        <div class="card-item">
                            <p class="name link">Передача показаний</p>
                            <p class="value">8590,0</p>
                        </div>
                        <p class="text">
                            Уважаемые клиенты!
                            С 20 по 25 числа каждого месяца Вы...
                        </p>
                        <button class="link">Подробнее</button>
                    </ion-text>
                </div>


            </div>

        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText } from '@ionic/vue';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Уведомления',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonButtons, IonText
    },
    data() {
        return {

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

.card .link {
    color: #005D9F;
}
.card .value{
    color: #6D6D6D;
    font-size: 14px;
}
</style>
  