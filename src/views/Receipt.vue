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
                            <!-- <div class="card-line">
                                <p class="name">Лицевой счет</p>
                                <p class="value">№ 12345678901</p>
                            </div> -->
                            <div class="card-line">
                                <p class="name">ФИО</p>
                                <p class="value">
                                    {{ userData?.lastname }}
                                    {{ userData?.name }}
                                    {{ userData?.secondname }}

                                </p>
                            </div>
                            <div class="card-line">
                                <p class="name">Адрес</p>
                                <p class="value">г Анадырь ул.Куркутского, д. 34</p>
                            </div>
                        </div>
                        <p class="response">
                            {{ response }}
                        </p>

                    </ion-text>
                    <div class="btns">
                        <button v-show="subscribeVal == false" class="btn" @click="setOpen(true)">
                            <div class="spinner" v-show="loading">
                                <ion-spinner name="circles"></ion-spinner>
                            </div>
                            <span v-show="!loading">
                                Подписаться
                            </span>
                        </button>
                        <button v-show="subscribeVal == true" class="btn-outline black" @click="setOpen(true)">
                            <div class="spinner" v-show="loading">
                                <ion-spinner name="circles"></ion-spinner>
                            </div>
                            <span v-show="!loading">
                                Отписаться
                            </span>
                        </button>

                    </div>
                    <ion-modal :is-open="isOpen" mode="ios">
                        <ion-content>
                            <div class="modal-wrapper">
                                <div class="modal-header">
                                    <ion-text>
                                        <p class="modal-text" v-show="subscribeVal == false">Вы хотите получать
                                            квитанцию на
                                            электронную почту ?</p>
                                        <p class="modal-text" v-show="subscribeVal == true">Вы не хотите получать
                                            квитанцию на
                                            электронную почту ?</p>

                                    </ion-text>
                                    <img @click="setOpen(false)" aria-hidden="true" src="../assets/close.svg" alt="close">


                                </div>
                                <div class="modal-footer">
                                    <button class="btn" fill="clear"
                                        @click="(e) => subscribeHandler().then(() => setOpen(false))">
                                        Да
                                    </button>
                                    <button class="btn-outline" fill="clear" @click="setOpen(false)">Нет</button>
                                </div>

                            </div>
                        </ion-content>

                    </ion-modal>
                </div>

                <!-- <div class="card">
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
                </div> -->

            </div>


        </ion-content>


    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonModal, IonSpinner } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { useNotifStore } from '../stores/notifications'
import { Storage } from '@ionic/storage';
import { mapActions } from 'pinia';


export default defineComponent({
    name: 'Feedback',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonModal, IonSpinner
    },
    data() {
        return {
            pass: {
                passOld: false,
                passNew: false,
            },
            loading: false,
            response: '',
            subscribeVal: false,
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
        ...mapActions(useLoginStore, ['getUser']),
        ...mapActions(useNotifStore, ['subscribe', 'unsubscribe']),

        async subscribeHandler() {
            this.loading = true

            if (this.subscribeVal == false) {
                this.subscribe().then(() => {
                    const getStore = async () => {
                        const store = new Storage();
                        await store.create();
                        let subscribe = await store.get("subscribe");
                        console.log(subscribe, 'subscribe')
                        this.subscribeVal = subscribe
                    }
                    getStore()
                    this.loading = false
                    if (this.$pinia.state.value?.notif?.subscribeResponse?.status == true) {
                        this.response = 'Успешно!'

                    } else {
                        this.response = this.$pinia.state.value?.notif?.subscribeResponse?.data

                    }
                })
            } else {
                this.unsubscribe().then(() => {
                    const getStore = async () => {
                        const store = new Storage();
                        await store.create();
                        let subscribe = await store.get("subscribe");
                        console.log(subscribe, 'subscribe')
                        this.subscribeVal = subscribe
                    }
                    getStore()
                    this.loading = false
                    if (this.$pinia.state.value?.notif?.subscribeResponse?.status == true) {
                        this.response = 'Успешно!'

                    } else {
                        this.response = this.$pinia.state.value?.notif?.subscribeResponse?.data

                    }
                })
            }

        }
    },
    mounted() {
        this.getUser()
        const getStore = async () => {
            const store = new Storage();
            await store.create();
            let subscribe = await store.get("subscribe");
            console.log(subscribe, 'subscribe')
            this.subscribeVal = subscribe
        }
        getStore()
    },
    ionViewDidLeave(){
        this.response = ''
    },
    computed: {
        userData() {
            return this.$pinia.state.value?.login?.userResponse?.data
        }
    },
})
</script>
  
  
<style scoped>
.response {
    margin-top: 20px
}

.header-wrapper {
    padding: 15px 0;
}

.text {
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
  