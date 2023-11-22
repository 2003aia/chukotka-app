<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <div class="header-wrapper">
                    <button class="btn-back" @click="$router.push('/tabs/profile')">
                        <img src="../assets/back.svg" alt="back" />
                    </button>
                    <ion-title>
                        <span class="title">
                            Профиль
                        </span>
                    </ion-title>

                    <img @click="$router.push('/tabs/notif')" src="../assets/bell.svg" alt="notification" class="notif">
                </div>

            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div v-show="$route.query?.link == 'fio'" class="container">
                <ion-text>
                    <p class="title">ФИО</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" placeholder="ФИО" value="Иванов Иван Иванович" />
                    <img src="../assets/pen.svg" alt="pen">
                </div>
            </div>
            <div v-show="$route.query?.link == 'address'" class="container">
                <ion-text>
                    <p class="title">Адрес</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" placeholder="Адрес" value="г Анадырь ул. Куркутского, д. 34" />
                    <img  src="../assets/pen.svg" alt="pen">
                </div>
            </div>
            <div v-show="$route.query?.link == 'email'" class="container">
                <ion-text>
                    <p class="title">Электронная почта</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" placeholder="Электронная почта" value="Doc@chukotka@gmail.com" />
                    <img  src="../assets/pen.svg" alt="pen">
                </div>
                <ion-text>
                    <p>Для изменения необходимо подтвердить электронный адрес, мы отправили письмо на указанную вами почту
                    </p>
                </ion-text>
            </div>
            <div v-show="$route.query?.link == 'phone'" class="container">
                <ion-text>
                    <p class="title">Телефон</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" placeholder="Телефон" value="8 (999) 123-45-67" />
                    <img src="../assets/pen.svg" alt="pen">
                </div>
                <ion-text>
                    <p>Для изменения необходимо подтвердить данные, мы отправили SMS на указанный вами номер телефона</p>
                </ion-text>

            </div>
            <div v-show="$route.query?.link == 'password'" class="container">
                <ion-text>
                    <p class="title">Изменить пароль</p>
                </ion-text>
                <ion-text>
                    <p style="margin-bottom: 10px;">
                        Введите старый пароль
                    </p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" ref="passOld" placeholder="Введите старый пароль" value="123456" type="password" />
                    <div @click="passToggle('passOld')">
                        <img v-show="pass.passOld == true" src="../assets/pass-close.svg" alt="pen">
                        <img v-show="pass.passOld == false" src="../assets/pass-open.svg" alt="pen">

                    </div>
                </div>
                <ion-text>
                    <p style="margin-bottom: 10px;">
                        Введите старый пароль
                    </p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" ref="passNew" placeholder="Введите новый пароль" value="123456" type="password" />
                    <div @click="passToggle('passNew')">

                        <img v-show="pass.passNew == true" src="../assets/pass-close.svg" alt="pen">
                        <img  v-show="pass.passNew == false" src="../assets/pass-open.svg" alt="pen">

                    </div>

                </div>
                <ion-text>
                    <p>Пароль должен содержать не менее 8 символов</p>
                </ion-text>

            </div>
        </ion-content>
        <ion-footer class="ion-no-border">
            <div class="container">
                <button class="btn" @click="$router.go(-1)">Сохранить</button>

            </div>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';



export default defineComponent({
    name: 'ProfileEdit',
    components: {
        IonPage, IonContent, IonText, IonFooter, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle
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
                    this.$data.pass.passOld= false

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
.title {
    font-size: 16px;
    margin-bottom: 24px;
    text-align: center;
    font-family: AppFont-Bold;
}

.header-wrapper {
    padding: 15px 0;
}

.btn-back {
    margin-bottom: 0;
}


</style>
  