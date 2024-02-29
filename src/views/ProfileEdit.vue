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
                    <p class="title-profile">ФИО</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" required :value="lastname" v-on:change="(e: any) => lastname = e.target.value" />
                    <label>Фамилия</label>
                    <img src="../assets/pen.svg" alt="pen">
                </div>
                <div class="input-wrapper">
                    <input class="input" required :value="name" v-on:change="(e: any) => name = e.target.value" />
                    <label>Имя</label>
                    <img src="../assets/pen.svg" alt="pen">
                </div>
                <div class="input-wrapper">
                    <input class="input" required :value="secondname"
                        v-on:change="(e: any) => secondname = e.target.value" />
                    <label>Отчество</label>
                    <img src="../assets/pen.svg" alt="pen">
                </div>
            </div>
            <div v-show="$route.query?.link == 'address'" class="container">
                <ion-text>
                    <p class="title-profile">Адрес</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" required value="г Анадырь ул. Куркутского, д. 34" />
                    <label>Адрес</label>

                    <img src="../assets/pen.svg" alt="pen">
                </div>
            </div>
            <div v-show="$route.query?.link == 'email'" class="container">
                <ion-text>
                    <p class="title-profile">Электронная почта</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" required :value="email" v-on:change="(e: any) => email = e.target.value" />
                    <label>Электронная почта</label>

                    <img src="../assets/pen.svg" alt="pen">
                </div>
                <ion-text>
                    <p>Для изменения необходимо подтвердить электронный адрес, мы отправили письмо на указанную вами почту
                    </p>
                </ion-text>
            </div>
            <div v-show="$route.query?.link == 'phone'" class="container">
                <ion-text>
                    <p class="title-profile">Телефон</p>
                </ion-text>
                <div class="input-wrapper">
                    <input class="input" required :value="phone" v-on:change="(e: any) => phone = e.target.value" />
                    <label>Телефон</label>

                    <img src="../assets/pen.svg" alt="pen">
                </div>
                <ion-text>
                    <p>Для изменения необходимо подтвердить данные, мы отправили SMS на указанный вами номер телефона</p>
                </ion-text>

            </div>
            <div v-show="$route.query?.link == 'password'" class="container">
                <ion-text>
                    <p class="title-profile">Изменить пароль</p>
                </ion-text>
                <ion-text>

                </ion-text>
                <div class="input-wrapper">
                    <input class="input" ref="passOld" required :value="passwordOld"
                        v-on:change="(e: any) => passwordOld = e.target.value" type="password" />
                    <label>Введите старый пароль</label>
                    <div @click="passToggle('passOld')">
                        <img v-show="pass.passOld == true" src="../assets/pass-open.svg" alt="pen">
                        <img v-show="pass.passOld == false" src="../assets/pass-close.svg" alt="pen">

                    </div>
                </div>
                <ion-text>

                </ion-text>
                <div class="input-wrapper">
                    <input class="input" ref="passNew" required :value="passwordNew"
                        v-on:change="(e: any) => passwordNew = e.target.value" type="password" />
                    <label>Введите новый пароль</label>
                    <div @click="passToggle('passNew')">

                        <img v-show="pass.passNew == true" src="../assets/pass-open.svg" alt="pen">
                        <img v-show="pass.passNew == false" src="../assets/pass-close.svg" alt="pen">

                    </div>

                </div>
                <div class="input-wrapper">
                    <input class="input" ref="passCon" required :value="passwordConfirm"
                        v-on:change="(e: any) => passwordConfirm = e.target.value" type="password" />
                    <label>Подтвердите новый пароль</label>
                    <div @click="passToggle('passCon')">

                        <img v-show="pass.passCon == true" src="../assets/pass-open.svg" alt="pen">
                        <img v-show="pass.passCon == false" src="../assets/pass-close.svg" alt="pen">

                    </div>

                </div>
                <ion-text>
                    <p>Пароль должен содержать не менее 6 символов</p>
                </ion-text>

            </div>
        </ion-content>
        <ion-footer class="ion-no-border">
            <div class="container">
                <p class="response">{{ response }}</p>
                <p class="errorText">{{ errorText }}</p>

                <button class="btn" @click="editUserHandler">
                    <div class="spinner" v-show="loading">
                        <ion-spinner name="circles"></ion-spinner>
                    </div>
                    <span v-show="!loading">
                        Сохранить
                    </span>
                </button>

            </div>
        </ion-footer>
    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonFooter, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useLoginStore } from '../stores/login'


export default defineComponent({
    name: 'ProfileEdit',
    components: {
        IonPage, IonContent, IonText, IonFooter, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner
    },
    data() {
        return {
            pass: {
                passOld: false,
                passCon: false,
                passNew: false,
            },
            passwordOld: '',
            passwordNew: '',
            passwordConfirm: '',
            name: '',
            lastname: '',
            secondname: '',
            email: '',
            phone: '',
            response: '',
            errorText: '',
            loading: false,
        }
    },
    methods: {
        ...mapActions(useLoginStore, ['editUser', 'editPassword']),
        editUserHandler() {
            if (this.$route.query?.link == 'password') {
                console.log('password')

                if (this.passwordNew === this.passwordConfirm) {
                    this.loading = true
                    this.errorText = ''

                    let data = {
                        password: this.passwordOld,
                        new_password: this.passwordNew,
                        password_confirm: this.passwordConfirm,
                    }
                    this.editPassword(data).then(() => {
                        this.loading = false
                        if (this.$pinia.state.value.login?.changePassResponse?.status == true) {
                            this.response = this.$pinia.state.value.login?.changePassResponse?.data
                        } else {
                            this.errorText = this.$pinia.state.value.login?.changePassResponse?.data
                        }

                    })
                } else {
                    this.errorText = 'Пароли не совпадают'

                }

            } else {

                let data = {
                    name: this.name,
                    lastname: this.lastname,
                    secondname: this.secondname,
                    email: this.email,
                    phone: this.phone,

                }
                this.loading = true

                this.editUser(data).then(() => {
                    this.loading = false

                    if (this.$pinia.state.value.login?.userResponse?.status == true) {
                        this.response = this.$pinia.state.value.login?.userResponse?.data

                    } else {
                        this.errorText = this.$pinia.state.value.login?.userResponse?.data
                    }
                    console.log(this.$pinia.state.value.login?.userResponse)
                })
            }
        },
        passToggle(el: any) {
            if (el == 'passOld') {
                var x = this.$refs.passOld
                if (x?.type === "password") {
                    x.type = "text";
                    this.$data.pass.passOld = true
                } else {
                    x.type = "password";
                    this.$data.pass.passOld = false

                }
            } else if (el == 'passCon') {
                var x = this.$refs.passCon
                if (x?.type === "password") {
                    this.$data.pass.passCon = true

                    x.type = "text";
                } else {
                    x.type = "password";
                    this.$data.pass.passCon = false

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
    ionViewWillLeave() {
        this.response = ''
        this.errorText = ''
    },
    ionViewDidEnter() {
        this.name = this.$route.query?.name
        this.lastname = this.$route.query?.lastname
        this.secondname = this.$route.query?.secondname
        this.email = this.$route.query?.email
        this.phone = this.$route.query?.phone

    },
    mounted() {

        console.log(this.$route.query, 'test')
    }
})
</script>
  
  
<style scoped>
.title-profile {
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
  