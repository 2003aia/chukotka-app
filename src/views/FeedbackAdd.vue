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
                            Написать обращение
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


                </ion-text>
                <div class="card">
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
                    </div>
                </div>

                <details class="custom-select" :class="[errorText && 'error']">
                    <summary class="radios">
                        <label class="label">Выберите тему обращения</label>

                        <input class="placeholder" value="0" v-model.number="category" type="radio" name="item" id="default"
                            title="Выберите тему обращения" checked>
                        <input type="radio" value="1" v-model.number="category" name="item" id="item1"
                            title="Личный кабинет">
                        <input type="radio" value="2" v-model.number="category" name="item" id="item2" title="Жалоба">
                        <input type="radio" value="3" v-model.number="category" name="item" id="item3" title="Вопрос">
                    </summary>
                    <ul class="list">
                        <li>
                            <label for="item1">
                                Личный кабинет
                            </label>
                        </li>
                        <li>
                            <label for="item2">Жалоба</label>
                        </li>
                        <li>
                            <label for="item3">Вопрос</label>
                        </li>


                    </ul>
                </details>
                <div class="input-wrapper">
                    <input v-model="text" :class="[errorText && 'error']" class="input" type="text" required />
                    <label>Сообщение</label>
                </div>

                <div class="file">
                    <p v-show="file.length > 0" :class="file[0]?.name && 'black'" v-for="el in file">{{ el?.name }}</p>
                    <p v-show="file.length == 0"> 'Прикрепить файл' </p>
                    <input @change="(e) => setFile(e)" id="files" class="input" type="file" required />
                    <label v-show="file[0]?.name ? true : false" for="files2"><img @click="file = []"
                            src="../assets/close.svg" alt="file"></label>

                    <label v-show="file[0]?.name ? false : true" for="files"><img src="../assets/file.svg"
                            alt="file"></label>
                </div>
                <div class="radio" :class="[errorText && 'error']">
                    <input id="policy2" v-model.number="checked" type="radio" name="policy2" value="policy2">
                    <label class="label" for="policy2">
                        <span></span>
                        <p>Даю согласие на обработку персональных данных</p>
                    </label>
                </div>
                <p class="response" v-show="response">{{ response }}</p>
                <p class="errorText" v-show="errorText">{{ errorText }}</p>
                <div class="btns" @click="createTicketHandler">
                    <div class="btn">
                        <div class="spinner" v-show="loading">
                            <ion-spinner name="circles"></ion-spinner>
                        </div>
                        <span v-show="!loading">
                            Отправить
                        </span>
                    </div>
                </div>
            </div>


        </ion-content>



    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useAppealsStore } from '../stores/appeals'
import { mapActions } from 'pinia'

export default defineComponent({
    name: 'FeedbackAdd',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSpinner
    },
    data() {
        return {
            pass: {
                passOld: false,
                passNew: false,
            },
            file: [],
            loading: false,
            category: '',
            text: '',
            errorText: '',
            response: '',
            checked: ''
        }
    },
    methods: {
        ...mapActions(useAppealsStore, ['createTicket']),
        createTicketHandler() {
            this.errorText = ''
            this.response = ''
            let data = {
                message: this.text,
                category_id: Number(this.category),
                files: this.file[0]
            }
            if (this.text.length > 0 && this.category !== '0' && this.checked.length > 0) {
                this.loading = true

                this.createTicket(data).then(() => {
                    this.loading = false
                    if (this.$pinia.state.value.appeals?.createResponse?.status == true) {
                        this.response = this.$pinia.state.value.appeals?.createResponse?.data

                    } else {
                        this.errorText = this.$pinia.state.value.appeals?.createResponse?.data
                    }
                })
            } else {
                this.errorText = 'Заполните обязательные поля!'
            }

        },
        setFile(e: any) {
            this.$data.file = e.target.files
            console.log(e.target.files)
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
        this.category = ''
    },
    ionViewDidLeave() {
        this.errorText = ''
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
.radio {
    margin-bottom: 30px;
}

.file {
    position: relative;
    padding: 20px 0 15px 0;
    border: none;
    border-bottom: 1px solid #ABA8A8;
    margin-bottom: 25px;
}

.file input {
    display: none;
}

.file p {
    position: absolute;
    margin: 0;
    bottom: 15px;
    font-size: 14px;
    color: #ABA8A8;
}

.file label {
    border: 0;
    padding: 0px;
    transition: .5s;
    float: right;
    margin-bottom: -5px;
}

.file .close {
    position: relative;
    z-index: 2000;
    width: max-content;
    height: max-content;
}

.black {
    color: #232323 !important;
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
  