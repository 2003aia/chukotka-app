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



export default defineComponent({
    name: 'Feedback',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonFab, IonFabButton
    },
    data() {
        return {
            pass: {
                passOld: false,
                passNew: false,
            },
        }
    },
    methods: {
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
    mounted() {
        console.log(this.$route.query, 'test')
    }
})
</script>
  
  
<style scoped>
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
ion-fab-button{
    --background: #F08400;
}
.header-wrapper {
    padding: 15px 0;
}

.btn-back {
    margin-bottom: 0;
}
</style>
  