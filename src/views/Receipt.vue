<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header-wrapper">
                    <button class="btn-back" @click="$router.go(-1)">
                        <img src="../assets/back.svg" alt="back" />
                    </button>
                    <ion-title>
                        <span class="title">
                            Электронная квитанция
                        </span>
                    </ion-title>

                    <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content>

            <div class="container">

                <p class="text">
                    Электронная квитанция является законным документом, полным аналогом бумажной квитанции. Она приходит
                    по выбору клиента: в личный кабинет или на электронную почту потребителя
                </p>

                <div class="card">
                    <ion-text>
                        <div class="card-list">
                            <div class="card-line">
                                <p class="name">Лицевой счет</p>
                                <p class="value">№ 12345678901</p>
                            </div>
                            <div class="card-line">
                                <p class="name">Адрес</p>
                                <p class="value">г Анадырь ул.Куркутского, д. 34</p>
                            </div>
                        </div>

                    </ion-text>
                    <div class="btns">
                        <button class="btn" @click="setOpen(true)">Подписаться</button>
                    </div>
                    <ion-modal :is-open="isOpen" mode="ios">
                        <ion-content>
                            <div class="modal-wrapper">
                                <div class="modal-header">
                                    <ion-text>
                                        <p class="modal-text">Вы хотите получать
                                            квитанцию на
                                            электронную почту ?</p>
                                    </ion-text>
                                    <img @click="setOpen(false)" aria-hidden="true" src="../assets/close.svg" alt="close">


                                </div>
                                <div class="modal-footer">
                                    <button class="btn" fill="clear" @click="(e) => setOpen(false)">Да</button>
                                    <button class="btn-outline" fill="clear" @click="setOpen(false)">Нет</button>
                                </div>

                            </div>
                        </ion-content>

                    </ion-modal>
                </div>

                <div class="card">
                    <ion-text>
                        <div class="card-list">
                            <div class="card-line">
                                <p class="name">Лицевой счет</p>
                                <p class="value">№ 12345678901</p>
                            </div>
                            <div class="card-line">
                                <p class="name">Адрес</p>
                                <p class="value">г Анадырь ул.Куркутского, д. 34</p>
                            </div>
                        </div>

                    </ion-text>
                    <div class="btns">
                        <button class="btn-outline black">Отписаться</button>
                    </div>
                </div>

            </div>


        </ion-content>


    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonModal } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'



export default defineComponent({
    name: 'Feedback',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonModal
    },
    data() {
        return {
            pass: {
                passOld: false,
                passNew: false,
            },
        }
    },
    setup() {
        const router = useRouter()
        const isOpen = ref(false);

        const setOpen = (open: boolean) => {
            isOpen.value = open
        }
        const remove = (e: any) => {
            isOpen.value = false

            router.push('/auth')

        }
        return {
            setOpen, remove, isOpen,
        }
    },
    methods: {

    },
    mounted() {
    }
})
</script>
  
  
<style scoped>
.header-wrapper {
    padding: 15px 0;
}

.text{
    margin-bottom: 25px;
}
.btns {
    margin-top: 30px;
    margin-bottom: 0;
}

.card .btn {
    margin-bottom: 0;
}

.btn-outline {
    margin-bottom: 0;
}

.btn-back {
    margin-bottom: 0;
}
</style>
  