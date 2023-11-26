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
                        <div class="card-line">
                            <p class="name">Лицевой счет</p>
                            <p class="value">№ 12345678901</p>
                        </div>
                        <div class="card-line">
                            <p class="name">ФИО</p>
                            <p class="value">Иванов Иван Иванович</p>
                        </div>
                    </div>
                </div>

                <details class="custom-select">
                    <summary class="radios">
                        <label class="label">Выберите тему обращения</label>

                        <input class="placeholder" type="radio" name="item" id="default" title="Личный кабинет" checked>
                        <input type="radio" name="item" id="item1" title="Тема 1">
                        <input type="radio" name="item" id="item2" title="Тема 2">
                        <input type="radio" name="item" id="item3" title="Тема 3">
                        <input type="radio" name="item" id="item4" title="Тема 4">
                    </summary>
                    <ul class="list">
                        <li>
                            <label for="item1">
                                Тема 1
                            </label>
                        </li>
                        <li>
                            <label for="item2">Тема 2</label>
                        </li>
                        <li>
                            <label for="item3">Тема 3</label>
                        </li>
                        <li>
                            <label for="item4">Тема 4</label>
                        </li>

                    </ul>
                </details>
                <div class="input-wrapper">
                    <input class="input" type="text" required />
                    <label>Сообщение</label>
                </div>

                <div class="file">
                    <p :class="file[0]?.name && 'black'">{{ file[0]?.name || 'Прикрепить файл' }}</p>
                    <input @change="(e) => file = e.target?.files" id="files" class="input" type="file" required />
                    <label v-show="file[0]?.name ? true : false" for="files2"><img @click="file = []"
                            src="../assets/close.svg" alt="file"></label>

                    <label v-show="file[0]?.name ? false : true" for="files"><img src="../assets/file.svg"
                            alt="file"></label>
                </div>
                <div class="radio">
                    <input id="policy2" type="radio" name="policy2" value="policy2">
                    <label class="label" for="policy2">
                        <span></span>
                        <p>Даю согласие на обработку персональных данных</p>
                    </label>
                </div>
                <div class="btns">
                    <div class="btn">Отправить</div>
                </div>
            </div>


        </ion-content>



    </ion-page>
</template>
  
<script lang="ts">
import { IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, } from '@ionic/vue';
import { defineComponent } from 'vue';



export default defineComponent({
    name: 'FeedbackAdd',
    components: {
        IonPage, IonContent, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    },
    data() {
        return {
            pass: {
                passOld: false,
                passNew: false,
            },
            file: [],
        }
    },
    methods: {
        setFile(e: any) {
            this.$data.file = e.target.files
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
    }
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
  