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
                            Обратная связь
                        </span>
                    </ion-title>

                    <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content>

            <div class="container">
                <ion-text>
                    <p class="name-org">АО «Чукотэнерго»</p>

                    <p class="name">Адрес</p>
                    <p class="value">г Анадырь ул. Куркутского, д. 34</p>
                    <p class="name">Телефон</p>
                    <p class="value">(42722) 2-22-29</p>
                    <p class="name">E-mail</p>
                    <p class="value">doc@chukotenergo.ru</p>
                    <div class="line"></div>

                    <p class="no-active">
                        Нет активных обращений
                    </p>

                </ion-text>
                <div class="card" v-for="el in tickets">
                    <ion-text>
                        <div class="card-item">
                            <p class="name">{{ el?.lamp }}</p>
                            <p class="value">{{el?.date_create.substring(0, 10) }}</p>
                        </div>
                        <p class="text">
                            {{ el?.title }}
                        </p>
                        <a class="link">Подробнее</a>
                    </ion-text>
                </div>
                <!-- <div class="card">
                    <ion-text>
                        <div class="card-item">
                            <p class="name green orange">Ответ получен</p>
                            <p class="value">24.05.2023</p>
                        </div>
                        <p class="text">
                            Уважаемый клиент!
                            Мы ответили на ваш запрос
                        </p>
                        <a class="link">Подробнее</a>
                    </ion-text>
                </div> -->
            </div>


        </ion-content>

        <ion-fab router-link="/tabs/feedbackAdd" slot="fixed" vertical="bottom" horizontal="end">
            <ion-fab-button>
                <img src="../assets/fab-add.svg" alt="">
            </ion-fab-button>
        </ion-fab>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonFab, IonFabButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useAppealsStore } from '../stores/appeals'
import { mapActions } from 'pinia';
import moment from 'moment'

export default defineComponent({
    name: 'Feedback',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonFab, IonFabButton
    },
    data() {
        return {
            loading: false,
        }
    },
    setup(){
        return {moment}
    },
    methods: {
        ...mapActions(useAppealsStore, ['getAppeals']),
        passToggle(el) {
            if (el == 'passOld') {
                var x = this.$refs.passOld
                if (x?.type === "password") {
                    x.type = "text";
                    this.$data.pass.passOld = true
                } else {
                    x.type = "password";
                    this.$data.pass.passOld = false

                }
            } else {
                var x = this.$refs.passNew
                if (x?.type === "password") {
                    this.$data.pass.passNew = true

                    x.type = "text";
                } else {
                    x.type = "password";
                    this.$data.pass.passNew = false

                }
            }

        }
    },
    computed: {
        tickets() {
            return this.$pinia.state.value?.appeals?.ticketResponse?.data
        }
    },
    mounted() {
        this.loading = true
        this.getAppeals().then(() => {
            this.loading = false

            console.log(this.$pinia.state.value.appeals.ticketResponse)
        })
        console.log(this.$route.query, 'test')
    }
})
</script>
  
  
<style scoped>
.orange {
    color: #F08400;
}

.green {
    color: #21A300;
}

.card .value {
    color: #6D6D6D;
    font-size: 14px;
}

.card .text {
    color: #232323;
    font-family: AppFont-Bold;
    font-size: 16px;
    font-weight: 450;

}

.name-org {
    font-size: 20px;
    margin-bottom: 24px;
    text-align: start;
    font-family: AppFont-Bold;
}

.no-active {
    font-family: AppFont-Bold;
    font-size: 16px;
}

ion-fab-button {
    --background: #F08400;
}

.header-wrapper {
    padding: 15px 0;
}

.btn-back {
    margin-bottom: 0;
}
</style>
  