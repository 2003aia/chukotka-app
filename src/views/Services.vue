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
                            Сервисы
                        </span>
                    </ion-title>

                    <img src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="container">
                <ion-list lines="none">
                    <ion-item class="menu-item"
                        @click="$router.push({ path: '/tabs/payment', query: { name: 'Оплата услуг' } })">
                        <img class="menu-icon" src="../assets/pay-active.svg" slot="start" />

                        <ion-label>
                            Оплата услуг
                        </ion-label>
                    </ion-item>
                    <ion-item class="menu-item" router-link="/tabs/receipt">
                        <img class="menu-icon" src="../assets/email.svg" slot="start" />
                        <ion-label>Электронная квитанция</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" router-link="/tabs/indices">
                        <img class="menu-icon" src="../assets/indices2-active.svg" slot="start" />

                        <ion-label>Передача показаний ПУ</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" router-link="/tabs/downloadDocs">
                        <img class="menu-icon" src="../assets/service-doc.svg" slot="start" />

                        <ion-label>Скачать документы</ion-label>
                    </ion-item>
                    <ion-item class="menu-item" router-link="/tabs/feedback">
                        <img class="menu-icon" src="../assets/feedback.svg" slot="start" />

                        <ion-label>Обратная связь</ion-label>
                    </ion-item>

                </ion-list>
            </div>





        </ion-content>

    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLabel, IonItem, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';



export default defineComponent({
    name: 'Services',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonLabel, IonItem, IonList,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
    }
})
</script>
  
  
<style scoped>
.menu-item {
    margin-bottom: 7px;
}

.menu-icon {
    margin-right: 10px;
}


.btn-back {
    margin-bottom: 0;
}
</style>
  